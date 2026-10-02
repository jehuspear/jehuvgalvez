"""Regenerate the active hero from the supplied video, never from old JPEGs.

Requires FFmpeg/FFprobe on PATH and Pillow for offline asset generation only.
python scripts/extract-hero-video.py --source path/to/jehu-galvez-transition.mp4
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile

from PIL import Image


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--output', type=Path, default=Path('public/hero/jehu-hero-sequence-native'))
    args = parser.parse_args()
    source = args.source.resolve(strict=True)
    output = args.output.resolve()
    probe = json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_streams', '-of', 'json', str(source)
    ]))['streams'][0]
    width, height = int(probe['width']), int(probe['height'])
    numerator, denominator = map(int, probe['avg_frame_rate'].split('/'))
    fps = numerator / denominator
    # Fixed source assumptions make phase timestamps and frame indices reproducible.
    if (width, height, fps, int(probe.get('nb_frames', 0))) != (1280, 720, 24, 145):
        raise ValueError('Expected the approved 1280x720, 24fps, 145-frame source; review phase timings for another video.')
    for directory in ('sequence', 'sequence-mobile'):
        (output / directory).mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix='hero-source-') as temporary:
        decoded = Path(temporary)
        # BT.709 video is decoded to RGB once. No resizing, sharpening, or AI reconstruction.
        subprocess.run([
            'ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(source),
            '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', str(decoded / 'frame-%04d.png')
        ], check=True)
        frames = sorted(decoded.glob('frame-*.png'))
        if len(frames) != 145:
            raise ValueError(f'Expected 145 decoded frames, received {len(frames)}')

        def encode(item):
            index, path = item
            with Image.open(path) as raw:
                frame = raw.convert('RGB')
            frame.save(output / 'sequence' / f'frame-{index + 1:04d}.webp', 'WEBP', quality=98, method=4)
            if index % 2 == 0:
                mobile = frame.resize((960, 540), Image.Resampling.LANCZOS)
                mobile.save(output / 'sequence-mobile' / f'frame-{index // 2 + 1:04d}.webp', 'WEBP', quality=94, method=4)
            # Static posters keep exactly the same decoded pixels as their matching desktop frame.
            for poster, source_index in [('start', 0), ('professional', 40), ('final', 144)]:
                if index == source_index:
                    (output / f'poster-{poster}.webp').write_bytes((output / 'sequence' / f'frame-{index + 1:04d}.webp').read_bytes())
            return index

        with ThreadPoolExecutor(max_workers=3) as executor:
            for index in executor.map(encode, enumerate(frames)):
                if (index + 1) % 24 == 0 or index == 144:
                    print(f'Encoded {index + 1}/145 source frames', flush=True)

    mobile_indices = list(range(0, 145, 2))
    def sequence(directory, size, indices, quality):
        total = 0
        for index in range(len(indices)):
            path = output / directory / f'frame-{index + 1:04d}.webp'
            with Image.open(path) as image:
                image.load()
                if image.size != size:
                    raise ValueError(f'Unexpected output dimensions: {path}')
            total += path.stat().st_size
        return {
            'frameCount': len(indices), 'width': size[0], 'height': size[1], 'firstIndex': 1,
            'pathPattern': f'/{directory}/frame-{{index:04d}}.webp', 'totalBytes': total,
            'quality': quality, 'sourceFrameIndices': indices
        }

    manifest = {
        'source': {
            'file': source.name, 'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'width': width, 'height': height, 'fps': fps, 'frameCount': 145,
            'durationSeconds': float(probe['duration']),
            'note': 'Native video decode, RGB conversion using source BT.709 metadata; no upscaling or sharpening.'
        },
        'desktop': sequence('sequence', (1280, 720), list(range(145)), 98),
        'mobile': sequence('sequence-mobile', (960, 540), mobile_indices, 94),
        'posters': {'initial': '/poster-start.webp', 'professional': '/poster-professional.webp', 'final': '/poster-final.webp'},
        'phaseStartFrames': {'student': 0, 'professional': 36, 'human-ai': 96},
        'posterSourceFrames': {'initial': 0, 'professional': 40, 'final': 144}
    }
    (output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    (output / 'README.md').write_text(
        '# Native-source hero sequence\n\n'
        'Generated from `jehu-galvez-transition.mp4` (1280×720, 24fps, 145 frames). '
        'Desktop preserves every source frame at native size, WebP quality 98. '
        'Mobile samples every other source frame at 960×540, WebP quality 94, retaining both endpoints. '
        'These are high-quality lossy WebP assets, not native 1080p or lossless video reproductions.\n\n'
        'Regenerate with `python scripts/extract-hero-video.py --source path/to/jehu-galvez-transition.mp4`. '
        'Requires FFmpeg/FFprobe and Pillow only during generation. '
        'Source hash, frame indices, dimensions, phase boundaries, and transfer sizes are in `manifest.json`. '
        'The original supplied asset pack and old upscaled set remain unchanged.\n', encoding='utf-8')
    print(json.dumps({'desktopBytes': manifest['desktop']['totalBytes'], 'mobileBytes': manifest['mobile']['totalBytes']}), flush=True)


if __name__ == '__main__':
    main()
