"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, FileText, Search, Filter } from "lucide-react"
import {
  getAllPublications,
  getPublicationsByYear,
  getPublicationsByType,
  getPublicationTags,
  searchPublications,
  type Publication,
} from "@/lib/publications"

export default function PublicationsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [initialized, setInitialized] = useState(false)

  // Pending filters (what user is selecting)
  const [pendingTags, setPendingTags] = useState<string[]>([])
  const [pendingType, setPendingType] = useState<string>("")
  const [pendingYear, setPendingYear] = useState<number | undefined>(undefined)

  // Applied filters (what's actually filtering the content)
  const [appliedTags, setAppliedTags] = useState<string[]>([])
  const [appliedType, setAppliedType] = useState<string>("")
  const [appliedYear, setAppliedYear] = useState<number | undefined>(undefined)

  const [showFilters, setShowFilters] = useState(false)

  // Memoize the static data to prevent unnecessary re-renders
  const allPublications = useMemo(() => getAllPublications(), [])
  const publicationsByYear = useMemo(() => getPublicationsByYear(), [])
  const publicationsByType = useMemo(() => getPublicationsByType(), [])
  const allTags = useMemo(() => getPublicationTags(), [])
  const years = useMemo(
    () =>
      Object.keys(publicationsByYear)
        .map(Number)
        .sort((a, b) => b - a),
    [publicationsByYear],
  )

  // Memoize filtered publications to avoid recalculating on every render
  const filteredPublications = useMemo(() => {
    return searchPublications(searchQuery, {
      tags: appliedTags.length > 0 ? appliedTags : undefined,
      type: appliedType || undefined,
      year: appliedYear,
    })
  }, [searchQuery, appliedTags, appliedType, appliedYear])

  // Initialize filters from URL params only once
  useEffect(() => {
    if (!initialized) {
      const tagsParam = searchParams.get("tags")
      const typeParam = searchParams.get("type")
      const yearParam = searchParams.get("year")

      if (tagsParam) {
        const tags = tagsParam.split(",").filter((tag) => allTags.includes(tag))
        setAppliedTags(tags)
        setPendingTags(tags)
      }
      if (typeParam && ["journal", "conference", "preprint"].includes(typeParam)) {
        setAppliedType(typeParam)
        setPendingType(typeParam)
      }
      if (yearParam) {
        const year = Number.parseInt(yearParam)
        if (years.includes(year)) {
          setAppliedYear(year)
          setPendingYear(year)
        }
      }
      setInitialized(true)
    }
  }, [initialized, searchParams, allTags, years])

  const handleTagToggle = useCallback((tag: string) => {
    setPendingTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }, [])

  const applyFilters = useCallback(() => {
    setAppliedTags(pendingTags)
    setAppliedType(pendingType)
    setAppliedYear(pendingYear)
    setShowFilters(false)
  }, [pendingTags, pendingType, pendingYear])

  const clearAllFilters = useCallback(() => {
    setPendingTags([])
    setPendingType("")
    setPendingYear(undefined)
    setAppliedTags([])
    setAppliedType("")
    setAppliedYear(undefined)
    setSearchQuery("")
    setShowFilters(false)
  }, [])

  const hasAppliedFilters = appliedTags.length > 0 || appliedType || appliedYear
  const hasPendingChanges =
    JSON.stringify(pendingTags.sort()) !== JSON.stringify(appliedTags.sort()) ||
    pendingType !== appliedType ||
    pendingYear !== appliedYear

  const getPublicationTypeLabel = useCallback((type: string) => {
    switch (type) {
      case "journal":
        return "Journal"
      case "conference":
        return "Conference"
      case "preprint":
        return "Preprint"
      default:
        return type
    }
  }, [])

  const getPublicationTypeBadge = useCallback((type: string) => {
    switch (type) {
      case "journal":
        return <Badge className="bg-green-600">Journal</Badge>
      case "conference":
        return <Badge className="bg-blue-600">Conference</Badge>
      case "preprint":
        return <Badge className="bg-amber-600">Preprint</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }, [])

  return (
    <div className="container py-10 max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Publications</h1>
          <p className="text-muted-foreground max-w-3xl">
            My research focuses on advancing low-resource language, benchmarking, exploring AI alignment
            for safer systems, and applying cutting-edge computer vision methods to real-world problems. 
            Below is a list of my publications.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={hasAppliedFilters ? "border-primary bg-primary/5" : ""}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {hasAppliedFilters && (
              <Badge variant="secondary" className="ml-2">
                {appliedTags.length + (appliedType ? 1 : 0) + (appliedYear ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Publication Type</Label>
                <Select value={pendingType} onValueChange={setPendingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="preprint">Preprint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year</Label>
                <Select
                  value={pendingYear?.toString() || ""}
                  onValueChange={(value) => setPendingYear(value ? Number.parseInt(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Tags</Label>
                  {pendingTags.length > 0 && (
                    <Button variant="link" className="h-auto p-0" onClick={() => setPendingTags([])}>
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-background rounded-md">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={pendingTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label
                        htmlFor={`tag-${tag}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={applyFilters}
                disabled={!hasPendingChanges}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Apply Filters
              </Button>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Publications ({filteredPublications.length})</TabsTrigger>
            <TabsTrigger value="byYear">By Year</TabsTrigger>
            <TabsTrigger value="byType">By Type</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredPublications.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No publications found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredPublications.map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="byYear" className="space-y-10">
            {years.map((year) => {
              const yearPublications = publicationsByYear[year].filter((pub) =>
                filteredPublications.some((p) => p.id === pub.id),
              )
              if (yearPublications.length === 0) return null

              return (
                <section key={year} className="space-y-4">
                  <h2 className="text-2xl font-bold">{year}</h2>
                  <div className="grid gap-6">
                    {yearPublications.map((pub) => (
                      <PublicationCard key={pub.id} publication={pub} />
                    ))}
                  </div>
                </section>
              )
            })}
            {!years.some((year) =>
              publicationsByYear[year].some((pub) => filteredPublications.some((p) => p.id === pub.id)),
            ) && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No publications found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="byType" className="space-y-10">
            {Object.keys(publicationsByType).map((type) => {
              const typePublications = publicationsByType[type].filter((pub) =>
                filteredPublications.some((p) => p.id === pub.id),
              )
              if (typePublications.length === 0) return null

              return (
                <section key={type} className="space-y-4">
                  <h2 className="text-2xl font-bold">{getPublicationTypeLabel(type)} Publications</h2>
                  <div className="grid gap-6">
                    {typePublications.map((pub) => (
                      <PublicationCard key={pub.id} publication={pub} />
                    ))}
                  </div>
                </section>
              )
            })}
            {!Object.keys(publicationsByType).some((type) =>
              publicationsByType[type].some((pub) => filteredPublications.some((p) => p.id === pub.id)),
            ) && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No publications found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {getPublicationTypeBadge(publication.publicationType)}
          <Badge variant="outline">{publication.year}</Badge>
        </div>
        <CardTitle className="text-xl">
          <Link
            href={publication.arxivUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {publication.title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground">{publication.authors}</p>
        <div className="text-sm">
          <span className="font-medium">{publication.conference}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{publication.abstract}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {publication.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={publication.codeUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Code
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={publication.arxivUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            arXiv
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function getPublicationTypeBadge(type: string) {
  switch (type) {
    case "journal":
      return <Badge className="bg-green-600">Journal</Badge>
    case "conference":
      return <Badge className="bg-blue-600">Conference</Badge>
    case "preprint":
      return <Badge className="bg-amber-600">Preprint</Badge>
    default:
      return <Badge>{type}</Badge>
  }
}
