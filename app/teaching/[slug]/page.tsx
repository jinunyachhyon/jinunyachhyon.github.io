import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllCourses, getCourseBySlug } from "@/lib/teaching"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Building2, Calendar, ChevronLeft, Clock, Download, ExternalLink, GraduationCap, Users } from 'lucide-react'

interface CoursePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }))
}

export function generateMetadata({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug)
  if (!course) return { title: "Teaching | Jinu Nyachhyon" }
  return {
    title: `${course.title} (${course.term}) | Jinu Nyachhyon`,
    description: course.excerpt,
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="container py-10 max-w-4xl">
      <Link
        href="/teaching"
        className="text-muted-foreground hover:text-foreground flex items-center gap-1 mb-8"
        scroll={true}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to teaching</span>
      </Link>

      {/* Course header */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-2">
          {course.courseCode ? `${course.courseCode} — ` : ""}
          {course.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-1">{course.role}</p>
        {course.homeInstitution && (
          <p className="text-sm text-muted-foreground mb-5">
            Visiting from {course.homeInstitution}
          </p>
        )}
        {!course.homeInstitution && <div className="mb-5" />}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {course.term}
          </span>
          {course.institution && (
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {course.institution}
            </span>
          )}
          {course.level && (
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {course.level}
            </span>
          )}
          {course.format && (
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {course.format}
            </span>
          )}
          {course.students ? (
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {course.students} students
            </span>
          ) : null}
        </div>

        {course.coInstructors && (
          <p className="text-sm text-muted-foreground mt-3">With {course.coInstructors}</p>
        )}

        {course.materials && course.materials.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {course.materials.map((material) => (
              <Button key={material.label} variant="outline" size="sm" asChild>
                <a href={material.href} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-3.5 w-3.5" />
                  {material.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Markdown body: description, outcomes, assessment */}
      {course.content.trim() && (
        <div className="prose dark:prose-invert max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {course.content}
          </ReactMarkdown>
        </div>
      )}

      {/* Week-by-week schedule */}
      {course.weeks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Schedule</h2>

          <div className="space-y-4">
            {course.weeks.map((week) => (
              <div
                key={week.week}
                className={`rounded-lg border p-5 ${week.upcoming ? "border-dashed bg-muted/30" : ""}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                    Week {week.week}
                    {week.module ? ` · ${week.module}` : ""}
                  </span>
                  <h3 className="text-lg font-semibold flex items-center gap-3">
                    {week.title}
                    {week.upcoming && (
                      <Badge variant="outline" className="border-primary text-primary font-normal">
                        Upcoming
                      </Badge>
                    )}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-3">{week.summary}</p>

                {week.topics && week.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {week.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="font-normal">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}

                {week.materials && week.materials.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {week.materials.map((material) => (
                      <a
                        key={material.label}
                        href={material.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1.5"
                      >
                        {material.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
