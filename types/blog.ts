export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  author: string
  excerpt: string
  content: string
  coverImage?: string
  readingTime: string
  series?: {
    name: string
    part: number
    description?: string
  }
}

export interface BlogSeries {
  name: string
  description: string
  posts: BlogPost[]
  totalParts: number
}
