export interface CourseMaterial {
  label: string
  href: string
}

export interface CourseWeek {
  /** Week or session number */
  week: number
  /** Module label as it appears in your materials, e.g. "Module 1" */
  module?: string
  title: string
  /** Two or three sentences on what the week covered */
  summary: string
  /** Short topic chips shown under the summary */
  topics?: string[]
  /** Links to slides, handouts, datasets — typically a Drive folder per week */
  materials?: CourseMaterial[]
  /** Set true for a week that is scheduled but not yet delivered */
  upcoming?: boolean
}

export interface Course {
  slug: string
  title: string
  /** Human-readable term, e.g. "Summer 2026" */
  term: string
  /** Sortable term key, e.g. "2026-06". Used for ordering. */
  termStart: string
  /** Where the course was taught */
  institution: string
  /** Your own affiliation, when you taught somewhere other than your home institution */
  homeInstitution?: string
  /** Your role, e.g. "Assistant Lecturer", "Visiting Lecturer" */
  role: string
  /** e.g. "Undergraduate", "Graduate", "Professional / executive education" */
  level?: string
  courseCode?: string
  credits?: string
  students?: number
  /** Co-instructors or supervising faculty */
  coInstructors?: string
  /** e.g. "8 weeks, 2 sessions per week" */
  format?: string
  tags: string[]
  excerpt: string
  /** Week-by-week schedule — the core of the page */
  weeks: CourseWeek[]
  /** Course-level links: full material archive, syllabus, repository */
  materials?: CourseMaterial[]
  /** Markdown body: description, outcomes, assessment, reflection */
  content: string
}
