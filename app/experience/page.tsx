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

interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
  logo: string
}

const experiences: Experience[] = [
  {
    id: "exp1",
    role: "AI Developer",
    company: "InsydeAI LLC",
    location: "Maryland, USA",
    period: "2025.01 - Present",
    description: [
      "Developed AI agents for financial calculations, multi-scenario analysis, and automated email drafting.",
      "Cut processing time by 90%+, boosting officer capacity 10×.",
      "Improved response accuracy, consistency, and customer experience.",
    ],
    skills: ["AI Agent", "Automation", "NLP", "FastAPI"],
    logo: "/logos/insyde_ai_logo.jpeg?height=80&width=80",
  },
  {
    id: "exp2",
    role: "Research Assistant",
    company: "Information and Language Processing Research Lab (ILPRL)",
    location: "Kavre, Nepal",
    period: "2024.07 - 2025.02",
    description: [
      "Collected a 27.5 GB Nepali corpus to address data scarcity for low-resource NLP.",
      "Pretrained BERT, RoBERTa, and GPT-2 with instruction tuning, outperforming prior models on Nep-gLUE by +2 points and notable gains in Nepali text generation quality.",
      "Led design and release of NLUE benchmark with 12 Nepali NLU tasks, setting a new standard for evaluation.",
    ],
    skills: ["Data Collection", "Pre-Training", "Benchmarking", "NLP"],
    logo: "/logos/KU_Logo.png?height=80&width=80",
  },
  {
    id: "exp3",
    role: "Research Intern",
    company: "Modulo Research Ltd.",
    location: "Cambridge, UK",
    period: "Summer 2024",
    description: [
      "Built a pipeline to automate analysis of 20-min screen recordings with scene change detection at 80% precision via URL tracking.",
      "Extract events and details from video frames using LLMs, iterating prompt engineering for optimal results.",
      "Conducted scalable oversight experiments, comparing LLM outputs with human annotations to improve intent alignment.",
    ],
    skills: ["AI Alignment", "LLM Evaluation", "NLP"],
    logo: "/logos/Modulo_Research_logo.png?height=80&width=80",
  },
  {
    id: "exp4",
    role: "ML Engineer",
    company: "Virtly IT & Business Solutions Sarl (ICEBRKR)",
    location: "Geneva, Switzerland",
    period: "2024.03 - 2024.09",
    description: [
      "Finetuned LLMs for dialogue summarization and cross-application prioritization of tasks.",
      "Achieved ROUGE-L >50, implying very high overlap with human summaries.",
      "Built an algorithm to resolve online meeting scheduling conflicts by suggesting optimal time slots.",
    ],
    skills: ["NLP", "Finetuning", "Productivity AI"],
    logo: "/logos/icebrkr_logo.png?height=80&width=80",
  },
  {
    id: "exp5",
    role: "ML/CV Engineer",
    company: "LogicTronix",
    location: "Lalitpur, Nepal",
    period: "2023.06 - 2024.03",
    description: [
      "Integrated and optimized SFA3D in the ADAS stack, achieving real-time 3D object detection, ~20 FPS on embedded platforms.",
      "Implemented Deep Learning CV algorithms for real-time 2D object detection and tracking, ~50 FPS.",
      "Reduced model size by 60%+ via quantization for Xilinx FPGA, boosting edge inference efficiency.",
    ],
    skills: ["Computer Vision", "Object Detection", "Quantization"],
    logo: "/logos/Logictronix-Logo.png?height=80&width=80",
  },
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
    id: "proj1",
    title: "NLUE Benchmark",
    description:
      " A comprehensive evaluation suite for Nepali language understanding, featuring 12 diverse NLU tasks across classification, similarity, paraphrase, inference, and masked language tasks, designed to advance research in low-resource NLP.",
    technologies: ["NLU", "NLP Evaluation", "Benchmarking"],
    link: "https://huggingface.co/collections/IRIIS-RESEARCH/nepali-lanuguage-understanding-evaluation-benchmark-68592c0105fe37d5d97629d4",
  },
  {
    id: "proj2",
    title: "CV Models Quantization for Edge Devices",
    description:
      "A tutorial on quantizing computer vision models for efficient edge deployment, covering model implementation and optimization in PyTorch, and quantization techniques for DPU (Deep Processing Unit) inference using Vitis AI.",
    technologies: ["PyTorch", "Quantization", "C++", "Vitis AI"],
    link: "https://github.com/LogicTronix/Vitis-AI-Reference-Tutorials",
  },
  {
    id: "proj3",
    title: "Drug Target Integration",
    description:
      "Our model predicts binding affinity across a diverse set of drugs and target groups. Drug-target interaction prediction task aims to predict the interaction activity score in silico given only the accessible compound structural information and protein amino acid sequence.",
    technologies: ["DeepPurpose", "DTI", "Bioinformatics"],
    link: "https://github.com/jinunyachhyon/Drug-Target-Integration",
  },
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

  return (
    <div className="container py-10 max-w-7xl">
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Experience</h1>
          <p className="text-muted-foreground max-w-3xl">
            My professional journey spans impactful roles in both academia and industry, 
            where I have worked on building high-performing Nepali language models, benchmarking datasets, 
            and practical AI tools now adopted by thousands of users.
            Below is a summary of my experience and projects.
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

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Work Experience</h2>
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No experience found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredExperiences.map((exp) => (
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
          )}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Research Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col h-full">
                <CardHeader>
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
