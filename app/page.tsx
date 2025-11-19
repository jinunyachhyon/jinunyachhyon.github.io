import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowRight,
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

export default function BioPage() {
  return (
    <div className="container py-10 max-w-7xl">
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="aspect-square overflow-hidden rounded-xl">
              <Image
                src="/images/my_good_image.jpg?height=400&width=400"
                alt="Jinu Nyachhyon"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Jinu Nyachhyon</h1>
              <p className="text-muted-foreground">AI Researcher | ML Engineer</p>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <Link
                    href="https://scholar.google.com/citations?user=U6u0FcoAAAAJ&hl=en&oi=sra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">Google Scholar</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/jinu-nyachhyon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="https://x.com/nyachhyonjinu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
                
                {/* GitHub Links */}
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-2 text-sm">
                    <Link
                      href="https://github.com/jinunyachhyon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Personal
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                      href="https://github.com/jinu-code"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Work
                    </Link>
                  </div>
                </div>

                {/* Email Links */}
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-2 text-sm">
                    <Link
                      href="mailto:nyachhyonjinu@gmail.com"
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      Personal
                    </Link>
                    <span className="text-muted-foreground">•</span>
                    <Link
                      href="mailto:jinu.075bct021@acem.edu.np"
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      School
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/publications" scroll={true}>
                    <span>Publications</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/cv/Jinu_Nyachhyon_CV.pdf" scroll={true}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>CV</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">About Me</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                I am an AI Researcher at the Information and Language Processing Research Lab (ILPRL) at 
                Kathmandu University, working under the supervision of Prof. Bal Krishna Bal. 
                My research focuses on low-resource language modeling, with an emphasis on generalization.
              </p>
              <p>
                I am also an AI Engineer at Insyde AI, where I have developed and deployed AI agents to 
                automate financial calculations, multi-scenario evaluations, and user-facing email generation, 
                achieving over 90% reduction in per-customer processing time.
              </p>
              <p>
                My research interests lie at the intersection of Deep Learning, Vision-Language-Action, AI Alignment, and Interpretability.
                I'm driven by curiosity to explore problems across the full AI pipeline, always working toward building AI systems that are both capable and trustworthy.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Research Interests</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Natural Language Processing</h3>
                  <p className="text-muted-foreground mb-4">
                    Large language models, multimodal learning, and cross-lingual transfer.
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/publications?tags=NLP" scroll={true}>
                        <FileText className="mr-1 h-3 w-3" />
                        Publications
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/experience?skills=NLP" scroll={true}>
                        <Briefcase className="mr-1 h-3 w-3" />
                        Experience
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/blog?tags=NLP" scroll={true}>
                        <PenTool className="mr-1 h-3 w-3" />
                        Blog
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">AI Alignment</h3>
                  <p className="text-muted-foreground mb-4">
                    Fairness, interpretability, and robustness of machine learning models.
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/publications?tags=AI%20Alignment" scroll={true}>
                        <FileText className="mr-1 h-3 w-3" />
                        Publications
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/experience?skills=AI%20Alignment" scroll={true}>
                        <Briefcase className="mr-1 h-3 w-3" />
                        Experience
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/blog?tags=Responsible%20AI" scroll={true}>
                        <PenTool className="mr-1 h-3 w-3" />
                        Blog
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Computer Vision</h3>
                  <p className="text-muted-foreground mb-4">
                    Object detection, image segmentation, and visual reasoning with limited supervision.
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/publications?tags=Computer%20Vision" scroll={true}>
                        <FileText className="mr-1 h-3 w-3" />
                        Publications
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/experience?skills=Computer%20Vision" scroll={true}>
                        <Briefcase className="mr-1 h-3 w-3" />
                        Experience
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/blog?tags=Computer%20Vision" scroll={true}>
                        <PenTool className="mr-1 h-3 w-3" />
                        Blog
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Reinforcement Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    Sample-efficient RL, multi-agent systems, and applications to robotics.
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/publications?tags=Reinforcement%20Learning" scroll={true}>
                        <FileText className="mr-1 h-3 w-3" />
                        Publications
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/experience?skills=Reinforcement%20Learning" scroll={true}>
                        <Briefcase className="mr-1 h-3 w-3" />
                        Experience
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/blog?tags=Reinforcement%20Learning" scroll={true}>
                        <PenTool className="mr-1 h-3 w-3" />
                        Blog
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Education</h2>
            <div className="space-y-6">
              <div className="border-l-2 pl-4 border-primary">
                <h3 className="font-bold">B.E. in Computer Engineering</h3>
                <p className="text-muted-foreground">Institute of Engineering, Tribhuvan University, 2018 - 2023</p>
                <p className="mt-2">Research Area: Recommender System and Machine Learning</p>
                <p className="text-sm text-muted-foreground mt-1">Advisor: Prof. Subarna Shakya</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Blog</h2>
            <div className="space-y-4">
              <div className="border-l-2 pl-4 border-primary">
                <p className="text-sm text-muted-foreground">December 29, 2023</p>
                <Link
                  href="/blog/ml-fundamentals-part-5-advanced-topics"
                  className="hover:text-primary transition-colors"
                  scroll={true}
                >
                  <p className="font-medium">
                    Machine Learning Fundamentals: Part 5 - Advanced Topics and Real-World Applications
                  </p>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Final part covering MLOps, ethical considerations, and future trends in machine learning.
                </p>
              </div>
              <div className="border-l-2 pl-4 border-primary">
                <p className="text-sm text-muted-foreground">December 22, 2023</p>
                <Link
                  href="/blog/ml-fundamentals-part-4-evaluation"
                  className="hover:text-primary transition-colors"
                  scroll={true}
                >
                  <p className="font-medium">Machine Learning Fundamentals: Part 4 - Model Evaluation and Validation</p>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Comprehensive guide to model evaluation techniques and validation strategies.
                </p>
              </div>
              <div className="border-l-2 pl-4 border-primary">
                <p className="text-sm text-muted-foreground">November 15, 2023</p>
                <Link
                  href="/blog/transformers-part-3-architecture"
                  className="hover:text-primary transition-colors"
                  scroll={true}
                >
                  <p className="font-medium">Understanding Transformers: Part 3 - The Complete Architecture</p>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Exploring the complete Transformer architecture including encoders, decoders, and all components.
                </p>
              </div>
              <div className="border-l-2 pl-4 border-primary">
                <p className="text-sm text-muted-foreground">October 12, 2023</p>
                <Link href="/blog/multimodal-learning" className="hover:text-primary transition-colors" scroll={true}>
                  <p className="font-medium">Advances in Multimodal Learning</p>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Exploring recent advances in multimodal learning and AI systems understanding multiple forms of data.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="outline" asChild>
                <Link href="/blog" scroll={true}>
                  <span>Read all blog posts</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
