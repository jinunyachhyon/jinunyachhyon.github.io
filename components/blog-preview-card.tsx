import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from 'lucide-react'
import { formatDate } from "@/lib/blog"
import type { BlogPost } from "@/types/blog"

interface BlogPreviewCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogPreviewCard({ post, featured = false }: BlogPreviewCardProps) {
  return (
    <Card className={`h-full flex flex-col hover:shadow-lg transition-shadow ${featured ? "border-primary/20" : ""}`}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {post.series && (
            <Badge variant="secondary" className="text-xs">
              Part {post.series.part}
            </Badge>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} className="group" scroll={true}>
          <CardTitle className={`group-hover:text-primary transition-colors cursor-pointer line-clamp-2 ${featured ? "text-2xl" : "text-xl"}`}>
            {post.title}
          </CardTitle>
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{post.author}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
