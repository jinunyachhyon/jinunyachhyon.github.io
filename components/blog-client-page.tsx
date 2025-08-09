"use client"

import { useState, useTransition, useMemo, useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BlogPost, BlogSeries } from "@/types/blog"
import BlogPreviewCard from "@/components/blog-preview-card"
import BlogSeriesCard from "@/components/blog-series-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Calendar, BookOpen, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewType = "all" | "by-year" | "by-type" | "series"
type FilterType = "all" | "standalone" | "series"

interface BlogClientPageProps {
  initialPosts: BlogPost[]
  initialSeries: BlogSeries[]
}

export default function BlogClientPage({ initialPosts, initialSeries }: BlogClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Search and view remain immediate
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState<ViewType>("all")

  // Pending (UI controls) vs Applied (actual filtering)
  const [pendingTags, setPendingTags] = useState<string[]>([])
  const [pendingYear, setPendingYear] = useState<string>("all")
  const [pendingType, setPendingType] = useState<FilterType>("all")

  const [appliedTags, setAppliedTags] = useState<string[]>([])
  const [appliedYear, setAppliedYear] = useState<string>("all")
  const [appliedType, setAppliedType] = useState<FilterType>("all")

  const [showFilters, setShowFilters] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Hydrate from URL once
  useEffect(() => {
    if (isInitialized) return
    const urlSearch = searchParams.get("search") || ""
    const urlTags = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const urlYear = searchParams.get("year") || "all"
    const urlFilter = (searchParams.get("filter") as FilterType) || "all"
    const urlView = (searchParams.get("view") as ViewType) || "all"

    setSearchTerm(urlSearch)
    setPendingTags(urlTags)
    setPendingYear(urlYear)
    setPendingType(urlFilter)
    setAppliedTags(urlTags)
    setAppliedYear(urlYear)
    setAppliedType(urlFilter)
    setView(urlView)
    setIsInitialized(true)
  }, [isInitialized, searchParams])

  const allPosts = initialPosts
  const allSeries = initialSeries

  // Static lists
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    allPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [allPosts])

  const availableYears = useMemo(() => {
    const years = new Set<string>()
    allPosts.forEach(post => years.add(new Date(post.date).getFullYear().toString()))
    return Array.from(years).sort().reverse()
  }, [allPosts])

  // Filtered posts (use APPLIED filters)
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      // Search
      if (searchTerm) {
        const q = searchTerm.toLowerCase()
        const matches =
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some(t => t.toLowerCase().includes(q)) ||
          post.author.toLowerCase().includes(q)
        if (!matches) return false
      }
      // Tags
      if (appliedTags.length > 0) {
        const hasTag = appliedTags.some(t => post.tags.includes(t))
        if (!hasTag) return false
      }
      // Year
      if (appliedYear !== "all") {
        const postYear = new Date(post.date).getFullYear().toString()
        if (postYear !== appliedYear) return false
      }
      // Type
      if (appliedType === "standalone" && post.series) return false
      if (appliedType === "series" && !post.series) return false

      return true
    })
  }, [allPosts, searchTerm, appliedTags, appliedYear, appliedType])

  // Group by year (for "by-year" view)
  const postsByYear = useMemo(() => {
    const grouped = new Map<string, typeof filteredPosts>()
    filteredPosts.forEach(post => {
      const year = new Date(post.date).getFullYear().toString()
      if (!grouped.has(year)) grouped.set(year, [])
      grouped.get(year)!.push(post)
    })
    return grouped
  }, [filteredPosts])

  // URL sync helper
  const updateURL = useCallback((params: Record<string, string | string[]>) => {
    const next = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        if (v.length) next.set(k, v.join(","))
      } else if (v && v !== "all") {
        next.set(k, v)
      }
    })
    const url = next.toString() ? `${window.location.pathname}?${next.toString()}` : window.location.pathname
    router.replace(url, { scroll: false })
  }, [router])

  // Search changes update URL immediately with APPLIED filters
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
    startTransition(() => {
      updateURL({
        search: value,
        tags: appliedTags,
        year: appliedYear,
        filter: appliedType,
        view
      })
    })
  }, [appliedTags, appliedYear, appliedType, view, updateURL])

  // Pending changes (no filtering yet)
  const togglePendingTag = useCallback((tag: string) => {
    setPendingTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }, [])

  const setPendingYearValue = useCallback((year: string) => setPendingYear(year), [])
  const setPendingTypeValue = useCallback((type: FilterType) => setPendingType(type), [])

  // Apply and Clear
  const applyFilters = useCallback(() => {
    setAppliedTags(pendingTags)
    setAppliedYear(pendingYear)
    setAppliedType(pendingType)
    setShowFilters(false) // collapse after applying
    startTransition(() => {
      updateURL({
        search: searchTerm,
        tags: pendingTags,
        year: pendingYear,
        filter: pendingType,
        view
      })
    })
  }, [pendingTags, pendingYear, pendingType, searchTerm, view, updateURL])

  const clearAllFilters = useCallback(() => {
    setPendingTags([])
    setPendingYear("all")
    setPendingType("all")
    setAppliedTags([])
    setAppliedYear("all")
    setAppliedType("all")
    setShowFilters(false) // collapse after clearing
    startTransition(() => {
      updateURL({
        search: searchTerm,
        tags: [],
        year: "all",
        filter: "all",
        view
      })
    })
  }, [searchTerm, view, updateURL])

  // UI helpers
  const hasAppliedFilters = appliedTags.length > 0 || appliedYear !== "all" || appliedType !== "all"
  const hasPendingChanges =
    JSON.stringify([...pendingTags].sort()) !== JSON.stringify([...appliedTags].sort()) ||
    pendingYear !== appliedYear ||
    pendingType !== appliedType

  if (!isInitialized) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Thoughts on AI, machine learning, and technology
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
            disabled={isPending}
          />
        </div>

        {/* Filters toggle + View (stack on mobile, side-by-side on md+) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 w-full md:w-auto"
            disabled={isPending}
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasAppliedFilters && (
              <Badge variant="secondary" className="ml-2">
                {appliedTags.length + (appliedYear !== "all" ? 1 : 0) + (appliedType !== "all" ? 1 : 0)}
              </Badge>
            )}
          </Button>

          {/* View section sits just below Filters on mobile */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex flex-wrap rounded-lg border p-1 overflow-hidden">
              {[
                { value: "all", label: "All", icon: BookOpen },
                { value: "by-year", label: "By Year", icon: Calendar },
                { value: "series", label: "Series", icon: BookOpen },
              ].map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  variant={view === value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setView(value as ViewType)
                    startTransition(() => {
                      updateURL({
                        search: searchTerm,
                        tags: appliedTags,
                        year: appliedYear,
                        filter: appliedType,
                        view: value,
                      })
                    })
                  }}
                  className="flex items-center gap-1"
                  disabled={isPending}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-4 bg-card">
              {/* Row: Post Type + Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Post Type */}
                <div className="w-full">
                  <Label htmlFor="post-type" className="text-sm font-medium mb-2 block">
                    Post Type
                  </Label>
                  <Select
                    value={pendingType}
                    onValueChange={(v) => setPendingTypeValue(v as FilterType)}
                    disabled={isPending}
                  >
                    <SelectTrigger id="post-type">
                      <SelectValue placeholder="All Posts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Posts</SelectItem>
                      <SelectItem value="standalone">Standalone</SelectItem>
                      <SelectItem value="series">Series Posts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year */}
                <div className="w-full">
                  <Label htmlFor="year" className="text-sm font-medium mb-2 block">
                    Year
                  </Label>
                  <Select
                    value={pendingYear}
                    onValueChange={(v) => setPendingYearValue(v)}
                    disabled={isPending}
                  >
                    <SelectTrigger id="year">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {availableYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Tags</Label>
                <div className="border rounded-lg p-3">
                  <div className="max-h-56 overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {availableTags.map((tag) => {
                        const checked = pendingTags.includes(tag)
                        return (
                          <label
                            key={tag}
                            className="flex items-center gap-3 text-sm cursor-pointer select-none"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(val) => {
                                const next = !!val
                                if (next && !checked) togglePendingTag(tag)
                                if (!next && checked) togglePendingTag(tag)
                              }}
                              disabled={isPending}
                            />
                            <span className="text-sm">{tag}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions: Apply + Clear (below tags) */}
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  disabled={isPending && !hasAppliedFilters}
                >
                  Clear All Filters
                </Button>
                <Button
                  size="sm"
                  onClick={applyFilters}
                  disabled={!hasPendingChanges || isPending}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pending overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Updating...</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn("transition-opacity duration-200", isPending ? "opacity-50" : "opacity-100")}>
        {view === "series" ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Blog Series</h2>
              <p className="text-muted-foreground">Multi-part deep dives into complex topics</p>
            </div>
            {allSeries.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No blog series available yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {allSeries.map(series => (
                  <BlogSeriesCard key={series.name} series={series} />
                ))}
              </div>
            )}
          </div>
        ) : view === "by-year" ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {Array.from(postsByYear.entries())
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([year, posts]) => (
                <div key={year}>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    {year}
                    <Badge variant="secondary">{posts.length} posts</Badge>
                  </h2>
                  <div className="grid gap-6">
                    {posts.map(post => (
                      <BlogPreviewCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              ))}
            {postsByYear.size === 0 && (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No posts found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No posts found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredPosts.map((post, index) => (
                  <BlogPreviewCard
                    key={post.slug}
                    post={post}
                    featured={index === 0 && !searchTerm && appliedTags.length === 0}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}