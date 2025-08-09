import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import type { BlogPost, BlogSeries } from "@/types/blog"

interface BlogSeriesNavigationProps {
  currentPost: BlogPost
  series?: BlogSeries
  previousPost?: BlogPost
  nextPost?: BlogPost
}

export default function BlogSeriesNavigation({ 
  currentPost, 
  series, 
  previousPost, 
  nextPost 
}: BlogSeriesNavigationProps) {
  if (!series || !currentPost.series) return null

  const currentPart = currentPost.series.part
  const totalParts = series.totalParts
  const progress = (currentPart / totalParts) * 100

  return (
    <Card className="mb-8 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <Badge variant="outline" className="text-primary border-primary">
            Series
          </Badge>
        </div>
        <CardTitle className="text-lg">{series.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{series.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">Part {currentPart} of {totalParts}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors group"
              scroll={true}
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  Part {previousPost.series?.part}: {previousPost.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg border opacity-50">
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="text-sm text-muted-foreground">First post in series</div>
              </div>
            </div>
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="flex items-center gap-2 p-3 rounded-lg border hover:bg-accent transition-colors group text-right"
              scroll={true}
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  Part {nextPost.series?.part}: {nextPost.title}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg border opacity-50 text-right">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="text-sm text-muted-foreground">Last post in series</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
