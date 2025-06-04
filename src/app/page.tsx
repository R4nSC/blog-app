import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block p-6">
              <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.author && (
                  <span> · By {post.author}</span>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>

      <section id="about" className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About This Blog</h2>
        <p className="mb-4">
          Welcome to My Tech Blog! This is a place where I share my thoughts, experiences, and knowledge about web development, programming, and technology.
        </p>
        <p>
          Feel free to explore the articles and let me know what you think. If you have any questions or suggestions, don&apos;t hesitate to reach out.
        </p>
      </section>
    </div>
  );
}
