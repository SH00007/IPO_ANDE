# ANDE Website Clone - Frontend Only

A frontend clone of the ANDE (Aspen Network of Development Entrepreneurs) website for consulting and development purposes.

## Project Structure
```
ande-website/
├── index.html
├── assets/
│   ├── css/
│   │   ├── style.css (main theme)
│   │   ├── blocks.css
│   │   └── [other stylesheets]
│   ├── js/
│   │   ├── jquery.min.js
│   │   ├── functions.js
│   │   ├── menu.js
│   │   └── [other scripts]
│   └── images/
│       └── [all images]
├── pages/
│   └── [additional pages as needed]
└── README.md
```

## Setup Complete ✓

All assets have been downloaded and the project structure is ready:
- ✓ 13 CSS files downloaded
- ✓ 18 JavaScript files downloaded
- ✓ 28 image files downloaded
- ✓ Project structure created

## Running Locally

Choose one method to run a local web server:

### Python 3
```bash
cd /Users/sh/Desktop/ANDE_Clone
python -m http.server 8000
```

### Python 2
```bash
cd /Users/sh/Desktop/ANDE_Clone
python -m SimpleHTTPServer 8000
```

### Node.js (with http-server)
```bash
cd /Users/sh/Desktop/ANDE_Clone
http-server
```

Then open `http://localhost:8000` in your browser.

## Next Steps

1. **Extract HTML Structure**: The actual HTML markup from the live site needs to be extracted and added to `index.html`
   - Visit https://andeglobal.org/
   - Use browser developer tools to inspect and copy the main content
   - Or use a web scraping tool to extract the structure

2. **Update Image Paths**: Verify all image URLs are using relative paths (e.g., `assets/images/logo-ande.png`)

3. **Remove Dynamic Content**:
   - Google Maps (requires API key)
   - Analytics scripts (remove or replace)
   - reCAPTCHA (remove or update)
   - Login/Member functionality (won't work without backend)
   - Forms (won't work without backend)

4. **Test Locally**: Run the local server and test all pages and functionality

5. **Customize**: Make any modifications needed for your consulting project

## Important Notes

- The original site uses WordPress, so dynamic functionality (forms, member login, product pages, etc.) will not work without a backend
- All stylesheet and script paths are already set to use local files (`assets/css/` and `assets/js/`)
- Images are stored in `assets/images/` directory
- Cookie consent banner can be removed or customized as needed

## Original Site
**Live Site:** https://andeglobal.org/

## Created
**Date:** April 7, 2026
**Purpose:** Frontend Clone for ANDE Consulting Project
