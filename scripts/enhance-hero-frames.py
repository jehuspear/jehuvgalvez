"""Reproducible non-generative enhancement of the supplied hero sequence.

Requires Pillow. Originals are read-only; outputs live in a sibling directory.
This improves scaling and edge definition, not original captured detail.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageFilter


def encode(source: Path, target: Path, size: tuple[int, int], quality: int):
    with Image.open(source) as image:
        image = image.convert('RGB')
        if image.size != size:
            image = image.resize(size, Image.Resampling.LANCZOS)
        # A fixed, restrained setting prevents per-frame exposure/detail changes.
        image = image.filter(ImageFilter.UnsharpMask(radius=0.9, percent=65, threshold=3))
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, 'WEBP', quality=quality, method=6)
    with Image.open(target) as check:
        check.load()
        assert check.size == size, target
    return target.stat().st_size


def enhance(source: Path, target: Path, size: tuple[int, int], quality: int):
    # Isolate native encoders to bound working memory during a long batch.
    subprocess.run([sys.executable, str(Path(__file__).resolve()), '--one',
                    str(source), str(target), str(size[0]), str(size[1]), str(quality)], check=True)
    return target.stat().st_size


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output', type=Path, help='Optional staging directory for generated assets')
    parser.add_argument('--one', nargs=5, help=argparse.SUPPRESS)
    parser.add_argument('--finalize', action='store_true', help='Write manifest after separately encoding all frames')
    args = parser.parse_args()
    if args.one:
        source, target, width, height, quality = args.one
        encode(Path(source), Path(target), (int(width), int(height)), int(quality))
        return
    root = args.root.resolve()
    source = root / 'public/hero/jehu-hero-sequence-ready/public/hero'
    output = args.output.resolve() if args.output else root / 'public/hero/jehu-hero-sequence-hd'
    assert source.resolve() != output.resolve()
    manifest = json.loads((source / 'manifest.json').read_text(encoding='utf-8-sig'))
    desktop_size, mobile_size = (1920, 1080), (1280, 720)
    desktop_bytes = mobile_bytes = 0
    count = manifest['desktop']['frameCount']
    for index in range(1, count + 1):
        print(f'Enhancing desktop frame {index}/{count}', flush=True)
        filename = f'frame-{index:04d}.webp'
        target = output / 'sequence' / filename
        desktop_bytes += target.stat().st_size if args.finalize else enhance(source / 'sequence' / filename, target, desktop_size, 92)
        assert target.stat().st_size > 0, target
    # Use the 720p desktop originals, never upscale the already reduced 432p set.
    for index, original in enumerate(manifest['mobile']['sourceFrameNumbers'], start=1):
        print(f'Enhancing mobile frame {index}/37', flush=True)
        target = output / 'sequence-mobile' / f'frame-{index:04d}.webp'
        mobile_bytes += target.stat().st_size if args.finalize else enhance(source / 'sequence' / f'frame-{original:04d}.webp', target, mobile_size, 90)
        assert target.stat().st_size > 0, target
    posters = {}
    for label, original in manifest['posters'].items():
        filename = Path(original).name
        if not args.finalize:
            enhance(source / filename, output / filename, desktop_size, 94)
        assert (output / filename).stat().st_size > 0, filename
        posters[label] = '/' + filename
    enhanced_manifest = {
        'source': manifest['source'],
        'enhancement': {
            'method': 'Lanczos resize, fixed UnsharpMask radius=0.9 percent=65 threshold=3',
            'note': 'Upscaled derivative of 1280x720 originals; no generative reconstruction or new captured detail.',
            'originalAssets': '../jehu-hero-sequence-ready/public/hero/',
        },
        'desktop': {'frameCount': count, 'width': 1920, 'height': 1080, 'pathPattern': '/sequence/frame-{index:04d}.webp', 'firstIndex': 1, 'totalBytes': desktop_bytes},
        'mobile': {'frameCount': 37, 'width': 1280, 'height': 720, 'pathPattern': '/sequence-mobile/frame-{index:04d}.webp', 'firstIndex': 1, 'sourceFrameNumbers': manifest['mobile']['sourceFrameNumbers'], 'totalBytes': mobile_bytes},
        'posters': posters,
    }
    (output / 'manifest.json').write_text(json.dumps(enhanced_manifest, indent=2) + '\n', encoding='utf-8')
    (output / 'README.md').write_text('''# Enhanced hero sequence

Derived from the unchanged `jehu-hero-sequence-ready/public/hero` asset pack.

- Desktop: 73 frames at 1920 x 1080, WebP quality 92.
- Mobile: 37 frames at 1280 x 720, sampled from the original desktop frames, WebP quality 90.
- Three posters: 1920 x 1080, WebP quality 94.
- Identical Lanczos resize and restrained sharpening settings preserve sequence continuity, colors, identity, and composition.
- These are enhanced/upscaled derivatives, not native 1080p footage or recovered source detail.

Regenerate from the repository root with `python scripts/enhance-hero-frames.py` (requires Pillow). Every encoded output is reopened and decoded during generation. `manifest.json` records exact byte totals and source mappings.
''', encoding='utf-8')
    print(json.dumps({'desktopBytes': desktop_bytes, 'mobileBytes': mobile_bytes, 'output': str(output)}), flush=True)


if __name__ == '__main__':
    main()
