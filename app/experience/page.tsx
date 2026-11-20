"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type ExperienceCategory = "research" | "industry" | "teaching"

interface Experience {
  id: string
  category: ExperienceCategory
  role: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
  logo: string
  supervisor?: { name: string; href: string }
}

const experiences: Experience[] = [
  {
    id: "exp4",
    category: "research",
    role: "Co-founder & Researcher",
    company: "Institute for Research and Innovation in Intelligent Systems (IRIIS)",
    location: "Kathmandu, Nepal",
    period: "2026.02 - Present",
    description: [
      "Designing a formal evaluation framework for LLM agents with an explicit episode schema and multi-dimensional scoring, moving beyond single-number task success rates.",
      "Constructing a benchmark for multistep instruction planning over real procedural domains, with gold solutions stored as partial-order DAGs to credit valid alternative orderings.",
    ],
    skills: ["Agent Benchmarking", "LLM Evaluation", "Planning", "Research Leadership"],
    logo: "/logos/Iriis_logo.png?height=80&width=80",
  },
  {
    id: "exp7",
    category: "research",
    role: "Open Science Research Fellow",
    company: "Manifold Research Group",
    location: "USA (Remote)",
    period: "2025.10 - 2026.04",
    description: [
      "Built and benchmarked LLM-driven software control agents on Mind2Web, conducting systematic comparisons of models (e.g., UI-TARS, Qwen2.5-VL) in complex, real-world web environments.",
      "Developed trajectory generation and perturbation pipelines for training and stress-testing agents, enabling robustness evaluation under distribution shifts and unseen task variants.",
      "Conducted systematic analysis of agent behavior, focusing on spatial reasoning, tool use, and action grounding failures.",
    ],
    skills: ["LLM-Aided Agents", "Software Control Agents", "Agent Benchmarking", "Trajectory Generation"],
    logo: "/logos/manifold_logo.jpeg?height=80&width=80",
  },
  {
    id: "exp5",
    category: "research",
    role: "Research Assistant",
    company: "Information and Language Processing Research Lab (ILPRL)",
    location: "Kavre, Nepal",
    period: "2024.07 - 2025.12",
    description: [
      "Led the design and release of the NLUE benchmark (12 Nepali NLU tasks), establishing a standardized evaluation suite for low-resource LLMs.",
      "Assembled and processed a 27.5 GB Nepali text corpus addressing data scarcity.",
      "Pretrained BERT, RoBERTa and GPT-2 with instruction tuning, achieving SOTA on Nep-gLUE; conducted comparative evaluation and error analysis.",
    ],
    skills: ["Data Collection", "Pre-Training", "Benchmarking", "NLP"],
    logo: "/logos/KU_Logo.png?height=80&width=80",
    supervisor: { name: "Dr. Bal Krishna Bal", href: "https://ku.edu.np/contact-detail/48" },
  },
  {
    id: "exp3",
    category: "research",
    role: "Research Intern",
    company: "Modulo Research Ltd.",
    location: "Cambridge, UK (Remote)",
    period: "2024.06 - 2024.08",
    description: [
      "Automated analysis of 20-minute screen recordings, refining scene change detection to 80% precision via URL change tracking and LLM-based event and detail extraction from video frames.",
      "Conducted scalable oversight experiments by comparing LLM outputs with human annotations to assess and improve intent alignment.",
    ],
    skills: ["AI Alignment", "LLM Evaluation", "NLP"],
    logo: "/logos/Modulo_Research_logo.png?height=80&width=80",
    supervisor: { name: "Dr. Gabriel Recchia", href: "https://www.gabrielrecchia.com/" },
  },
  {
    id: "exp6",
    category: "industry",
    role: "AI Developer",
    company: "Insyde AI",
    location: "Maryland, USA (Remote)",
    period: "2025.01 - Present",
    description: [
      "Developed production-grade LLM agents for financial workflows with multi-step reasoning, tool use, and automated decision pipelines.",
      "Integrated Model Context Protocol (MCP) servers, external tools, and persistent memory for context-aware assistants.",
      "Reduced customer processing time by over 90%, increasing operational throughput by over 10×.",
    ],
    skills: ["LLM-Aided Agents", "MCP", "Workflow Automation", "FastAPI"],
    logo: "/logos/insyde_ai_logo.jpeg?height=80&width=80",
  },
  {
    id: "exp2",
    category: "industry",
    role: "ML Engineer",
    company: "Virtly IT & Business Solutions Sarl (ICEBRKR)",
    location: "Geneva, Switzerland (Remote)",
    period: "2024.03 - 2024.09",
    description: [
      "Finetuned BART, T5 and Pegasus for summarization (ROUGE-L > 50), and Phi-3 for a task prioritization system.",
      "Built an algorithm to resolve online meeting scheduling conflicts by proposing optimal time slots.",
    ],
    skills: ["NLP", "Finetuning", "Productivity AI"],
    logo: "/logos/icebrkr_logo.png?height=80&width=80",
  },
  {
    id: "exp1",
    category: "industry",
    role: "ML/CV Engineer",
    company: "LogicTronix",
    location: "Lalitpur, Nepal",
    period: "2023.06 - 2024.03",
    description: [
      "Integrated and optimized SFA3D into the ADAS stack, achieving real-time 3D object detection and tracking on embedded platforms.",
      "Reduced model size by over 60% through quantization for Xilinx FPGA deployment, improving edge inference efficiency.",
    ],
    skills: ["Computer Vision", "Object Detection", "Quantization"],
    logo: "/logos/Logictronix-Logo.png?height=80&width=80",
  },
  {
    id: "exp8",
    category: "teaching",
    role: "Assistant Lecturer",
    company: "Herald College Kathmandu (University of Wolverhampton)",
    location: "Kathmandu, Nepal",
    period: "2026.03 - 2026.10",
    description: [
      "Delivered tutorials and workshops spanning classical deep learning through to modern agentic AI systems, integrating mathematical foundations with hands-on implementation.",
      "Designed and supervised implementation-based learning (e.g., MNIST and Devanagari datasets, agent-based automation builds), mentoring group and individual work with emphasis on correct methodology and consistency.",
    ],
    skills: ["Teaching", "Deep Learning", "Agentic AI", "Curriculum Design", "Mentoring"],
    logo: "/logos/Herald_logo.png?height=80&width=80",
  }
]

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link: string
}

