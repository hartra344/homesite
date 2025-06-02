# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173
npm run preview          # Preview production build locally

# Build & Quality
npm run build           # TypeScript check + Vite production build
npm run lint            # Run ESLint

# Testing
npm test                # Run all Playwright E2E tests
npm run test:ui         # Open Playwright UI mode
npm run test:headed     # Run tests with visible browser
npm run test:accessibility  # Run only accessibility tests
npm run test:debug      # Debug mode for troubleshooting tests

# Content Management
npm run blog:new        # Create new blog post (or use ./create-blog-post.sh)
```

## Architecture Overview

This is a modern React portfolio website with the following architecture:

### Tech Stack
- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **Build**: Vite 6.3.5 (uses pnpm 9.1.3 as package manager)
- **Styling**: Tailwind CSS 3.4.17 with Typography plugin
- **Routing**: React Router DOM 7.6.1 for client-side routing
- **Content**: Markdown-based blog system with frontmatter

### Key Architectural Decisions

1. **Component Structure**: All components are in `src/components/` as functional TypeScript components. Each major section (Hero, About, Experience, Blog, Contact) is a separate component.

2. **Blog System**: 
   - Blog posts are stored as Markdown files in `src/content/blog/`
   - Posts use frontmatter for metadata (title, date, category, featured, slug)
   - `src/utils/blog.ts` handles parsing and loading blog content
   - Dynamic routing via React Router for individual blog posts

3. **Testing Strategy**:
   - Playwright for E2E and accessibility testing
   - Tests cover multiple browsers (Chrome, Firefox, Safari) and devices (mobile)
   - Dedicated accessibility test suite using axe-core
   - Tests automatically start dev server before running

4. **Styling Approach**:
   - Utility-first CSS with Tailwind
   - Custom animations defined in tailwind.config.js
   - Responsive design with mobile-first breakpoints
   - Inter font from Google Fonts

5. **Build Process**:
   - TypeScript compilation runs before Vite build
   - Static assets output to `dist/` for deployment
   - Optimized for static hosting (Vercel, Netlify, etc.)

### Important Files
- `src/App.tsx`: Main routing setup
- `src/utils/blog.ts`: Blog post loading and parsing logic
- `vite.config.ts`: Build configuration
- `playwright.config.ts`: E2E test configuration
- `create-blog-post.sh`: Shell script for scaffolding new blog posts

When making changes, ensure TypeScript types are maintained and run tests before considering work complete.