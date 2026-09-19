import Link from "next/link"
import { getCoursesByTerm } from "@/lib/teaching"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Building2, CalendarDays, ChevronRight, GraduationCap, Users } from 'lucide-react'

export const metadata = {
  title: "Teaching | Jinu Nyachhyon",
  description: "Courses taught, syllabi, lecture materials and teaching reflections.",
}

export default function TeachingPage() {
  const terms = getCoursesByTerm()

  return (
    <div className="container py-10 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Teaching</h1>
        <p className="text-muted-foreground max-w-3xl">
          Courses I have designed and taught as an assistant lecturer. Each entry links to the
          syllabus, lecture-by-lecture outline and the materials I wrote for it.
        </p>
      </div>

      {terms.length === 0 && (
        <p className="text-muted-foreground">
          No courses yet — add a markdown file under <code>content/teaching/</code>.
        </p>
      )}

      <div className="space-y-12">
        {terms.map((group) => (
          <section key={group.term}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold">{group.term}</h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="grid gap-6">
              {group.courses.map((course) => (
                <Link key={course.slug} href={`/teaching/${course.slug}`} scroll={true}>
                  <Card className="transition-colors hover:border-primary/60">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            {course.courseCode ? `${course.courseCode} — ` : ""}
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground mt-1">
                            {course.role}
                            {course.homeInstitution ? ` · visiting from ${course.homeInstitution}` : ""}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{course.excerpt}</p>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
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
                        {course.students ? (
                          <span className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {course.students} students
                          </span>
                        ) : null}
                        {course.weeks.length > 0 && (
                          <span className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            {course.weeks.length} weeks
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
