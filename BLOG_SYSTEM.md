# Blog System Documentation

## Overview

This website now includes a fully functional markdown-based blog system that allows you to write blog posts in Markdown and display them beautifully on your website.

## Features

- ✅ Write blog posts in Markdown format
- ✅ Frontmatter support for metadata
- ✅ Beautiful responsive design matching your site theme
- ✅ Featured posts highlighting
- ✅ Category filtering
- ✅ Reading time estimation
- ✅ Syntax highlighting for code blocks
- ✅ Individual blog post pages
- ✅ Back to blog navigation
- ✅ Social sharing integration

## Writing Blog Posts

### 1. Create a new Markdown file

Create a new `.md` file in the `src/content/blog/` directory. The filename will be used as the default slug.

Example: `src/content/blog/my-new-post.md`

### 2. Add frontmatter

At the top of your Markdown file, add frontmatter with the following fields:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description of your blog post that appears in the blog listing."
date: "2024-03-15"
readTime: "8 min read"
category: "Engineering"
featured: true
slug: "your-custom-slug"
---

# Your Blog Post Content

Write your blog post content here using standard Markdown syntax.
```

### 3. Frontmatter Fields

- **title**: The title of your blog post (required)
- **excerpt**: A brief description shown in the blog listing (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **readTime**: Estimated reading time (required)
- **category**: Post category for filtering (required)
- **featured**: Set to `true` to highlight as a featured post (optional, defaults to false)
- **slug**: Custom URL slug (optional, defaults to filename)

### 4. Markdown Content

Write your blog post content using standard Markdown syntax. The system supports:

- Headers (H1, H2, H3, etc.)
- Paragraphs and line breaks
- **Bold** and *italic* text
- Links and images
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Blockquotes
- Tables (with GitHub Flavored Markdown)
- Horizontal rules

### 5. Code Blocks

For code blocks, use triple backticks with language specification:

\`\`\`typescript
const blogPost: BlogPost = {
  title: "My Post",
  content: "Content here"
};
\`\`\`

## File Structure

```
src/
├── content/
│   └── blog/
│       ├── building-scalable-ux-azure-logic-apps.md
│       ├── facebook-to-microsoft-cloud-journey.md
│       └── future-of-low-code-development.md
├── components/
│   ├── Blog.tsx              # Main blog listing component
│   └── BlogPost.tsx          # Individual blog post component
└── utils/
    └── blog.ts               # Blog utility functions
```

## Available Functions

The blog system provides several utility functions in `src/utils/blog.ts`:

- `loadBlogPosts()`: Load all blog posts
- `getBlogPost(slug)`: Get a specific blog post by slug
- `getFeaturedPosts()`: Get only featured posts
- `getPostsByCategory(category)`: Get posts by category
- `getRecentPosts(limit)`: Get recent posts with optional limit

## Categories

You can organize your posts using categories. Popular categories might include:

- Engineering
- Technology
- Career
- Leadership
- Personal
- Tutorials

## Featured Posts

Set `featured: true` in the frontmatter to highlight important posts. Featured posts:

- Display with a special "Featured" badge
- Can be filtered separately
- Stand out visually in the blog listing

## Customization

### Styling

The blog uses Tailwind CSS classes and matches your existing site theme. To customize:

1. Edit the components in `src/components/Blog.tsx` and `src/components/BlogPost.tsx`
2. Modify the Tailwind classes to match your desired styling
3. Update the prose classes for markdown content styling

### Markdown Components

Custom markdown components are defined in the `BlogPost.tsx` component. You can customize how different markdown elements are rendered by modifying the `components` prop in the `ReactMarkdown` component.

## SEO and Social

Each blog post automatically includes:

- Proper heading hierarchy for SEO
- Reading time estimation
- Publication dates
- Category organization
- Social sharing links (currently configured for Bluesky)

## Development Workflow

1. **Write**: Create a new `.md` file with frontmatter
2. **Preview**: The development server will automatically reload
3. **Test**: Check the blog listing and individual post pages
4. **Deploy**: Your static site will include all blog posts

## Sample Blog Posts

The system comes with three sample blog posts to demonstrate the features:

1. **Building Scalable UX for Azure Logic Apps** (Featured, Engineering)
2. **From Facebook to Microsoft: A Journey in Cloud Computing** (Career)
3. **The Future of Low-Code Development** (Featured, Technology)

You can modify or replace these with your own content.

## Technical Details

- **Markdown Processing**: Uses `react-markdown` with `remark-gfm` for GitHub Flavored Markdown
- **Frontmatter Parsing**: Uses `gray-matter` for YAML frontmatter parsing
- **Styling**: Uses `@tailwindcss/typography` for beautiful markdown styling
- **Loading**: Dynamic imports ensure optimal performance
- **TypeScript**: Full TypeScript support with proper type definitions

## Troubleshooting

### Posts not appearing

1. Check that the `.md` file is in `src/content/blog/`
2. Verify the frontmatter is properly formatted with `---` delimiters
3. Ensure all required frontmatter fields are present
4. Check the browser console for any loading errors

### Styling issues

1. Verify Tailwind CSS is configured with the typography plugin
2. Check that prose classes are applied correctly
3. Ensure custom component styling matches your theme

### Build errors

1. Check that all markdown files have valid frontmatter
2. Verify TypeScript types are correctly imported
3. Make sure all required dependencies are installed

## Next Steps

Consider adding:

- Search functionality
- Tag system (in addition to categories)
- RSS feed generation
- Comment system integration
- Related posts suggestions
- Reading progress indicators
- Dark/light mode for blog posts

Enjoy your new blog system! 🎉
