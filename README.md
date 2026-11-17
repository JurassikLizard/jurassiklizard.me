# Jurassik's Hideout

A personal Hugo static site using the [Hugo Terminal](https://github.com/panr/hugo-theme-terminal) theme.

## Local development

Install Hugo and initialize the theme submodule:

```sh
git submodule update --init --recursive
hugo server
```

Open the local address printed by Hugo. The server rebuilds the site when source files change.

To create the production files:

```sh
hugo --gc --cleanDestinationDir
```

The generated site goes in `public/`. That directory is not committed.

## Adding an article

Create a page bundle in `content/posts/`:

```text
content/posts/my-new-article/
  index.md
  cover.png
```

The `index.md` file should begin with front matter:

```toml
+++
title = "Article title"
date = "2026-11-17"
author = "JurassikLizard"
cover = "cover.png"
description = "One or two sentence summary."
+++

Article text starts here.
```

- `title`, `date`, `author`, and `description` control the page heading and metadata.
- `cover` is optional. Add `cover.png`, `cover.jpg`, or `cover.webp` if the post has a cover image.
- Set `draft = true` to keep the article out of a normal build. Run `hugo server -D` to preview drafts.
- Use normal Markdown headings, links, code fences, and images in `index.md`.
- To use the medieval theme for one article, add `theme = "medieval"` to its front matter. Without it, the article uses the normal theme.

### Front matter options

These are the fields read by the post templates and theme:

| Field | What it does |
| --- | --- |
| `title`, `date`, `author`, `description` | Set the title, publication date, byline, and summary used for page and social metadata. |
| `cover`, `coverCredit` | Choose a page-bundle cover image and optional credit (shown on hover). |
| `tags`, `categories`, `keywords` | Add post tags, Open Graph categories, and SEO keywords. Use arrays, e.g. `tags = ["writing", "fantasy"]`. |
| `theme` | Select a matching stylesheet in `assets/css/themes/`, e.g. `"medieval"`. |
| `draft` | Keep the post out of normal builds; preview with `hugo server -D`. |
| `noindex` | Set to `true` to ask search engines not to index the page. |
| `readingTime` | Set to `true` to show the estimated reading time and word count. |
| `Toc`, `TocTitle` | Set `Toc = true` to show a table of contents; optionally change its heading. |
| `hideComments` | Set to `true` to hide the Giscus comments section. |
| `authorTwitter` | Override the Twitter creator for this post when Twitter metadata is configured site-wide. |
| `showFullContent` | Show the full post in theme-generated lists instead of a summary. |
| `lastmod` | Supply an updated date; it is displayed only if `showLastUpdated` is enabled in the site config. |

A new draft can also be created with:

```sh
hugo new content/posts/my-new-article/index.md
```

## PGP signatures

Some posts include an `index.md.signed` resource containing a PGP clearsign. Posts with no matching signed file show an unsigned warning.

To regenerate signed copies on Windows, run `pgpsign.ps1` after installing GPG4Win:

```powershell
.\pgpsign.ps1
```

The script signs every Markdown file in `content/posts/`.

## Article themes

The default Terminal appearance applies unless an article declares a theme. The front matter is:

```toml
theme = "medieval"
```

The medieval theme gives the article a parchment-and-manuscript look and omits the animated Three.js background. Theme CSS lives in `assets/css/themes/`. Add another theme with a matching file, for example `assets/css/themes/my-theme.css`, and select it with `theme = "my-theme"`.

No image upload is required for a theme. Cover images remain optional and, when used, belong beside `index.md` as `cover.png`, `cover.jpg`, or `cover.webp`.

### Custom fonts and text styles

For a medieval post, put the font at `static/fonts/rune-script.woff2` (or update its URL in `assets/css/themes/medieval.css`). Edit that stylesheet's top color variables to change text, bold text, headings, links, and borders. Markdown italics and bold work normally (`*italic*`, `**bold**`).

For custom text, use the `style` shortcode: `{{< style class="rune" >}}ᚱᚢᚾᛖ{{< /style >}}`. Define its class in the medieval stylesheet; the `rune` class uses the custom font.

For a dialogue break with less space than a new paragraph, use `{{< softbreak >}}` between lines in the same paragraph: `“Stay close.”{{< softbreak >}}“I am.”`.

## Project layout

- `hugo.toml`: site title, URL, menu, theme, and Hugo settings
- `content/`: Markdown articles and page resources
- `layouts/`: home page and post templates
- `assets/`: CSS and JavaScript processed and fingerprinted by Hugo
- `static/`: files copied unchanged into the site root
- `themes/terminal/`: the Git submodule containing the base theme
- `public/`: generated site output
