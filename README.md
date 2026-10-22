# LORD Labs — a journey through the lab

The public home of [LORD Labs](https://github.com/Lord-Labs): a selected project gallery and bilingual journal, built with HTML, CSS and JavaScript. No framework, account system, tracking, package install, or server runtime is required.

## Run

Node.js 22 or later:

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run snapshot
npm run build
npm run preview
```

`npm run dev` and `npm run build` generate the journal pages, homepage fallbacks, and sitemap from local content. Build does not require a network connection. Source is in `public/`; deployable output is in `dist/`.

## Section pages

The main navigation links to `/projects/`, `/journal/`, `/about/` and `/contribute/`. The homepage retains its four chapter previews and adds links to each full section. Its chapter rail still scrolls within the homepage.

`npm run dev` and `npm run build` generate the section pages from the same homepage sections, project selection and article data. Edit the shared source in `public/index.html`, `public/projects.js`, `public/ar.js` and `public/journal.js`; generated section HTML is not an independent content source. The projects page reuses the gallery search, filters, source details, image preview and command search. Every page preserves language in internal links and marks the current section in desktop and mobile navigation.

## Select projects

Edit **`public/projects.js`**. This is the explicit editorial selection and display order. New public repositories do not appear automatically. The current selection is **ZipZap** and **LOR.**; the supplied Lord-shaban URL now redirects to its canonical repository under Lord-Labs.

Each entry defines the repository, unique slug, platform (`desktop` or `web`), identity class, bilingual context, original logo, product capture, website and contextual note. Add poster identity and responsive rules in `public/refinements.css`. Each project also supplies three bilingual benefits shown on the poster caption and explained in its details dialog. Keep supplied project logos intact. The gallery, platform filters, search and live metadata share the same explicit selection. The current gallery is a staggered pair of bold graphic posters: lime for ZipZap, lilac and pink for LOR. Both projects remain visible and discoverable. Clicking a poster opens its real interface in a native preview dialog; Escape closes it and returns focus. Hover and keyboard focus move the screenshot within the poster, with reduced-motion and pause support.

Only the selected public, active, original repositories belonging to Lord-Labs are fetched, by individual repository endpoint. An unexpected response or unavailable API keeps the saved copy visible with an explicit status. Search, command navigation, update dates and counts all use the same selected collection. No token is used.

Run `npm run snapshot` after changing the selection to update the saved metadata in `public/data/repositories.json`. The build itself does not fetch GitHub. Remote descriptions are rendered as plain text; repository URLs are constructed for the verified organization. A selected project does not need a public release to be shown.

## Write in the journal

Edit **`public/journal.js`**. Each article has a unique lowercase slug, date, approximate reading time, cover image, and complete English/Arabic copy. Content consists of an introduction, named sections with paragraphs, a takeaway, and optional further-reading links.

Run `npm run build` (or restart `npm run dev`) after edits. `scripts/content.mjs` generates `/journal/`, each `/journal/<slug>/` article, homepage previews and sitemap entries. Generated HTML lives in `public/journal/`; edit the content source rather than generated files.

The three initial notes are newly prepared editorial starter content about design, curation and contribution. They are not imported historical posts. Review and adapt them before publishing. Article pages include complete content without JavaScript; JavaScript adds Arabic switching, persistent language and localized links. Both translations ship in HTML. `locale.js` resolves the URL language, then the saved preference, before styles paint; CSS selects the matching text without waiting for application modules. Native option labels and placeholders are localized during parsing. The document defaults to English when all JavaScript is disabled.

## Interaction and motion

A full-width light opening shares its surface with the header. Centered live typography sits above matching original daytime and moonlit cloud horizons, with slow transform-only drift. A shared day/night control crossfades the sky, light veils and original logo variants. The two local WebPs total 107,810 bytes; there is no runtime drawing loop. Projects remain in their dedicated chapter, followed by the lab, journal, contribution paths and final invitation.

The palette uses pearl surfaces, high-contrast slate text, muted blue controls, and a restrained clay accent. The photographic skies appear only in the hero and dissolve into one continuous page background. Transparent sections share a very faint native gradient, with no repeated cloud images or blurred content panels. Night mode uses a quiet slate/navy palette, soft blue controls and warm headline detail. Backdrop blur is confined to compact navigation and dialog overlays. Color roles and source references are documented in `DESIGN.md`. The local review page checks computed text contrast, including inherited opacity and translucent backgrounds, alongside the responsive and interaction checks. It is not a full accessibility certification.

The platform selector supports arrow keys, Home and End in both reading directions. A chapter rail tracks desktop navigation, and a thin progress line follows the page. The journal features one lead essay, two secondary stories, publication dates, and consistent archive/article layouts. Article contents highlight the current section; language stays attached to reading links. Same-origin page changes use progressive CSS view transitions where supported.

The theme follows the system preference until the visitor chooses a mode. `theme.js` applies the saved preference in the head before styles render, synchronizes both controls and other tabs, and retains the choice across reading pages. Entrance motion runs once, finishes when leaving the hero, and stays static under reduced motion or a paused preference.

The header becomes a smaller glass navigation surface after scrolling, with a stable layout and a separate return threshold. A shared highlight follows hover, keyboard focus and the current section. Mobile navigation closes on Escape, outside press or focus leaving. Motion can be paused, respects system reduced motion, and idles when the hero or page is hidden. Touch devices avoid header backdrop blur. There is no canvas loop, video, WebGL, scroll hijacking or custom cursor. Background metadata refreshes preserve focus within project cards.

Ctrl/Cmd K searches sections, selected projects and article titles. Arrow keys navigate results; Enter follows a result; Escape closes. `/` focuses project search. Native dialogs and disclosures provide focus management and keyboard behavior.

## Files

| File | Purpose |
| --- | --- |
| `public/index.html`, `public/ar.js`, `public/locale.js`, `scripts/localize.mjs` | Homepage structure, bilingual first-paint text and language bootstrap |
| `public/projects.js` | Explicit project selection and independent identities |
| `public/journal.js` | Bilingual article source |
| `scripts/content.mjs` | Static journal/fallback/sitemap generation |
| `public/app.js`, `public/reading.js`, `public/experience.js` | Homepage, reading, and shared compact navigation |
| `public/style.css`, `public/journey.css`, `public/sky.css`, `public/refinements.css` | Shared foundation, layouts and atmospheric day/night system |
| `public/repositories.js` | Selected project metadata validation and loading |
| `public/theme.js`, `public/hero.js`, `public/assets/atmosphere/` | Theme bootstrap, controls, cloud horizons and offscreen motion pause |
| `public/assets/tech/` | Locally hosted technology marks from Simple Icons |
| `public/assets/projects/` | Original ZipZap and LOR. identities and product captures |
| `DESIGN.md`, `IDEAS.md` | Decisions, references and next steps |

## Deployment

For Cloudflare Pages: framework **None**, build `npm run build`, output `dist`, Node 22. Use the folder containing package.json as the project root. The output includes `_headers` and static journal routes.

Production is hosted at [lordlabs.tech](https://lordlabs.tech/) through Cloudflare Pages. Pushes to `main` trigger deployment; deployable files are generated in `dist/`.

For local visual checks, open `/__qa.html` and run the layout/interaction audit. The review page is excluded from `dist/`.

## License

Website source: MIT. Supplied identity and project trademarks remain their owners' property. See `THIRD_PARTY.md` and `licenses/`.
