# AeroBMSCE Website

A static website for the AeroBMSCE student aerospace and aeromodelling club at BMS College of Engineering.
It introduces the club, its aircraft, milestones, partners and contact details using plain HTML, CSS and JavaScript.

**Live site:** [akshat-codez.github.io/AeroBMSCE_TASK_REPO](https://akshat-codez.github.io/AeroBMSCE_TASK_REPO/)

## Pages and sections

- **Home** — The landing section, club overview, aircraft, achievements, past events, partners and footer.
- **Who we are** — The club's background, purpose and team information, on the home page.
- **What we build** — The engineering areas and aircraft information, on the home page.
- **Our Achievements** — Milestones and past events, on the home page.
- **Partner with us** — Partnership information, partner logos and a direct email contact card at `partner.html`.

The first four items are sections within `index.html`; the partner page is a separate HTML page.

## Project structure

```text
.
├── index.html         Home page and its content sections
├── partner.html       Partnership information and direct contact
├── css/               Shared styles, design tokens and section styles
│   └── sections/      Styles grouped by page section
├── js/                Vanilla JavaScript modules
│   ├── animations/    Scroll, navigation and visual effects
│   ├── core/          DOM, device, scrolling and initialization helpers
│   ├── data/          Content used by page renderers
│   ├── features/      Flight-path animation modules
│   ├── render/        Renderers for page sections
│   └── ui/            Navigation and other interface controls
├── images/            Club photos, aircraft images and partner logos
└── docs/              Project structure and implementation notes
```

## Run locally

From the project root, start Python's static file server:

```bash
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080). Keep the server running while reviewing the site. The site uses JavaScript modules, so serving the files locally is more reliable than opening `index.html` directly from disk.

## Deployment

GitHub Pages serves the repository's root folder from the `main` branch. The site uses relative links and asset paths so the pages work from the repository's GitHub Pages URL.

## Flaws of the original website

The earlier site history includes navigation links to `journey.html` and `partners.html` even though those pages were removed. The prompt 5A changes removed those stale pages and links while consolidating the remaining content. The project also moved from large, monolithic CSS and JavaScript files to section-based styles and modules, making the page easier to maintain.

## Design route and UI/UX decisions

The site keeps its dark navy and steel-blue palette, with Barlow Condensed for headings and IBM Plex Sans and IBM Plex Mono for body and technical text. The shared navigation links to the main sections and the Partner page. The Take Off and Partner calls to action use a contained plane animation, and the partner area presents a logo strip. The Partner page uses a direct email contact card instead of a form because this static site has no backend to receive enquiries.

## A problem or edge case faced

During local review, `localhost:8080` returned an empty response when no server was listening on that port. Running `python -m http.server 8080` from the repository root and opening the exact local address resolved it. A local server also allows the browser to load the site's relative assets and JavaScript modules in the same way the deployed site does.

## Credits

Logos and images were provided by the AeroBMSCE committee. AI tools were used during development.
