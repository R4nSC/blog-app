import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: BlogPostParams): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);

  // If the post doesn't exist, show a 404 page
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-blue-600 dark:text-blue-400 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.author && <span> · By {post.author}</span>}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
