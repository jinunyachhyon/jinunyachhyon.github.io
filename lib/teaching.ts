import { Course } from "@/types/teaching"

// Server-side modules, loaded the same way as lib/blog.ts so the client bundle stays clean
let fs: any = null
let path: any = null
let matter: any = null

if (typeof window === 'undefined') {
  try {
    fs = require('fs')
    path = require('path')
    matter = require('gray-matter')
  } catch (error) {
    console.warn('❌ Failed to load server-side modules for teaching:', error)
  }
}

const TEACHING_DIRECTORY = typeof window === 'undefined' && path
  ? path.join(process.cwd(), 'content/teaching')
  : null

function canUseFileSystem(): boolean {
  return Boolean(typeof window === 'undefined' && fs && path && matter && TEACHING_DIRECTORY)
}

function toCourse(slug: string, data: any, content: string): Course {
  return {
    slug,
    title: data.title || `Untitled (${slug})`,
    term: data.term || 'Unknown term',
    termStart: data.termStart || '0000-00',
    institution: data.institution || '',
    homeInstitution: data.homeInstitution || undefined,
    role: data.role || 'Assistant Lecturer',
    level: data.level || undefined,
    courseCode: data.courseCode || undefined,
    credits: data.credits || undefined,
    students: data.students || undefined,
    coInstructors: data.coInstructors || undefined,
    format: data.format || undefined,
    tags: data.tags || [],
    excerpt: data.excerpt || content.substring(0, 200) + '...',
    content,
    weeks: data.weeks || [],
    materials: data.materials || [],
  }
}

export function getAllCourses(): Course[] {
  if (!canUseFileSystem()) return []

  try {
    if (!fs.existsSync(TEACHING_DIRECTORY)) return []

    const courses = fs
      .readdirSync(TEACHING_DIRECTORY)
      .filter((fileName: string) => fileName.endsWith('.md'))
      .map((fileName: string) => {
        const slug = fileName.replace(/\.md$/, '')
        const fileContents = fs.readFileSync(path.join(TEACHING_DIRECTORY, fileName), 'utf8')
        const { data, content } = matter(fileContents)
        return toCourse(slug, data, content)
      })

    // Most recent term first
    return courses.sort((a: Course, b: Course) => b.termStart.localeCompare(a.termStart))
  } catch (error) {
    console.warn('❌ Error reading courses from filesystem:', error)
    return []
  }
}

export function getCourseBySlug(slug: string): Course | null {
  if (!canUseFileSystem()) return null

  try {
    const fullPath = path.join(TEACHING_DIRECTORY, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
    return toCourse(slug, data, content)
  } catch (error) {
    console.warn(`❌ Error reading course ${slug} from filesystem:`, error)
    return null
  }
}

/** Courses grouped by term, terms ordered most recent first. */
export function getCoursesByTerm(): { term: string; termStart: string; courses: Course[] }[] {
  const grouped = new Map<string, { term: string; termStart: string; courses: Course[] }>()

  for (const course of getAllCourses()) {
    const existing = grouped.get(course.term)
    if (existing) {
      existing.courses.push(course)
    } else {
      grouped.set(course.term, { term: course.term, termStart: course.termStart, courses: [course] })
    }
  }

  return Array.from(grouped.values()).sort((a, b) => b.termStart.localeCompare(a.termStart))
}
