import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar } from 'lucide-react'
import { formatDate } from "@/lib/blog"
import type { BlogSeries } from "@/types/blog"

interface BlogSeriesCardProps {
  series: BlogSeries
}

export default function BlogSeriesCard({ series }: BlogSeriesCardProps) {
  const latestPost = series.posts[series.posts.length - 1]
  const completionPercentage = (series.posts.length / series.totalParts) * 100

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <Badge variant="outline">{series.posts.length} parts</Badge>
              <Badge variant="secondary">Series</Badge>
            </div>
            <CardTitle className="text-xl mb-2">{series.name}</CardTitle>
            <p className="text-muted-foreground text-sm mb-3">{series.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{series.posts.length}/{series.totalParts} parts</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Latest: {formatDate(latestPost.date)}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Recent Posts:</h4>
            <div className="space-y-1">
              {series.posts.slice(-2).reverse().map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block text-sm hover:text-primary transition-colors"
                  scroll={true}
                >
                  <span className="text-muted-foreground">Part {post.series?.part}:</span> {post.title}
                </Link>
              ))}
            </div>
          </div>
          
          <Link
            href={`/blog/${series.posts[0].slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            scroll={true}
          >
            Start Reading →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
