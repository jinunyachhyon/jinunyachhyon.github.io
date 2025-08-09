import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-32 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        {/* Search and Filters Skeleton (updated to mirror Publications) */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
          </div>

          {/* Filter controls: Post Type and Year only (no top Clear) */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Tags: checkbox list with scroll when overflow */}
          <div className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="max-h-56 overflow-y-auto pr-1">
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions below tags: Clear + Apply */}
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>

        {/* View Toggle Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-full">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-18" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Series Section Skeleton */}
        <div className="mt-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}