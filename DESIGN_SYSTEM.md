# Design System

Design direction: premium, calm, iOS/macOS-inspired, privacy-respecting utility software.

## Visual Language

- Liquid-glass inspired, but original to Tidyrail Studio.
- Bright cool-white surfaces, blue system accents, teal secondary accents, and soft silver gradients.
- Translucent panels with restraint, readable contrast, and visible edges.
- Soft depth, subtle highlights, compact spacing, and calm motion.
- No Apple logos, no Apple assets, no affiliation claims.
- Professional productivity tone, not playful or childish.

## Tokens

- Background: cool white / pale blue-gray with restrained blue light.
- Primary accent: iOS-style blue for primary actions.
- Secondary accent: teal for product identity and status details.
- Text: deep graphite.
- Radius: 12px for ordinary cards, 18-30px for glass surfaces and icons, pill radius for primary CTAs.
- Motion: scroll-linked 3D rails, gentle transforms, reduced-motion support.

## Components

- Compact sticky header.
- Collapsible mobile navigation.
- Outside-click and Escape close behavior for mobile navigation.
- Touch-friendly buttons.
- Glass panels for account/download surfaces.
- Glass app shells for product UIs, with a translucent command sidebar, elevated topbar, soft icon tiles, and readable data panels.
- Dashboard stat cards use an icon tile plus label/value hierarchy.
- Data tables use glass table containers on desktop and stacked row cards on mobile.
- Product app navigation collapses into compact touch-friendly command grids on small screens.
- Cards only for repeated product or platform items.
- Full-width sections for page rhythm.
- Referrer, theme-color, and mobile format-detection metadata on public pages.

## Accessibility

- Maintain readable contrast on glass.
- Preserve visible focus states.
- Keep buttons at least 44px tall on touch devices.
- Avoid text over busy 3D scenes.
- Respect `prefers-reduced-motion`.
- Prevent horizontal overflow on mobile and tablet breakpoints.
