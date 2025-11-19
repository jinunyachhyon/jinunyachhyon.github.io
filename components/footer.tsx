import { Github, Linkedin, Mail, Twitter, BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 Jinu Nyachhyon. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex items-center space-x-4">
              <a
                href="https://scholar.google.com/citations?user=U6u0FcoAAAAJ&hl=en&oi=sra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <BookOpen className="h-5 w-5" />
                <span className="sr-only">Google Scholar</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jinu-nyachhyon/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://x.com/nyachhyonjinu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            
            {/* GitHub Links */}
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2 text-xs">
                <a
                  href="https://github.com/jinunyachhyon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  Personal
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="https://github.com/jinu-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  Work
                </a>
              </div>
            </div>

            {/* Email Links */}
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2 text-xs">
                <a
                  href="mailto:nyachhyonjinu@gmail.com"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  Personal
                </a>
                <span className="text-muted-foreground">•</span>
                <a
                  href="mailto:jinu.075bct021@acem.edu.np"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  School
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
