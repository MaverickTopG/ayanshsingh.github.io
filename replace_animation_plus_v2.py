import os
import re

def replace_animation_plus_v2():
    targets = [
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/home.html",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/services.html"
    ]

    for path in targets:
        if not os.path.exists(path): continue
        
        with open(path, 'r') as f:
            content = f.read()
        
        # Regex for hsc-img w-embed - which contains the cross SVG I missed
        # <div class="hsc-img w-embed"><svg ... > ... </svg></div>
        # Note: hsc-img might have different spacing or attributes
        hsc_img_pattern = re.compile(
            r'(<div class="hsc-img w-embed">)\s*<svg.*?</svg>\s*(</div>)', 
            re.DOTALL
        )
        content_new = hsc_img_pattern.sub(r'\1<div class="x-logo-mask"></div>\2', content)
        
        # Check if replacement happened
        if content != content_new:
            print(f"Replaced hsc-img cross in {os.path.basename(path)}")
            content = content_new
        else:
             print(f"No hsc-img cross found or already replaced in {os.path.basename(path)}")

        # Also re-check hsc-cross and ser-cross just in case
        hsc_pattern = re.compile(
            r'(<div class="hsc-cross w-embed">)\s*<svg.*?</svg>\s*(</div>)', 
            re.DOTALL
        )
        content = hsc_pattern.sub(r'\1<div class="x-logo-mask"></div>\2', content)

        ser_pattern = re.compile(
            r'(<div class="ser-cross w-embed">)\s*<svg.*?</svg>\s*(</div>)',
            re.DOTALL
        )
        content = ser_pattern.sub(r'\1<div class="x-logo-mask"></div>\2', content)

        with open(path, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    replace_animation_plus_v2()
