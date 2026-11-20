import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { publications } from "@/lib/publications"
import { getAllBlogPosts, formatDate } from "@/lib/blog"
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
  BookOpen,
  FileText,
  Briefcase,
  PenTool,
} from "lucide-react"

const links = [
  { label: "Google Scholar", icon: BookOpen, items: [{ href: "https://scholar.google.com/citations?user=U6u0FcoAAAAJ&hl=en&oi=sra" }] },
  { label: "LinkedIn", icon: Linkedin, items: [{ href: "https://www.linkedin.com/in/jinu-nyachhyon/" }] },
  { label: "X (Twitter)", icon: Twitter, items: [{ href: "https://x.com/nyachhyonjinu" }] },
  {
    label: "GitHub",
    icon: Github,
    items: [
      { text: "Personal", href: "https://github.com/jinunyachhyon" },
      { text: "Work", href: "https://github.com/jinu-code" },
    ],
  },
  {
    label: "Email",
    icon: Mail,
    items: [
      { text: "Personal", href: "mailto:nyachhyonjinu@gmail.com" },
      { text: "School", href: "mailto:jinu.075bct021@acem.edu.np" },
    ],
  },
]

const linkClass = "transition-colors hover:text-foreground"
const extProps = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})

const interests = [
  {
    title: "LLM Evaluation",
    desc: "Validity of LLM judges and annotators, measured against human judgement rather than model agreement.",
    pubs: "Benchmarking,LLM Annotation",
    exp: "LLM Evaluation,Benchmarking",
  },
  {
    title: "Multilingual & Low-Resource NLP",
    desc: "Robustness across languages, scripts and code-mixing, and resources for underserved languages.",
    pubs: "NLP,Low-Resource Language",
    exp: "NLP",
  },
  {
    title: "Alignment & Oversight",
    desc: "Scalable oversight, pluralistic alignment, and when human trust in AI output is warranted.",
    pubs: "AI Alignment,Scalable Oversight,Pluralistic Alignment",
    exp: "AI Alignment",
    blog: "Responsible AI",
  },
  {
    title: "Agent Robustness",
    desc: "Stress-testing GUI and computer-use agents under controlled perturbation and distribution shift.",
    pubs: "GUI Agents,Robustness",
    exp: "LLM-Aided Agents,Agent Benchmarking",
  },
]

const personLink =
  "font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
const orgLink =
  "font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
const chip =
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"

function Ext({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 border-b border-border/70 pb-3 text-2xl font-bold tracking-tight">{children}</h2>
}

function Authors({ authors }: { authors: string }) {
  const parts = authors.split("Jinu Nyachhyon")
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-medium text-foreground">Jinu Nyachhyon</span>}
        </span>
      ))}
    </>
  )
}

