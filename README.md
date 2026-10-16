# AeroBMSCE Website

A static website for the AeroBMSCE student aerospace and aeromodelling club at BMS College of Engineering.
It introduces the club, its aircraft, milestones, partners and contact details using plain HTML, CSS and JavaScript.

**Live site:** https://aerobmsce-qb4mh8jv6-akshat-codezs-projects.vercel.app/

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

## Deployment

The website is deployed on Vercel and connected to my GitHub repository. Vercel serves the static site from the repository root.

## Flaws of the original website

While going through the original site, I noticed that some navigation links pointed to pages that were no longer part of the site. The history pages also felt separate from the rest of the navigation. I removed those stale links as the content was brought together, and organized the styles and scripts into smaller files so the site is easier to follow and update.

## Design route and UI/UX decisions

I kept the site's navy and steel-blue colors and its existing fonts, then aimed to make the pages feel like parts of the same club website. I looked at a range of AI design references, including Lovable, and motion ideas from motionsites.ai while working out the layout and interactions. The Take Off and Partner buttons use a small plane animation, and the partner logos sit together in a strip. The Partner page gives visitors a direct email contact instead of a form, since the site has no backend to receive enquiries.

## A problem or edge case faced

One detail I had to get right was the Partner button animation. I wanted the plane to stay clipped inside the button, travel from left to right while climbing, and give the visitor a moment to see the animation before the page changed. I used CSS keyframes for the flight and a short JavaScript delay to open `partner.html` after about one second. The button is disabled during that time to prevent a second click from interrupting the transition.

## Credits

Logos and images were provided in the orignal repository . I used AI tools for ideas and design references during development, then adapted those ideas to this website.

## Future improvements

I’d like to add a partnership enquiry form to `partner.html` so visitors can enter their details and send an enquiry directly to the club’s email.