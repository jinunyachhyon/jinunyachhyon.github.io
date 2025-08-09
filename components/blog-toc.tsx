"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, List, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Heading {
  level: number
  text: string
  slug: string
}

interface BlogTocProps {
  headings: Heading[]
}

export default function BlogToc({ headings }: BlogTocProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeId, setActiveId] = useState<string>("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    // Observe all section headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug)
      if (element) observer.observe(element)
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug)
        if (element) observer.unobserve(element)
      })
    }
  }, [headings])

  // Prevent body scroll when mobile TOC is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileOpen])

  if (headings.length === 0) return null

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()
    const element = document.getElementById(slug)
    if (element) {
      const offset = 120 // Offset for fixed header and some padding
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Close mobile TOC after navigation
      setIsMobileOpen(false)
    }
  }

  return (
    <>
      {/* Mobile TOC Floating Button - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMobileOpen(true)}
          size="lg"
          className="rounded-full shadow-lg h-14 w-14 p-0"
          aria-label="Open table of contents"
        >
          <List className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile TOC Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="fixed inset-x-4 top-4 bottom-4 bg-card border rounded-lg shadow-xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-2 font-semibold">
                <List className="h-5 w-5" />
                <span>Table of Contents</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMobileOpen(false)}
                className="h-8 w-8 p-0"
                aria-label="Close table of contents"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Content */}
            <nav className="p-4 overflow-y-auto flex-1">
              <ul className="space-y-3">
                {headings.map((heading) => (
                  <li
                    key={heading.slug}
                    className={cn(
                      "transition-colors",
                      heading.level === 1 ? "font-semibold text-base" : "text-sm",
                      activeId === heading.slug ? "text-primary" : "text-foreground/70"
                    )}
                    style={{
                      marginLeft: heading.level > 1 ? `${(heading.level - 1) * 1}rem` : 0,
                    }}
                  >
                    <a
                      href={`#${heading.slug}`}
                      onClick={(e) => handleLinkClick(e, heading.slug)}
                      className={cn(
                        "block py-2 px-3 rounded-md transition-colors hover:bg-muted hover:text-foreground",
                        activeId === heading.slug ? "font-medium bg-muted" : ""
                      )}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop TOC - Only visible on desktop */}
      <div className="hidden lg:block sticky top-24 bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold">
            <List className="h-5 w-5" />
            <span>Table of Contents</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        {isOpen && (
          <nav className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.slug}
                  className={cn(
                    "transition-colors",
                    heading.level === 1 ? "font-semibold" : "",
                    activeId === heading.slug ? "text-primary" : "text-foreground/70 hover:text-foreground",
                  )}
                  style={{
                    marginLeft: heading.level > 1 ? `${(heading.level - 1) * 0.75}rem` : 0,
                  }}
                >
                  <a
                    href={`#${heading.slug}`}
                    onClick={(e) => handleLinkClick(e, heading.slug)}
                    className={cn(
                      "block py-1 px-2 rounded transition-colors hover:bg-muted",
                      activeId === heading.slug ? "font-medium bg-muted" : ""
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}