const projects: Project[] = [
  {
    id: "proj0",
    title: "NepPlural",
    description:
      "A human-anchored benchmark of 2,148 code-mixed Nepali YouTube comments on youth migration, annotated with a four-axis persona taxonomy and a 300-comment native-speaker gold set, used to test how reliably LLMs annotate and adopt personas.",
    technologies: ["LLM Annotation", "Pluralistic Alignment", "Code-Mixed NLP", "Benchmarking"],
    link: "https://github.com/iriis-research/NepPlural/tree/main",
  },
  {
    id: "proj1",
    title: "NLUE Benchmark",
    description:
      " A comprehensive evaluation suite for Nepali language understanding, featuring 12 diverse NLU tasks across classification, similarity, paraphrase, inference, and masked language tasks, designed to advance research in low-resource NLP.",
    technologies: ["NLU", "NLP Evaluation", "Benchmarking"],
    link: "https://huggingface.co/collections/IRIIS-RESEARCH/nepali-lanuguage-understanding-evaluation-benchmark-68592c0105fe37d5d97629d4",
  },
  {
    id: "proj2",
    title: "GUI-Perturbed",
    description:
      "A controlled perturbation framework that independently varies visual scenes and instructions to test GUI grounding models, showing 27–56 point accuracy drops on spatial-reasoning instructions and significant degradation under browser zoom.",
    technologies: ["GUI Agents", "Visual Grounding", "Robustness", "Domain Randomization"],
    link: "https://github.com/ManifoldRG/GUI-DR",
  },
]

