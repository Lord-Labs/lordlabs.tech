# Third-party assets and references

## OpenDownload

`public/assets/projects/opendownload.svg` is the unmodified original wordmark from `apps/web/public/icon.svg` in [OpenDownload](https://github.com/Lord-Labs/OpenDownload). `opendownload-workspace.jpg` is the original 1065 × 927 JPEG from `docs/assets/workspace-video-v2.jpg`, showing the real application with a public Threads video. Both were copied from commit `7e59ef8bacd47e17d053cf764c382c7bed015fdb` on 2026-10-24. The project's [capture provenance](https://github.com/Lord-Labs/OpenDownload/blob/main/docs/SCREENSHOTS.md) identifies it as a real public application capture. Source titles, thumbnails and project trademarks retain their owners' rights; this capture is not generated artwork or a claim of ownership of the displayed media.

## LORD Labs identity

The logo, wordmark, favicon and social avatar were supplied by the owner in `LORD-Labs-Patchwork`. They remain the property of LORD Labs and are excluded from the website code's MIT license. Original logo files are used unmodified. The orbital linework and `public/assets/patchwork-pattern.svg` are original decorative website work inspired by that identity.

## GitHub

`public/assets/icons/github.svg` is the official black Invertocat, copied unmodified from `GitHub Logos/SVG/GitHub_Invertocat_Black.svg` in the [official logo download](https://brand.github.com/GitHub_Logos.zip), retrieved 2026-10-20. Used as a link to GitHub under its [brand guidelines](https://brand.github.com/foundations/logo). Trademarks remain GitHub's property.

## Lucide

Interface SVGs in `public/assets/icons/`, excluding `github.svg`, come from [lucide-icons/lucide 1.60.0](https://github.com/lucide-icons/lucide/tree/1.60.0/icons), licensed under ISC. See `licenses/lucide.txt`. The asset preparation script downloads pinned official SVGs, including pause/play and copy/check controls.

## Fonts

The current interface uses self-hosted variable [Alexandria](https://fonts.google.com/specimen/Alexandria) (Arabic subset, 31,348 bytes) and [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Latin subset, 27,348 bytes). Files were retrieved from Google Fonts on 2026-10-23; SIL Open Font License notices are retained in `licenses/alexandria.txt` and `licenses/plus-jakarta-sans.txt`. The selected language's primary font is preloaded. Earlier font assets below are retained for compatibility.

Self-hosted WOFF2 files come from Google Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Manrope](https://fonts.google.com/specimen/Manrope), and [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic). Each uses SIL Open Font License 1.1; notices are in `licenses/`.

## Design references

The current project gallery uses original CSS poster compositions informed by the visual hierarchy, bold type and color-led work presentation of [Studio Dumbar](https://studiodumbar.com/work) and [PORTO ROCHA](https://www.portorocha.com/). Their artwork, logos, video and source code are not bundled. Each poster presents LORD Labs' selected projects using the original project logo and real product capture credited below. [web.dev's animation guidance](https://web.dev/articles/animations-and-performance) and [W3C internationalization guidance](https://www.w3.org/International/quicktips/) informed motion and language behavior.

[Arc UI Tabs](https://uiarc.dev/components/tabs) and its [free registry source](https://uiarc.dev/r/tabs.json) informed the adapted native selection pill and directional panel transition. The MIT notice is retained in `licenses/arc-ui.txt`. [Arc UI motion](https://uiarc.dev/docs/motion), [buttons](https://uiarc.dev/components/button), and command palette informed interaction principles. The public previews and descriptions of [Morph Nav](https://uiarc.dev/components/morph-nav) and [Mega Menu Morph](https://uiarc.dev/components/mega-menu-morph) informed an independently written shared navigation highlight, compact header and mobile focus behavior. No paid source code, React, Radix, Motion, Arc runtime or Magic UI package is bundled. [Linear](https://linear.app/) and [Raycast](https://www.raycast.com/) are visual references for hierarchy, product presentation and controlled light on dark surfaces. Their branding and artwork are not used. Full design references are in `DESIGN.md`.

`public/assets/atelier-pattern.svg` and `atelier-ribbon.svg` are original vector decoration made for this website. The earlier hero used the owner's existing `symbol-dark.svg` unchanged; project marks and screenshots retain the provenance listed below.

The earlier generated `patchwork-studio.svg` remains available as an unused illustration; it is not the current hero. All supplied LORD Labs logos remain unmodified.

## ZipZap project assets

`public/assets/projects/zipzap.svg` is the original ZipZap mark from [the project website](https://zipzap-website.vercel.app/assets/zipzap.svg). `zipzap-desktop.jpg` is the site's actual application screenshot from [desktop-ar.jpg](https://zipzap-website.vercel.app/assets/desktop-ar.jpg), retrieved 2026-10-21. Both are used to present the project explicitly selected by the site owner, without editing the logo or fabricating an interface. ZipZap's repository is [Lord-Labs/ZipZap](https://github.com/Lord-Labs/ZipZap); the supplied Lord-shaban link redirects there. Project names and identity remain their owner's property. No executable ZipZap download is bundled.

The earlier geometric journal covers have been replaced by the supplied editorial images described below. Its initial bilingual articles are newly prepared editorial content, with further-reading attribution where applicable.


## Supplied editorial images

`public/assets/editorial/` contains unchanged copies of the three images supplied by the owner in Downloads: `✨.jpg` (open-possibilities), `download (2).jpg` (field-of-ideas), and `download.jpg` (a-small-universe). They are decorative artwork, not product captures or editorial reporting, and are excluded from the website source MIT license. The supplied image containing the word “Superintelligent” was not used.

## LOR. project assets

`public/assets/projects/lor.svg` is the original, unchanged logo from [Lord-Labs/lor, assets/logo.svg](https://github.com/Lord-Labs/lor/blob/main/assets/logo.svg). `lor-meeting.webp` is the original [meeting capture](https://lor-bay.vercel.app/landing/product-call-en.webp) from the [project page](https://lor-bay.vercel.app/about), retrieved 2026-10-21. It shows the real interface with demonstration data, as identified by its source; it is not a live meeting or user data. Branding remains its owner's property; the project repository is licensed AGPL-3.0. No application source code was copied into this website.

## Technology marks and current interaction references

The Rust, Tauri, Svelte, TypeScript and Next.js SVG paths in `public/assets/tech/` come unchanged from the [Simple Icons repository](https://github.com/simple-icons/simple-icons/tree/develop/icons), retrieved 2026-10-21. Its CC0 text is in `licenses/simple-icons.txt`; brand names and marks remain their owners' trademarks. The strip identifies technologies documented by the selected projects, rather than customers or endorsements. Assets are hosted locally.

The current native DOM interactions draw on the public documentation for Arc UI's free [segmented control](https://uiarc.dev/components/segmented-control/markdown), [text reveal](https://uiarc.dev/components/text-reveal/markdown) and [accordion](https://uiarc.dev/components/accordion/markdown), plus its [motion guidance](https://uiarc.dev/docs/motion). The supplied MCP endpoint returned HTTP 401, so public documentation was used. No paid source was retrieved or reconstructed. The earlier hero tabs have been removed; their earlier MIT notice remains available in `licenses/arc-ui.txt`.

## Earlier signal field and palette research

The previous line-field artwork and contour pattern were original vectors created for this website. Both have now been replaced by the open-horizon design. No artwork, image, shader or source code from a reference studio is bundled. The public descriptions and imagery of onformative’s [true/false](https://onformative.com/work/true-false/) and [Meandering River](https://onformative.com/work/meandering-river/) informed the general ideas of coordinated lines, change and branching patterns. These are references, not reproductions or claims of affiliation.

Color-role research used [Radix Colors: Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) and [Composing a palette](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette); the custom palette is not an installed Radix palette. Contrast calculations follow the relative-luminance method explained by [W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Current cloud horizon and material references

`public/assets/atmosphere/open-horizon.webp` is an original AI-generated atmospheric image made specifically for this website on 2026-10-21 using OpenAI image generation. It contains no logos or borrowed artwork. The original 1672 × 941 PNG was encoded as a local WebP (35,162 bytes) without changing its composition. All foreground copy and controls are accessible HTML; the decorative image has empty alt text and is hidden from assistive technology. No external image request is required at runtime.

The restrained glass navigation and clear reading surfaces were informed by [Apple’s design announcement](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/), [Linear’s account of its UI redesign](https://linear.app/now/how-we-redesigned-the-linear-ui), and [web.dev’s backdrop-filter guidance](https://web.dev/articles/backdrop-filter). Transform-only decorative motion follows [web.dev’s animation performance guidance](https://web.dev/articles/animations-and-performance). These are design and implementation references; no Apple or Linear assets, shaders, or source code are bundled.

## Day/night atmosphere — 2026-10-22

`public/assets/atmosphere/moonlit-horizon.webp` is an original night variant created with the built-in OpenAI image-generation tool, using `open-horizon.webp` as the edit target. The cloud geometry and framing were retained as a composition reference, with midnight blue lighting, delicate stars and a small crescent moon. The result is 1672 × 941, encoded as a 72,648-byte WebP. The source PNG remains outside the deployable website. The complete generation prompt is recorded in `qa/night-sky-prompt.txt`.

The photographic cloud and star images are used only in the hero. The rest of the page uses very subtle original CSS gradients on a continuous surface. Existing logos, project captures and editorial images were not modified. The supplied original light and dark LORD Labs logo variants crossfade with the theme; the stars and clouds do not contain branding.

The motion implementation follows [Google Chrome’s guidance on compositor-friendly motion](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/guides/ui-behaviors/motion/guide.md) and [W3C’s reduced-motion technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39). All effects use native browser features; no animation, theme, shader or icon package was installed for this revision.

## Subtle mist and the next chapter — 2026-10-22

`mist-ribbon.svg`, `mist-feather.svg`, and `mist-horizon.svg` in `public/assets/atmosphere/` are original code-authored vectors made for this website. Their soft ellipses serve as alpha masks for the existing day/night colors. They contain no borrowed photography, external resources, filters, or scripts. The hero photography remains confined to the hero.

[Arc UI’s Site Footer documentation](https://uiarc.dev/components/blocks/site-footer) informed the semantic navigation groups and restrained ending; no Arc component source was copied in this revision. [MDN’s mask-image reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image) was consulted for native mask behavior. Existing Lucide Git pull request, sun, moon, GitHub and arrow icons retain the attribution above. No dependencies were added.
