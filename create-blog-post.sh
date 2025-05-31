#!/bin/bash

# Blog Post Creator Script
# Usage: ./create-blog-post.sh "My Post Title" "Technology"

if [ $# -lt 2 ]; then
    echo "Usage: $0 \"Post Title\" \"Category\" [featured]"
    echo "Example: $0 \"My New Post\" \"Technology\" true"
    exit 1
fi

TITLE="$1"
CATEGORY="$2"
FEATURED="${3:-false}"

# Generate slug from title
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | tr ' ' '-' | sed 's/--*/-/g' | sed 's/^-\|-$//g')

# Get current date
DATE=$(date +%Y-%m-%d)

# Create filename
FILENAME="src/content/blog/${SLUG}.md"

# Check if file already exists
if [ -f "$FILENAME" ]; then
    echo "Error: File $FILENAME already exists!"
    exit 1
fi

# Create the blog post file
cat > "$FILENAME" << EOF
---
title: "$TITLE"
excerpt: "Brief description of your blog post goes here."
date: "$DATE"
readTime: "5 min read"
category: "$CATEGORY"
featured: $FEATURED
slug: "$SLUG"
---

# $TITLE

Write your blog post content here using Markdown syntax.

## Introduction

Start with an engaging introduction that hooks your readers.

## Main Content

Organize your content with clear headings and sections.

### Code Examples

If you're writing about technical topics, include code examples:

\`\`\`typescript
const example = {
  message: "Hello, world!",
  isAwesome: true
};
\`\`\`

### Lists

Use lists to organize information:

- Point one
- Point two
- Point three

## Conclusion

Wrap up your post with a clear conclusion.

---

*What do you think about this topic? Feel free to reach out on [Bluesky](https://bsky.app/profile/travis.dev) to continue the conversation.*
EOF

echo "Blog post created: $FILENAME"
echo "Title: $TITLE"
echo "Category: $CATEGORY"
echo "Featured: $FEATURED"
echo "Slug: $SLUG"
echo ""
echo "Edit the file to add your content, then your blog post will be available on your website!"
