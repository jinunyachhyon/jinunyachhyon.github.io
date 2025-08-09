import { getAllBlogPosts, getAllBlogSeries } from "@/lib/blog"
import BlogClientPage from "@/components/blog-client-page"

export default function BlogPage() {
  // This runs on the server and can access filesystem
  const allPosts = getAllBlogPosts()
  const allSeries = getAllBlogSeries()

  // Pass data to client component
  return <BlogClientPage initialPosts={allPosts} initialSeries={allSeries} />
}
