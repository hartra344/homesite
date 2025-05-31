export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  slug: string;
  content: string;
  published?: boolean; // Optional field to indicate if the post is published
}

export interface BlogPostMatter {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  slug: string;
}

// Simple frontmatter parser for browser environment
const parseFrontmatter = (content: string) => {
  const lines = content.split("\n");

  // Check if the file starts with frontmatter
  if (lines[0] !== "---") {
    return { data: {}, content };
  }

  let endIndex = -1;
  const frontmatterLines: string[] = [];

  // Find the end of frontmatter
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIndex = i;
      break;
    }
    frontmatterLines.push(lines[i]);
  }

  if (endIndex === -1) {
    return { data: {}, content };
  }

  // Parse frontmatter YAML (simple key: value pairs)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};
  frontmatterLines.forEach((line) => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle boolean values
      if (value === "true") {
        data[key] = true;
      } else if (value === "false") {
        data[key] = false;
      } else {
        // Remove quotes if present
        data[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  });

  // Get the content after frontmatter
  const markdownContent = lines
    .slice(endIndex + 1)
    .join("\n")
    .trim();

  return { data, content: markdownContent };
};

// Function to load blog posts
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  // In a Vite environment, we need to use dynamic imports
  const modules = import.meta.glob("/src/content/blog/*.md", {
    query: "?raw",
    import: "default",
  });
  const posts: BlogPost[] = [];

  for (const path in modules) {
    try {
      const content = (await modules[path]()) as string;
      const { data, content: markdownContent } = parseFrontmatter(content);
      const fileName = path.split("/").pop()?.replace(".md", "") || "";

      const post: BlogPost = {
        id: fileName,
        title: data.title || "Untitled",
        excerpt: data.excerpt || "",
        date: data.date || new Date().toISOString(),
        readTime: data.readTime || "5 min read",
        category: data.category || "General",
        featured: data.featured || false,
        slug: data.slug || fileName,
        content: markdownContent,
        published: data.published !== undefined ? data.published : true, // Default to true if not specified
      };

      posts.push(post);
    } catch (error) {
      console.error(`Error loading blog post from ${path}:`, error);
    }
  }

  // Sort posts by date (newest first)
  return posts
    .filter((x) => x.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to get a single blog post by slug
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  const posts = await loadBlogPosts();
  return (
    posts.find((post) => post.slug === slug) || null
  );
};

// Function to get featured posts
export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.filter((post) => post.featured);
};

// Function to get posts by category
export const getPostsByCategory = async (
  category: string
): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to get recent posts
export const getRecentPosts = async (
  limit: number = 5
): Promise<BlogPost[]> => {
  const posts = await loadBlogPosts();
  return posts.slice(0, limit);
};
