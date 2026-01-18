import os
import re

def rename_services_to_about_me():
    targets = [
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/home.html",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/contact.html",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/work.html",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/services.html",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/projectshowcase.html"
    ]

    for path in targets:
        if not os.path.exists(path): continue
        
        with open(path, 'r') as f:
            content = f.read()

        new_content = content
        
        # 1. Update Nav Text "Services" -> "About Me"
        # Matches <div ...>Services</div> specifically in the btn-txt context found in grep
        new_content = re.sub(
            r'(<div split-text="" stagger-text="" class="text-small btn-txt">)Services(</div>)',
            r'\1About Me\2',
            new_content
        )
        
        # 2. Update Page Title related to Services
        # In services.html only:
        if "services.html" in path:
            # Update <title>
            new_content = re.sub(
                r'<title>Services</title>',
                r'<title>About Me</title>',
                new_content
            )
            # Update hidden h1
            new_content = re.sub(
                r'<h1 class="visually-hidden">Our Digital Services</h1>',
                r'<h1 class="visually-hidden">About Me</h1>',
                new_content
            )
            # Update Visible Hero "Skill Set" -> "About Me"
            # <div split-hero="" class="h-display">Skill</div>
            new_content = re.sub(
                r'(<div split-hero="" class="h-display">)Skill(</div>)',
                r'\1About\2',
                new_content
            )
            # <div split-hero="" class="h-display">Set</div>
            new_content = re.sub(
                r'(<div split-hero="" class="h-display">)Set(</div>)',
                r'\1Me\2',
                new_content
            )
            # Also update "Our Digital Services" hidden text if I missed it above? No, covered.

        if content != new_content:
            with open(path, 'w') as f:
                f.write(new_content)
            print(f"Updated 'Services' references in {os.path.basename(path)}")
        else:
            print(f"No 'Services' references found or already updated in {os.path.basename(path)}")

if __name__ == "__main__":
    rename_services_to_about_me()
