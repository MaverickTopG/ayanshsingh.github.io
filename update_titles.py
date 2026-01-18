import os
import re

def update_titles():
    title_map = {
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/home.html": "Home",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/contact.html": "Contact",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/work.html": "Work",
        # Assuming services.html is "About" based on process of elimination or user intent, 
        # but to be safe I will just do the ones explicitly mapped first.
        # User said "About" but no about.html. I will stick to mapping existing files.
        # If services.html exists, maybe that's it? 
        # I'll update services.html to "Services" for now to be clean.
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/services.html": "Services",
        "/Users/ayanshsingh/Downloads/brutal_engine_v1/projectshowcase.html": "Project Showcase"
    }

    # Regex to find <title>...</title>
    title_pattern = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)

    for path, new_title in title_map.items():
        if not os.path.exists(path):
            print(f"Skipping {path}, file not found.")
            continue
        
        with open(path, 'r') as f:
            content = f.read()
        
        # Replace title
        # We use a function in substitution to just put the new title
        new_content = title_pattern.sub(f'<title>{new_title}</title>', content)
        
        if content != new_content:
            with open(path, 'w') as f:
                f.write(new_content)
            print(f"Updated title in {os.path.basename(path)} to '{new_title}'")
        else:
            print(f"Title already correct or not found in {os.path.basename(path)}")

if __name__ == "__main__":
    update_titles()
