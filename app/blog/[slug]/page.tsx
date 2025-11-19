import { notFound } from "next/navigation"
import { getBlogPostBySlug, getSeriesNavigation, extractHeadings, getAllBlogPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ChevronLeft } from 'lucide-react'
import { formatDate } from "@/lib/blog"
import BlogSeriesNavigation from "@/components/blog-series-navigation"
import BlogTOC from "@/components/blog-toc"
import ReactMarkdown from "react-markdown"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import Link from "next/link"

// Add this to force dynamic rendering
// export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const seriesNavigation = post.series ? getSeriesNavigation(post) : null
  const headings = extractHeadings(post.content)
  const allPosts = getAllBlogPosts()
  const currentPostIndex = allPosts.findIndex((p) => p.slug === post.slug)

  // For non-series posts, use regular previous/next logic
  const previousPost = !post.series && currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null
  const nextPost = !post.series && currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null

  return (
    <div className="container py-10 max-w-7xl">
      <div className="max-w-4xl mx-auto mb-10">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 mb-8"
          scroll={true}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to all posts</span>
        </Link>

        {/* Series Navigation */}
        {seriesNavigation && (
          <BlogSeriesNavigation
            currentPost={post}
            series={seriesNavigation.series}
            previousPost={seriesNavigation.previous}
            nextPost={seriesNavigation.next}
          />
        )}

        <div>
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
              {post.series && (
                <Badge variant="outline" className="border-primary text-primary">
                  Part {post.series.part} of {post.series.name}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>

          {post.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 max-w-7xl mx-auto">
        <div className="md:col-span-9 md:order-1 order-2">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children, ...props }) => {
                  const text = children?.toString() || ''
                  const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h1 id={slug} {...props}>
                      {children}
                    </h1>
                  )
                },
                h2: ({ children, ...props }) => {
                  const text = children?.toString() || ''
                  const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h2 id={slug} {...props}>
                      {children}
                    </h2>
                  )
                },
                h3: ({ children, ...props }) => {
                  const text = children?.toString() || ''
                  const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h3 id={slug} {...props}>
                      {children}
                    </h3>
                  )
                },
                h4: ({ children, ...props }) => {
                  const text = children?.toString() || ''
                  const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h4 id={slug} {...props}>
                      {children}
                    </h4>
                  )
                },
                h5: ({ children, ...props }) => {
                  const text = children?.toString() || ''
                  const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h5 id={slug} {...props}>
                      {children}
                    </h5>
                  )
                },
                h6: ({ children, ...props }) => {
                  const text = children?.toString() || ''
                  const slug = text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                  return (
                    <h6 id={slug} {...props}>
                      {children}
                    </h6>
                  )
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8 border-t">
            {/* Series navigation for series posts */}
            {seriesNavigation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seriesNavigation.previous && (
                  <Link href={`/blog/${seriesNavigation.previous.slug}`} className="group" scroll={true}>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous in Series</span>
                    </div>
                    <div className="p-4 border rounded-lg group-hover:bg-accent transition-colors">
                      <Badge variant="secondary" className="mb-2">
                        Part {seriesNavigation.previous.series?.part}
                      </Badge>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {seriesNavigation.previous.title}
                      </h3>
                    </div>
                  </Link>
                )}

                {seriesNavigation.next && (
                  <Link href={`/blog/${seriesNavigation.next.slug}`} className="group md:text-right" scroll={true}>
                    <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                      <span>Next in Series</span>
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </div>
                    <div className="p-4 border rounded-lg group-hover:bg-accent transition-colors">
                      <Badge variant="secondary" className="mb-2">
                        Part {seriesNavigation.next.series?.part}
                      </Badge>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {seriesNavigation.next.title}
                      </h3>
                    </div>
                  </Link>
                )}
              </div>
            )}

            {/* Regular navigation for standalone posts */}
            {!post.series && (previousPost || nextPost) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previousPost && (
                  <Link href={`/blog/${previousPost.slug}`} className="group" scroll={true}>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{previousPost.title}</h3>
                  </Link>
                )}

                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`} className="group md:text-right" scroll={true}>
                    <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
                      <span>Next</span>
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{nextPost.title}</h3>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-3 order-1 md:order-2">
          <BlogTOC headings={headings} />
        </div>
      </div>
    </div>
  )
}
