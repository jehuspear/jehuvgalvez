"""Encode deployable Hero frames directly from the approved source video.

Requires FFmpeg and Pillow at asset-generation time only. Original assets stay intact.
python scripts/optimize-hero-assets.py --source path/to/jehu-galvez-transition.mp4
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

from PIL import Image


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--reference', type=Path, default=Path('public/hero/jehu-hero-sequence-native/manifest.json'))
    parser.add_argument('--output-root', type=Path, default=Path('public/hero'))
    parser.add_argument('--manifest', type=Path, default=Path('data/hero-web-manifest.json'))
    args = parser.parse_args()
    reference = json.loads(args.reference.read_text(encoding='utf-8'))
    source = args.source.resolve(strict=True)
    if hashlib.sha256(source.read_bytes()).hexdigest() != reference['source']['sha256']:
        raise ValueError('Source differs from the approved video; review phase boundaries before regenerating.')

    with tempfile.TemporaryDirectory(prefix='portfolio-hero-web-') as temporary:
        scratch = Path(temporary).resolve()
        raw, encoded = scratch / 'raw', scratch / 'encoded'
        raw.mkdir()
        for directory in ('sequence', 'sequence-mobile'):
            (encoded / directory).mkdir(parents=True)
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(source),
                        '-fps_mode', 'passthrough', '-pix_fmt', 'rgb24', str(raw / 'frame-%04d.png')], check=True)
        frames = sorted(raw.glob('frame-*.png'))
        if len(frames) != reference['desktop']['frameCount']:
            raise ValueError('Unexpected source frame count.')

        def encode(item):
            index, path = item
            with Image.open(path) as image:
                frame = image.convert('RGB')
            if frame.size != (1280, 720):
                raise ValueError('Unexpected source dimensions.')
            frame.save(encoded / 'sequence' / f'frame-{index + 1:04d}.webp', 'WEBP', quality=86, method=6)
            if index % 2 == 0:
                mobile = frame.resize((960, 540), Image.Resampling.LANCZOS)
                mobile.save(encoded / 'sequence-mobile' / f'frame-{index // 2 + 1:04d}.webp', 'WEBP', quality=84, method=6)
            return index

        with ThreadPoolExecutor(max_workers=3) as executor:
            for index in executor.map(encode, enumerate(frames)):
                if (index + 1) % 24 == 0 or index == 144:
                    print(f'Encoded {index + 1}/145 source frames', flush=True)

        digest = hashlib.sha256()
        files = sorted(encoded.rglob('*.webp'))
        for file in files:
            digest.update(file.relative_to(encoded).as_posix().encode())
            digest.update(file.read_bytes())
        version = digest.hexdigest()[:12]
        directory = f'jehu-hero-sequence-web-{version}'
        output = args.output_root.resolve() / directory
        output.mkdir(parents=True, exist_ok=True)
        for file in files:
            target = output / file.relative_to(encoded)
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(file, target)

        manifest = dict(reference)
        manifest['assetPath'] = f'/hero/{directory}'
        manifest['version'] = version
        manifest['encoding'] = 'Direct RGB decode from approved video; WebP method 6, desktop quality 86, mobile quality 84. No AI, sharpening, or upscaling.'
        for variant, quality in [('desktop', 86), ('mobile', 84)]:
            manifest[variant] = dict(reference[variant])
            manifest[variant]['quality'] = quality
            folder = 'sequence' if variant == 'desktop' else 'sequence-mobile'
            manifest[variant]['totalBytes'] = sum(p.stat().st_size for p in (output / folder).glob('*.webp'))
        # Reuse sequence URLs for posters rather than transfer the same pixels twice.
        manifest['posters'] = {'initial': '/sequence/frame-0001.webp', 'professional': '/sequence/frame-0041.webp', 'final': '/sequence/frame-0145.webp'}
        manifest['mobilePosters'] = {'initial': '/sequence-mobile/frame-0001.webp', 'professional': '/sequence-mobile/frame-0021.webp'}
        args.manifest.parent.mkdir(parents=True, exist_ok=True)
        args.manifest.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
        (output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
        print(json.dumps({key: manifest[key] for key in ['assetPath', 'version', 'desktop', 'mobile']}), flush=True)


if __name__ == '__main__':
    main()
