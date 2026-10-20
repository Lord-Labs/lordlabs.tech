# LORD Labs

The home of **[LORD Labs](https://github.com/Lord-Labs)** — independent software, open ideas, and thoughtful digital products.

Designed for **https://lordlabs.tech/**. Built with HTML, CSS, and JavaScript. No framework, package install, tracking, or server runtime required. English and Arabic, responsive layouts, self-hosted fonts, keyboard navigation, and reduced-motion support are included.

## Local development

Requires Node.js 22 or later.

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run build
npm run preview
```

The complete deployable site is generated in `dist/`. Source lives in `public/`.

## Cloudflare Pages

1. Open **Workers & Pages → Create application → Pages → Import an existing Git repository**.
2. Connect **Lord-Labs/lordlabs.tech**. Authorize this repository in the organization if Cloudflare cannot see it.
3. Use these settings:

| Setting                | Value                                  |
| ---------------------- | -------------------------------------- |
| Framework preset       | None                                   |
| Production branch      | `main`                                 |
| Root directory         | Leave blank                            |
| Build command          | `npm run build`                        |
| Build output directory | `dist`                                 |
| Node version           | `22` (set `NODE_VERSION` if necessary) |

4. Deploy, then check the provided `*.pages.dev` URL.
5. In **Custom domains → Set up a domain**, add `lordlabs.tech`.

Every push to `main` deploys automatically after connecting the repository. Cloudflare reads `public/_headers` from the built output and applies its security headers.

### ربط الدومين من Name.com

لربط `lordlabs.tech` نفسه (الدومين الرئيسي) بـCloudflare Pages:

1. أضف الدومين إلى حسابك في Cloudflare، وراجع سجلات DNS التي تم استيرادها، خصوصًا سجلات البريد إن وجدت.
2. انسخ الـnameservers التي يحددها Cloudflare لهذا الدومين بالضبط.
3. من Name.com، افتح الدومين ثم **Nameservers** واستبدل القيم الحالية بالقيم التي أعطاها Cloudflare. لا تحتاج إلى نقل ملكية الدومين من Name.com.
4. انتظر تفعيل الـzone داخل Cloudflare، ثم أضف الدومين من صفحة **Custom domains** الخاصة بمشروع Pages. سيضيف Cloudflare سجل الربط ويصدر شهادة HTTPS.
5. اختياريًا أضف `www.lordlabs.tech` كدومين إضافي وأنشئ تحويلًا إلى الدومين الرئيسي.

لا تنشئ سجلًا يشير إلى رابط GitHub. لا تضع أي API token في كود الموقع أو المستودع. راجع إعداد DNSSEC قبل تغيير الـnameservers إذا كان مفعّلًا لدى المسجّل.

**الحالة عند التسليم:** الكود مرفوع على GitHub. النشر في حساب Cloudflare وتغيير DNS لم ينفذا، ولم يتم التحقق من عمل الدومين بالموقع الجديد.

## Updating projects

The initial project is this website. On each visit, the site reads all public, non-fork, non-archived repositories from the **Lord-Labs** organization using the public GitHub API, including pagination. It never needs a token and never reads private repositories. New projects appear automatically after you publish them.

Repository descriptions are displayed as plain text, and links are constructed only for the verified organization. If GitHub is unavailable or rate-limited, the static website project remains visible with a **Repository snapshot** status. The initial website card is curated in `public/index.html`; update it if you rename this repository. English repository descriptions retain their source language in the Arabic view.

## Editing content and identity

- Main page and English copy: `public/index.html`
- Arabic translations and interactions: `public/app.js`
- Design tokens and responsive layout: `public/style.css`
- GitHub repository validation and fetching: `public/repositories.js`
- Original supplied brand assets: `public/assets/brand/`
- Domain metadata: `index.html`, `robots.txt`, and `sitemap.xml`
- Contribution links: point to this site's Issues and contribution guide.

Brand colors: Carbon `#171B22`, Contributor `#D94E26`, Canvas `#F5F2EA`. Small orange text uses a darker accessible shade (`#B83D1B`). The supplied wordmark is used as vector paths. The isometric Patchwork artwork is an original website illustration, distinct from the unchanged brand logo.

## Design references and asset sources

- [Figma: web design trends for 2026](https://www.figma.com/resource-library/web-design-trends/) — expressive typography and deliberate interaction.
- [Linear](https://linear.app/) — restrained product storytelling and hierarchy.
- [Raycast](https://www.raycast.com/) — developer-focused clarity and interaction details.
- [GitHub Brand Toolkit](https://brand.github.com/foundations/logo) — the current official Invertocat, used unmodified as a link to GitHub.
- [Lucide](https://lucide.dev/) — SVG interface icons, pinned to `1.60.0`.
- [Google Fonts](https://fonts.google.com/) — Space Grotesk, Manrope, Noto Sans Arabic, self-hosted under the SIL Open Font License.
- [Cloudflare static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/).

No stock images or generated photography. The brand’s modular shape is the visual centerpiece. Third-party notices and licenses are in `THIRD_PARTY.md` and `licenses/`.

## License

Website source code: MIT. LORD Labs names, logos, and supplied brand artwork are reserved to their owner; third-party trademarks and assets retain their respective licenses. See `LICENSE` and `THIRD_PARTY.md`.
