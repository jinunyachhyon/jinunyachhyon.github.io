import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Quote } from "lucide-react"

export default function PhilosophyPage() {
  return (
    <div className="container py-10 max-w-7xl">
      <div className="space-y-10 max-w-4xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold mb-4">My Philosophy</h1>
          <p className="text-muted-foreground">
            My approach to research and artificial intelligence is guided by a set of core principles and beliefs. Here,
            I share my thoughts on the field, its challenges, and its future.
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Research Philosophy</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              My research philosophy is centered around the pursuit of knowledge that advances both our theoretical
              understanding of artificial intelligence and its practical applications. I believe that the most impactful
              research lies at the intersection of these two domains.
            </p>
            <p>
              I am driven by curiosity and a desire to understand the fundamental principles that govern learning and
              intelligence. At the same time, I am deeply committed to developing AI systems that can solve real-world
              problems and benefit society.
            </p>
            <p>
              I value rigorous methodology, reproducible experiments, and clear communication. I believe that research
              should be transparent, accessible, and open to scrutiny. This is why I am a strong advocate for open
              science and the sharing of code, data, and results.
            </p>
          </div>
        </section>

        <div className="relative py-6">
          <Separator className="absolute top-0 left-0 right-0" />
          <div className="relative flex items-start">
            <Quote className="text-primary h-10 w-10 absolute -left-12 top-0" />
            <blockquote className="pl-6 italic text-xl">
              The goal of AI research should not be to create systems that merely mimic human intelligence, but to
              develop tools that complement and enhance human capabilities, enabling us to solve problems that were
              previously beyond our reach.
            </blockquote>
          </div>
          <Separator className="absolute bottom-0 left-0 right-0" />
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Vision for AI</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              I envision a future where AI systems work alongside humans as collaborative partners, augmenting our
              capabilities and helping us tackle the most pressing challenges facing humanity. This vision is guided by
              three key principles:
            </p>
            <h3>Human-Centered AI</h3>
            <p>
              AI should be designed with human needs, values, and well-being at its core. This means developing systems
              that are interpretable, trustworthy, and aligned with human values. It also means ensuring that the
              benefits of AI are broadly shared and that potential harms are minimized.
            </p>
            <h3>Interdisciplinary Collaboration</h3>
            <p>
              The development of AI requires collaboration across disciplines, including computer science, cognitive
              science, neuroscience, philosophy, and ethics. By drawing on insights from these diverse fields, we can
              create AI systems that are more robust, versatile, and beneficial.
            </p>
            <h3>Responsible Innovation</h3>
            <p>
              As AI becomes more powerful and pervasive, it is essential that we approach its development with a sense
              of responsibility and foresight. This means anticipating potential risks and challenges, engaging with
              diverse stakeholders, and establishing appropriate governance frameworks.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Current Challenges</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Trustworthy AI</h3>
                <p className="text-muted-foreground">
                  Developing AI systems that are robust, fair, transparent, and accountable remains a significant
                  challenge. This requires advances in areas such as interpretability, fairness, and safety, as well as
                  new evaluation methods and benchmarks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Sample Efficiency</h3>
                <p className="text-muted-foreground">
                  Current AI systems often require large amounts of data and computation to learn effectively. Improving
                  sample efficiency is crucial for making AI more accessible and sustainable, and for enabling
                  applications in domains where data is scarce.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Generalization</h3>
                <p className="text-muted-foreground">
                  AI systems often struggle to generalize beyond their training distribution. Developing methods that
                  enable robust generalization to new tasks, domains, and environments is a key challenge for the field.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Human-AI Collaboration</h3>
                <p className="text-muted-foreground">
                  Designing AI systems that can effectively collaborate with humans requires advances in areas such as
                  human-computer interaction, natural language processing, and cognitive modeling.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="relative py-6">
          <Separator className="absolute top-0 left-0 right-0" />
          <div className="relative flex items-start">
            <Quote className="text-primary h-10 w-10 absolute -left-12 top-0" />
            <blockquote className="pl-6 italic text-xl">
              The most exciting aspect of AI research is not just what we can build, but what we can learn about
              ourselves and our own intelligence in the process.
            </blockquote>
          </div>
          <Separator className="absolute bottom-0 left-0 right-0" />
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Future Directions</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>Looking ahead, I am particularly excited about several emerging directions in AI research:</p>
            <h3>Multimodal Learning</h3>
            <p>
              The ability to learn from and reason about multiple modalities (e.g., vision, language, audio) is a key
              aspect of human intelligence. Developing AI systems that can effectively integrate information across
              modalities will enable new applications and insights.
            </p>
            <h3>Self-Supervised Learning</h3>
            <p>
              Self-supervised learning, which leverages the structure of unlabeled data to learn useful representations,
              has shown tremendous promise in recent years. Advancing this paradigm will be crucial for making AI more
              data-efficient and accessible.
            </p>
            <h3>AI for Scientific Discovery</h3>
            <p>
              AI has the potential to accelerate scientific discovery across domains such as drug discovery, materials
              science, and climate modeling. Developing AI systems that can assist scientists in generating hypotheses,
              designing experiments, and analyzing data is an exciting frontier.
            </p>
            <h3>Neurosymbolic AI</h3>
            <p>
              Integrating neural and symbolic approaches to AI offers the promise of systems that combine the
              flexibility and learning capabilities of neural networks with the interpretability and reasoning
              capabilities of symbolic methods.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Personal Commitment</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>As a researcher in AI, I am committed to:</p>
            <ul>
              <li>
                Conducting rigorous, reproducible research that advances our understanding of intelligence and learning.
              </li>
              <li>Developing AI systems that are aligned with human values and that benefit society.</li>
              <li>Communicating my research clearly and accessibly to both technical and non-technical audiences.</li>
              <li>
                Mentoring and supporting the next generation of AI researchers, particularly those from underrepresented
                groups.
              </li>
              <li>
                Engaging with the broader societal implications of AI and contributing to discussions on its governance
                and regulation.
              </li>
            </ul>
            <p>
              I believe that by adhering to these commitments, I can contribute to the development of AI in a way that
              is both scientifically rigorous and socially responsible.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