export default function BioPage() {
  const selected = publications.slice(0, 3)
  const recentPosts = getAllBlogPosts().slice(0, 4)

  return (
    <div>
      <div className="container max-w-5xl py-12 md:py-20">
        {/* Hero + About */}
        <section className="grid gap-10 md:grid-cols-[1fr_240px] md:gap-14">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Jinu Nyachhyon</h1>
            <p className="mt-2 text-lg text-muted-foreground">AI Researcher · ML Engineer</p>

            <p className="mt-8 text-xl font-medium leading-snug tracking-tight sm:text-2xl">
              I study <span className="text-primary">when we can trust how language models are evaluated</span>, and{" "}
              <span className="text-primary">when that trust quietly breaks</span> across languages, cultures and
              interfaces.
            </p>

            <div className="mt-6 space-y-4 leading-relaxed text-foreground/80">
              <p>
                I build human-anchored benchmarks and controlled stress tests for LLM judges, annotators and agents,
                spanning <span className="font-semibold text-foreground">LLM evaluation</span>,{" "}
                <span className="font-semibold text-foreground">multilingual and low-resource NLP</span>,{" "}
                <span className="font-semibold text-foreground">alignment and scalable oversight</span>, and{" "}
                <span className="font-semibold text-foreground">agent robustness</span>. In{" "}
                <Link href="/publications?tags=Pluralistic%20Alignment" className={orgLink}>
                  NepPlural
                </Link>
                , for example, LLM annotators agreed strongly with each other yet scored only about 0.50 macro-F1
                against human labels: <em>agreement is not validity</em>. My papers appear at COLING, AACL-IJCNLP,
                AAAI-AIA and a NeurIPS workshop.
              </p>
              <p>
                I have been fortunate to learn from great mentors. At{" "}
                <Ext href="https://ilprl.ku.edu.np/" className={orgLink}>
                  ILPRL, Kathmandu University
                </Ext>
                , I worked with{" "}
                <Ext href="https://ku.edu.np/contact-detail/48" className={personLink}>
                  Dr. Bal Krishna Bal
                </Ext>{" "}
                as a research assistant and collaborator, building Nepali NLU benchmarks and language models. At{" "}
                <Ext href="https://www.moduloresearch.com/" className={orgLink}>
                  Modulo Research
                </Ext>
                , I interned with{" "}
                <Ext href="https://www.gabrielrecchia.com/" className={personLink}>
                  Dr. Gabriel Recchia
                </Ext>{" "}
                on scalable oversight of LLMs. My research journey began during my undergraduate studies under{" "}
                <Ext href="https://scholar.google.com/citations?user=ZB6i0OKaPo4C&hl=en" className={personLink}>
                  Prof. Dr. Subarna Shakya
                </Ext>{" "}
                at IOE, Tribhuvan University.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full">
                <Link href="/publications" scroll={true}>
                  Publications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full bg-background/60">
                <Link href="/cv/Jinu_Nyachhyon_CV.pdf" scroll={true}>
                  <Download className="mr-2 h-4 w-4" />
                  CV
                </Link>
              </Button>
            </div>
          </div>

          <aside className="order-1 md:order-2">
            <div className="flex items-start gap-5 md:block">
              <div className="w-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border sm:w-40 md:w-full">
                <Image
                  src="/images/my_formal_image.jpeg"
                  alt="Jinu Nyachhyon"
                  width={760}
                  height={1034}
                  priority
                  className="aspect-[4/5] w-full object-cover object-[center_20%]"
                />
              </div>
              <ul className="min-w-0 space-y-1.5 text-sm md:mt-5 md:space-y-2">
                {links.map(({ label, icon: Icon, items }) => (
                  <li key={label} className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="h-4 w-4 shrink-0" />
                    {items.length === 1 ? (
                      <a href={items[0].href} {...extProps(items[0].href)} className={linkClass}>
                        {label}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <span className="text-foreground/70">{label}:</span>
                        {items.map((it, i) => (
                          <span key={it.href} className="flex items-center gap-1.5">
                            {i > 0 && <span className="text-border">|</span>}
                            <a href={it.href} {...extProps(it.href)} className={`${linkClass} underline decoration-border underline-offset-4 hover:decoration-foreground`}>
                              {it.text}
                            </a>
                          </span>
                        ))}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* Research interests */}
        <section className="mt-24">
          <SectionHeading>Research Interests</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <Link href={`/publications?tags=${encodeURIComponent(c.pubs)}`} className={chip}>
                    <FileText className="h-3 w-3" /> Publications
                  </Link>
                  <Link href={`/experience?skills=${encodeURIComponent(c.exp)}`} className={chip}>
                    <Briefcase className="h-3 w-3" /> Experience
                  </Link>
                  {c.blog && (
                    <Link href={`/blog?tags=${encodeURIComponent(c.blog)}`} className={chip}>
                      <PenTool className="h-3 w-3" /> Blog
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected publications */}
        <section className="mt-20">
          <SectionHeading>Selected Publications</SectionHeading>
          <ol className="divide-y divide-border/70">
            {selected.map((p) => (
              <li key={p.id} className="grid gap-1 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
                <span className="text-sm tabular-nums text-muted-foreground">{p.year}</span>
                <div>
                  <Ext
                    href={p.arxivUrl || p.pdfUrl}
                    className="group font-medium leading-snug transition-colors hover:text-primary"
                  >
                    {p.title}
                    <ArrowUpRight className="ml-1 inline h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
                  </Ext>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <Authors authors={p.authors} />
                  </p>
                  <p className="mt-1 text-sm italic text-primary">{p.conference}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/publications"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            All publications <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </section>

        {/* Education */}
        <section className="mt-20">
          <SectionHeading>Education</SectionHeading>
          <div className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-6">
            <span className="text-sm tabular-nums text-muted-foreground">2018–23</span>
            <div>
              <h3 className="font-medium">B.E. in Computer Engineering</h3>
              <p className="text-sm text-muted-foreground">Institute of Engineering, Tribhuvan University</p>
              <p className="mt-2 text-sm">Research area: Recommender Systems and Machine Learning</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Advisor:{" "}
                <Ext
                  href="https://scholar.google.com/citations?user=ZB6i0OKaPo4C&hl=en"
                  className="underline-offset-4 hover:text-foreground hover:underline"
                >
                  Prof. Dr. Subarna Shakya
                </Ext>
              </p>
            </div>
          </div>
        </section>

        {/* Recent blog */}
        <section className="mt-20">
          <SectionHeading>Recent Blog</SectionHeading>
          <ol className="divide-y divide-border/70">
            {recentPosts.map((post) => (
              <li key={post.slug} className="grid gap-1 py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
                <span className="text-sm tabular-nums text-muted-foreground">
                  {new Date(post.date).getFullYear()}
                </span>
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium leading-snug transition-colors hover:text-primary"
                    scroll={true}
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(post.date)}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            All blog posts <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
