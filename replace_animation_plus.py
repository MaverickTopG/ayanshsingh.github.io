import os
import re

def replace_animation_plus():
    targets = [
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/home.html",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/services.html"
    ]

    # CSS to inject
    css_injection = """
    /* Animation Plus Replacement (Logo Mask) */
    .x-logo-mask {
      width: 100%;
      height: 100%;
      -webkit-mask-image: url('./logo.png');
      mask-image: url('./logo.png');
      -webkit-mask-size: contain;
      mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
      background-color: var(--main-light); /* Default fill */
      transition: background-color 0.3s ease;
    }

    /* Service Grid - Active State Colors */
    html.light .ser-grid-item.is--active .x-logo-mask {
      background-color: var(--main-dark);
    }
    html.dark .ser-grid-item.is--active .x-logo-mask {
      background-color: var(--main-light);
    }
    
    /* Ensure Hover Scale works (inherited from parent .ser-cross-w transform) */
    """

    for path in targets:
        if not os.path.exists(path): continue
        
        with open(path, 'r') as f:
            content = f.read()

        # Regex for hsc-cross (Work Items) - Multi-line SVG inside div
        # <div class="hsc-cross w-embed"><svg ... > ... </svg></div>
        # We replace the INNER content of the div
        hsc_pattern = re.compile(
            r'(<div class="hsc-cross w-embed">)\s*<svg.*?</svg>\s*(</div>)', 
            re.DOTALL
        )
        content = hsc_pattern.sub(r'\1<div class="x-logo-mask"></div>\2', content)

        # Regex for ser-cross (Service Items)
        ser_pattern = re.compile(
            r'(<div class="ser-cross w-embed">)\s*<svg.*?</svg>\s*(</div>)',
            re.DOTALL
        )
        content = ser_pattern.sub(r'\1<div class="x-logo-mask"></div>\2', content)

        # Inject CSS
        # Append to existing styles block if found, otherwise before </head>
        # I'll append to the specific "PNG Logo Masking" block If checking for previous injections
        # OR just append to the end of the <style> block found.
        if "/* Animation Plus Replacement */" not in content:
             content = content.replace('    </style>', css_injection + '\n    </style>', 1)
        
        with open(path, 'w') as f:
            f.write(content)
        print(f"Replaced animation plus with logo in {os.path.basename(path)}")

if __name__ == "__main__":
    replace_animation_plus()
