import type { ReactNode } from "react"

const questions = [
  {
    title: "Is the evaluator valid?",
    body: "LLMs are increasingly used as judges and annotators. I ask whether their labels track human judgement, or only each other, and how much the answer depends on the protocol rather than the model.",
  },
  {
    title: "Does it hold beyond English?",
    body: "A finding from a high-resource language is a hypothesis elsewhere. I test whether evaluations survive changes of script, code-mixing and cultural context, using Nepali as one testbed among many that benchmarks leave out.",
  },
  {
    title: "Where does oversight break?",
    body: "Systems can fail quietly, and people can trust them anyway. I study both sides: agents that collapse under small, controlled changes, and human evaluators who defer to a model even when it is wrong.",
  },
]

const principles = [
  {
    title: "Anchor to people, not proxies",
    body: "Agreement between models is not evidence of validity. Where it matters, I build gold sets with native speakers and measure against them.",
  },
  {
    title: "Change one thing at a time",
    body: "Controlled perturbation turns a vague claim of brittleness into a specific, reproducible failure that someone can fix.",
  },
  {
    title: "Report what did not work",
    body: "Some of my most useful results are negative: an oversight protocol with no reliable advantage, a fine-tuning step that made a model worse. They belong in the paper.",
  },
  {
    title: "Release what I build",
    body: "Wherever I can, I release the datasets, models and code behind my work, so others can check the results and build on them, especially in languages with few resources to begin with.",
  },
]

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-5 border-b border-border/70 pb-3 text-2xl font-bold tracking-tight">{children}</h2>
}

export default function PhilosophyPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <header>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">My Philosophy</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          How I approach research, the questions I keep returning to, and where I want to take them next.
        </p>
      </header>

      <section className="mt-14">
        <Heading>A benchmark score is a claim</Heading>
        <div className="space-y-4 leading-relaxed text-foreground/85">
          <p>
            Most of my work starts from a number that looked convincing. GUI grounding models report over 85% accuracy
            on standard benchmarks, yet in GUI-Perturbed they lost 27 to 56 points as soon as an instruction required
            spatial reasoning. In NepPlural, LLM annotators went from barely agreeing with each other to agreeing
            strongly, just by changing how items were presented, while under forced choice their accuracy against native
            speakers stayed around 0.50 macro-F1.
          </p>
          <p>
            Neither number was wrong. Each answered a narrower question than the one people were asking. I treat
            every evaluation as a claim that needs its own evidence: <em>valid for whom, in which language, under
            what conditions?</em>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <Heading>Questions I keep returning to</Heading>
        <div className="grid gap-4">
          {questions.map((q) => (
            <div key={q.title} className="rounded-xl border bg-card p-6">
              <h3 className="text-lg font-semibold tracking-tight text-primary">{q.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{q.body}</p>
            </div>
          ))}
        </div>
      </section>

      <blockquote className="mt-14 border-l-4 border-primary pl-5 text-xl font-medium leading-snug tracking-tight">
        A model can look like a credible stand-in for a community without actually representing it. Finding that gap
        is the job of evaluation.
      </blockquote>

      <section className="mt-14">
        <Heading>How I work</Heading>
        <dl className="divide-y divide-border/70">
          {principles.map((p) => (
            <div key={p.title} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
              <dt className="font-semibold">{p.title}</dt>
              <dd className="leading-relaxed text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <Heading>Where I am heading</Heading>
        <div className="space-y-4 leading-relaxed text-foreground/85">
          <p>
            So far I have mostly measured where systems fail. Next I want to explain why. When frontier models adopt a
            single persona trait well but compose a full persona only about a third of the time, prompting alone
            cannot tell me whether the failure lies in the instructions or in how the model represents those traits.
            Interpretability and causal methods are what I most want to learn, so that evaluation can point to a cause
            and not only a symptom.
          </p>
          <p>
            I also want these questions asked across languages from the start, not added at the end. Many
            communities will meet language models first through their own scripts, dialects and mixtures of
            languages, and an evaluation that never sees those conditions cannot speak for them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <Heading>Beyond my own research</Heading>
        <div className="space-y-4 leading-relaxed text-foreground/85">
          <p>
            Good research needs places where it can happen. I co-founded the Institute for Research and Innovation in
            Intelligent Systems (IRIIS) in Nepal to build open benchmarks and evaluation tools, and I have taught
            deep learning through to agentic AI, mentoring students through implementation-based projects. I care
            about making careful, open research possible for people who, like me, started far from the usual
            centres of AI.
          </p>
        </div>
      </section>
    </div>
  )
}
