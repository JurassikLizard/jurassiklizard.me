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

## Project layout

- `hugo.toml`: site title, URL, menu, theme, and Hugo settings
- `content/`: Markdown articles and page resources
- `layouts/`: home page and post templates
- `assets/`: CSS and JavaScript processed and fingerprinted by Hugo
- `static/`: files copied unchanged into the site root
- `themes/terminal/`: the Git submodule containing the base theme
- `public/`: generated site output
