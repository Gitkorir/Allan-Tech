# TechFix Kenya

A responsive static website for TechFix Kenya, a Nairobi-based laptop repair and upgrade service. The site helps visitors diagnose laptop problems, explore repair or upgrade options, book a service, and contact the technician through WhatsApp.

## Features

- Laptop repair and issue diagnosis flow
- RAM upgrade estimates, including 4GB to 8GB upgrades
- SSD, cleaning, maintenance, and setup service messaging
- Booking form that prepares a WhatsApp message
- Contact form that opens WhatsApp with the visitor's message
- Light and dark mode with a saved browser preference
- Responsive layout for desktop and mobile screens
- GitHub Pages compatible static hosting

## Requirements

No build tools or backend are required.

For local development, install one of the following:

- Python 3, recommended for the local server
- Any other static file server, if preferred

The website uses Bootstrap, Font Awesome, and their supporting assets from CDNs, so an internet connection is needed for the complete styling and icon experience.

## Run Locally

1. Fork or clone the repository.
2. Open a terminal in the project directory.
3. Start the local server:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

4. Open the website in a browser:

[http://localhost:8000](http://localhost:8000)

Stop the server with `Ctrl+C`.

As a simple fallback, `index.html` can be opened directly in a browser, although using a local server is recommended for a more accurate browser environment.

## Project Structure

```text
.
├── index.html       # Homepage and service overview
├── diagnose.html    # Repair and upgrade estimator
├── book.html        # Booking form
├── about.html       # Business information and service principles
├── contact.html     # Contact form and business contact details
├── styles.css       # Shared responsive styles
├── scripts.js       # WhatsApp links, estimator, and form behavior
└── images/          # Website image assets
```

## WhatsApp Configuration

The WhatsApp destination is configured in `scripts.js`:

```javascript
const whatsappNumber = '254791969250';
```

The number must use international format without the leading `+` or spaces. If you fork this project for another business, replace that value with the correct WhatsApp number.

The visible phone number and direct contact link are also included in `contact.html` and the page footers. Update those references if the contact details change.

## Customizing the Website

- Edit service descriptions and page copy in the HTML files.
- Adjust colors, spacing, typography, and responsive behavior in `styles.css`.
- Update repair estimates and upgrade logic in `scripts.js`.
- Update theme behavior and the light/dark color tokens in `scripts.js` and `styles.css`.
- Replace or add images in `images/`, then update the relevant image paths and alt text in the HTML.
- Keep the WhatsApp message templates in `scripts.js` aligned with the services offered.

The estimator provides planning ranges only. Confirm real prices, parts availability, and compatibility before publishing any updated estimates.

## Deploy with GitHub Pages

1. Push the fork to GitHub.
2. Open the repository's **Settings** tab.
3. Select **Pages** in the sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder.
6. Click **Save**.
7. Wait for GitHub Pages to publish the site, then open the generated Pages URL.

Because this is a static site, no build command or environment variables are required for GitHub Pages.

## Deployment Notes

- Keep `index.html` at the repository root so static hosts use it as the homepage.
- Confirm that all filenames retain their capitalization, especially when deploying to Linux-based hosts.
- Test the WhatsApp links on a mobile device before publishing.
- Do not add API keys to these files. Any future server-side form handling should use a protected backend or a managed form service.

## License

No license has been added yet. Add a license before distributing or reusing the project publicly if you want to define usage permissions.
