# Runtime typography

The current Notes z atramentem iteration uses locally bundled IBM Plex Serif for headings, body text, job titles, data, navigation and controls. Regular 400, Medium 500, SemiBold 600 and Bold 700 are real local font faces. This reflects the user’s explicit extension of the original headings-only choice. Georgia/Times New Roman are fallback serif faces. The application makes no remote font requests. The former Geist Serif font and its SIL OFL license remain in the immutable historical Poster People kit and are no longer loaded by the runtime.

## IBM Plex Serif

- Assets: `IBMPlexSerif-Regular.woff2`, `IBMPlexSerif-Medium.woff2`, `IBMPlexSerif-SemiBold.woff2` and `IBMPlexSerif-Bold.woff2`; complete upstream character sets, unmodified.
- CSS: `@font-face` in ../globals.css with normal style, weights 400/500/600/700 and `font-display: swap`; brand, editorial, UI and data tokens share the same family. Text content is preserved.
- [Official IBM source](https://github.com/IBM/plex/tree/master/packages/plex-serif/fonts/complete/woff2); [raw asset](https://raw.githubusercontent.com/IBM/plex/master/packages/plex-serif/fonts/complete/woff2/IBMPlexSerif-Regular.woff2), retrieved 2026-11-10.
- Original license: [IBM-Plex-LICENSE.txt](IBM-Plex-LICENSE.txt), copied unchanged from IBM/plex/LICENSE.txt.
- SHA-256:
  - `Regular: 024ebce13cec984b46e350dd85fa7c01105c777e116bfe95f097ad7fa93f39f2`
  - `Medium: f66376aeb33a5b32116558e0de53b76b48531f6388e352aeeb35ad82ea05cfaa`
  - `SemiBold: 030d808e82f99ebe5c21d50745bd06e5ce16ad9e94b360f5adcc19362beb5344`
  - `Bold: 3b9eb99793dd9fed419aaf1af03559ea28bac17b7cb6146e7f8fc3db813621fe`

## Retained historical assets

# Timeless Sans Variable

`timeless-sans-variable.woff2` is the free Timeless Sans variable font served by the official
[Timeless Type](https://timeless.co/type) website. The vendor describes the Timeless family as
free for personal and commercial use.

The previous runtime used the Grotesk cut with `STYL` and `ital` pinned to `0`. These are existing implementation assets, not the target for new headings. Follow the active [GUI entry](../../../GUI.md). The historical kit retains Geist Serif Regular and its license.

## Web-optimized Grotesk

`timeless-grotesk-web-variable.woff2` is generated from the original asset by
pinning `STYL=0` and `ital=0`, matching the existing global theme settings. It keeps
all 417 mapped Unicode characters, glyph coverage and the weight axis (300–800),
while discarding unused stylistic/italic interpolation. The original is retained.

Generate with FontTools `varLib.instancer` using those axis values and WOFF2 output;
preserve timestamps for repeatability. FontTools is asset tooling, not a runtime dependency.
These retained Timeless assets are no longer loaded by the application.
