# Luvora — Merged Foundation

This project merges the supplied Step 03 homepage and Step 04 template-selection system.

## Structure
- `index.html` — premium homepage from Step 03
- `templates.html` — template selection/filter page from Step 04
- `editor.html` — temporary editor foundation so template links are not broken; replace/expand later
- `css/home.css` — homepage styles
- `css/templates.css` — template-page styles
- `templates/templates.js` — template data and rendering/filter logic
- `assets/icons/` — shared favicon and logo (duplicate copies from Step 03/04 were consolidated)
- `assets/images/` — homepage image placeholders
- `assets/images/templates/` — template image placeholders
- `assets/js/site-config.js` — central place for brand name, tagline and copyright year

## Future-ready notes
The merge deliberately keeps page-specific CSS separate instead of combining unrelated styles into one large stylesheet. This reduces collisions as login, authentication, payments, dashboard, editor features, additional pages and redesigns are added.

The template page also accepts `?occasion=birthday`, `?occasion=anniversary`, `?occasion=valentines`, or `?occasion=just-because` for direct filtering.

The actual editor, authentication/backend, database and payment integration are not present in the supplied source, so they have not been fabricated. The editor page is only a safe placeholder for the existing template links.
