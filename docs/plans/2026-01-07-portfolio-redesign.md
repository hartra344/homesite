# Portfolio Redesign Design Document

**Date**: 2026-01-07
**Status**: Approved for Implementation

---

## Goals

1. **Visual refresh**: Move from dark techy aesthetic to warm & approachable
2. **Better UX/navigation**: Reduce scroll fatigue, improve content discovery
3. **Elevate blog**: Dedicated page with search, categories, featured posts

---

## Visual Language

### Color Palette

```
Background:     cream (#FDFCFA), paper (#F9F8F5), stone (#F3F2EF)
Primary:        sage-400 (#7C9082), sage-500 (#5F7563)
Secondary:      olive-500 (#5C6B4D), olive-600 (#4A5640)
Text Primary:   charcoal-900 (#2D3A2E)
Text Secondary: charcoal-600 (#525C53)
Borders:        sage-200 (#C7D0C9)
```

### Typography

- **Headings**: Outfit, medium weight (500-600)
- **Body**: Inter, regular (400)
- **Scale**: Editorial feel, smaller than current startup-style sizing

### Interactions

- Remove: Animated blobs, gradient text, scale transforms
- Add: Subtle hover lifts (`translate-y-[-2px]`), gentle shadows
- Transitions: 200ms ease-out

---

## Site Structure

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Focused homepage |
| `/blog` | Full blog archive (NEW) |
| `/blog/:slug` | Individual posts (exists) |

### Homepage Sections

1. **Hero** (~60vh): Greeting, one-line description, 2 CTAs
2. **About snippet**: 2-3 sentences, quick facts
3. **Featured posts**: 3 recent/featured blog cards
4. **Contact**: Simple CTA with email + socials

### Blog Page Features

- Search bar with keyword filtering
- Category pills (All, Tech, Career, Personal, etc.)
- Featured posts section (1-2 pinned)
- Post grid (2-col desktop, 1-col mobile)
- Reading time estimates on all cards

---

## Navigation

### Header

- Logo/name (left)
- Links (right): About, Blog, Contact
- Sticky with blur background on scroll
- Language switcher moved to footer

### Mobile

- Hamburger menu with slide-out drawer
- Same link structure

---

## Component Inventory

| Component | Description |
|-----------|-------------|
| `Button` | Primary (sage fill) + Secondary (outlined) |
| `Card` | Blog cards, consistent padding/shadow |
| `Tag` | Category pills, small colored badges |
| `Input` | Search input with icon |
| `SectionHeader` | Title + subtitle pattern |
| `PostCard` | Reusable blog preview |
| `NavLink` | Header links with active state |

---

## Responsive Approach

- Mobile-first with Tailwind breakpoints
- Single column < 640px
- 2-column blog grid at md (768px)
- 3-column blog grid at lg (1024px)

---

## Implementation Phases

### Phase 1: Foundation
- Update tailwind.config.js with new colors/typography
- Update index.css for light theme base
- Remove blob animations from Hero

### Phase 2: Navigation & Structure
- Create BlogPage component and route
- Update Header navigation
- Update App.tsx routing

### Phase 3: Homepage Components
- Redesign Hero section
- Create condensed About section
- Create FeaturedPosts component
- Update Contact section

### Phase 4: Blog Page
- Implement search functionality
- Add category filtering
- Create blog card component
- Add reading time calculation

### Phase 5: Polish
- Refine animations/transitions
- Accessibility audit
- Responsive testing