const sections: { key: ExperienceCategory; title: string }[] = [
  { key: "research", title: "Research Experience" },
  { key: "industry", title: "Industry Experience" },
  { key: "teaching", title: "Teaching Experience" },
]

export default function ExperiencePage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [initialized, setInitialized] = useState(false)

  // Pending filters (what user is selecting)
  const [pendingSkills, setPendingSkills] = useState<string[]>([])

  // Applied filters (what's actually filtering the content)
  const [appliedSkills, setAppliedSkills] = useState<string[]>([])

  const [showFilters, setShowFilters] = useState(false)

  // Memoize the static data to prevent unnecessary re-renders
  const allSkills = useMemo(() => Array.from(new Set(experiences.flatMap((exp) => exp.skills))).sort(), [])

  // Memoize filtered experiences to avoid recalculating on every render
  const filteredExperiences = useMemo(() => {
    let filtered = experiences

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (exp) =>
          exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.description.some((desc) => desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
          exp.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply skill filters
    if (appliedSkills.length > 0) {
      filtered = filtered.filter((exp) => appliedSkills.some((skill) => exp.skills.includes(skill)))
    }

    return filtered
  }, [searchQuery, appliedSkills])

  // Initialize filters from URL params only once
  useEffect(() => {
    if (!initialized) {
      const skillsParam = searchParams.get("skills")
      if (skillsParam) {
        const skills = skillsParam.split(",").filter((skill) => allSkills.includes(skill))
        setAppliedSkills(skills)
        setPendingSkills(skills)
      }
      setInitialized(true)
    }
  }, [initialized, searchParams, allSkills])

  const handleSkillToggle = useCallback((skill: string) => {
    setPendingSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }, [])

  const applyFilters = useCallback(() => {
    setAppliedSkills(pendingSkills)
    setShowFilters(false)
  }, [pendingSkills])

  const clearAllFilters = useCallback(() => {
    setPendingSkills([])
    setAppliedSkills([])
    setSearchQuery("")
    setShowFilters(false)
  }, [])

  const hasAppliedFilters = appliedSkills.length > 0
  const hasPendingChanges = JSON.stringify(pendingSkills.sort()) !== JSON.stringify(appliedSkills.sort())

  const renderSection = ({ key, title }: { key: ExperienceCategory; title: string }) => {
    const items = filteredExperiences.filter((exp) => exp.category === key)
    if (items.length === 0) return null
    return (
      <section key={key} className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight border-b border-border/70 pb-3">{title}</h2>
        <div className="space-y-6">
          {items.map((exp) => (
              <Card key={exp.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4 bg-muted p-6 flex flex-col justify-between">
                    <div>
                      <div className="mb-4 flex justify-center md:justify-start">
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </div>
                      <h3 className="font-bold text-lg">{exp.role}</h3>
                      <p className="text-primary">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                      <p className="text-sm font-medium mt-2">{exp.period}</p>
                      {exp.supervisor && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Supervisor:{" "}
                          <a
                            href={exp.supervisor.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                          >
                            {exp.supervisor.name}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      {exp.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
          ))}
        </div>
      </section>
    )
  }
  return (
    <div className="container py-10 max-w-7xl">
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Experience</h1>
          <p className="text-muted-foreground max-w-3xl">
            Research, industry and teaching experience, most recent first within each section.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experience..."
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
                {appliedSkills.length}
              </Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Skills & Technologies</Label>
                {pendingSkills.length > 0 && (
                  <Button variant="link" className="h-auto p-0" onClick={() => setPendingSkills([])}>
                    Clear
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-background rounded-md">
                {allSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={pendingSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
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

        {filteredExperiences.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No experience found matching your criteria.</p>
          </div>
        )}

        {sections.map(renderSection)}

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight border-b border-border/70 pb-3">Research Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col h-full">
                <CardHeader>
                  {project.link ? (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      <CardTitle className="hover:text-primary transition-colors cursor-pointer">
                        {project.title}
                      </CardTitle>
                    </Link>
                  ) : (
                    <CardTitle>{project.title}</CardTitle>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
