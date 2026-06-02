# Project Guide

This project is now organized so you can change content and images quickly without hunting through the whole codebase.

## Main Files

- `index.html`: Full page structure, section content, buttons, image paths, modal markup.
- `styles.css`: All colors, layout, spacing, responsive behavior, floating button styling.
- `script.js`: Navigation, modal, form submission, lightbox, slider, and contact config.
- `images/`: All local image assets used by the page.

## Fast Changes

### 1. Change phone number, email, brochure URL

Open `script.js` and update the `siteConfig` object at the top.

Fields:

- `phone`
- `leadEmail`
- `brochureUrl`

### 2. Change text on the page

Open `index.html` and search the visible text directly.

Examples:

- Hero title: search `Max Estate 361`
- Pricing heading: search `Pricing and Area`
- About section: search `About Max Estates`
- RERA info: search `RERA Information`

### 3. Change the floating bottom button

Open `index.html` and search:

- `floating-actions`
- `Floating Brochure`

Open `styles.css` and search:

- `.floating-actions`
- `.float-action.brochure`

### 4. Change images

All major images are now stored locally inside the `images/` folder.

You have 2 easy options:

1. Replace the file with the same name in the same folder.
2. Or change the path in `index.html` if you want a different filename.

## Images Folder Structure

```text
images/
  amenities/
  common/
  floorplan/
  gallery/
  hero/
```

## Current Image Map

### `images/common/`

- `logo.svg`: Main logo, developer logo, modal logo
- `newpdfimg.png`: Brochure icon
- `review-badge.webp`: Google review badge in hero section
- `costing.jpg`: Pricing/costing card image
- `locationmap.webp`: Static map preview

### `images/hero/`

- `deskban1.webp`: Hero slide 1 and social preview image
- `deskban2.webp`: Hero slide 2 and virtual visit preview

### `images/floorplan/`

- `masterplan.webp`: Master plan section
- `sample-floorplan.webp`: Floor plan preview card

### `images/gallery/`

- `1.webp`
- `2.webp`
- `3.webp`
- `4.webp`

### `images/amenities/`

- `indoor-games-area.webp`
- `swimming-pool.webp`
- `kids-play-area.webp`
- `jogging-track.webp`
- `gym.webp`
- `lifts.webp`
- `banquet-hall.webp`
- `multipurpose-sports-court.webp`

## Where To Edit What

### Hero section

- File: `index.html`
- Search: `hero-slides`, `hero-copy`, `review-strip`
- Images: `images/hero/`

### Pricing section

- File: `index.html`
- Search: `pricing-grid`, `table-card`, `brochure-card`
- Image: `images/common/costing.jpg`

### Master plan and floor plan

- File: `index.html`
- Search: `master-plan-image`, `Sample Floor Plan`
- Images: `images/floorplan/`

### Amenities

- File: `index.html`
- Search: `amenities-grid`
- Images: `images/amenities/`

### Gallery

- File: `index.html`
- Search: `gallery-grid`
- Images: `images/gallery/`

### Location

- File: `index.html`
- Search: `location-grid`
- Image: `images/common/locationmap.webp`

### Floating brochure button

- File: `index.html`
- Search: `floating-actions`
- Styles: `styles.css`, search `.float-action.brochure`

## Notes

- I added section comments in the main files so you can identify blocks faster.
- The left floating `Floor Plan` button has been removed.
- If you only want to swap an image, the easiest method is replacing the existing file inside `images/` with the same name.
