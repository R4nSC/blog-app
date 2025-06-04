import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the frontmatter
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.date) {
      console.error(`Missing required fields in ${slug}.md`);
      return null;
    }

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    // Return the post data
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      content: contentHtml,
      author: data.author || 'Anonymous',
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    // Get all .md files from the posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          // Remove ".md" from file name to get slug
          const slug = fileName.replace(/\.md$/, '');

          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          // Parse frontmatter
          const { data } = matter(fileContents);

          // Validate required fields
          if (!data.title || !data.date) {
            console.error(`Missing required fields in ${fileName}`);
            return null;
          }

          // Return the metadata
          return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt || '',
            author: data.author || 'Anonymous',
            tags: data.tags || [],
          };
        })
    );

    // Filter out any null values and sort by date
    return allPostsData
      .filter((post): post is PostMetadata => post !== null)
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}
