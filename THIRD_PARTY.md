# Third-party assets

## LORD Labs identity

The logo, wordmark, favicon, and social avatar were supplied by the owner in `LORD-Labs-Patchwork`. These assets remain the property of LORD Labs and are not released under the code’s MIT license.

## GitHub

`public/assets/icons/github.svg` is the current official black Invertocat, copied unmodified from `GitHub Logos/SVG/GitHub_Invertocat_Black.svg` in [GitHub’s official logo download](https://brand.github.com/GitHub_Logos.zip), retrieved 2026-10-20. GitHub permits the logo as a social link to GitHub, subject to its [brand guidelines](https://brand.github.com/foundations/logo). GitHub trademarks remain GitHub’s property.

## Lucide

Interface SVGs in `public/assets/icons/`, excluding `github.svg`, are from [lucide-icons/lucide](https://github.com/lucide-icons/lucide/tree/1.60.0/icons), version `1.60.0`, under the ISC license. See `licenses/lucide.txt`.

## Fonts

Self-hosted WOFF2 files in `public/assets/fonts/` are from Google Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Manrope](https://fonts.google.com/specimen/Manrope), and [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic). Each is licensed under the SIL Open Font License 1.1. Full notices are included in `licenses/`.

## Original illustration

`public/assets/patchwork.svg` was created for this website as a vector illustration inspired by the supplied modular identity. `scripts/prepare-assets.mjs` reproduces it and retrieves pinned Lucide icons and Google Fonts. The official GitHub SVG is retained locally and is not fetched by that helper.
