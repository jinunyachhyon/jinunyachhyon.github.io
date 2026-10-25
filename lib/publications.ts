export interface Publication {
  id: string
  title: string
  authors: string
  conference: string
  year: number
  abstract: string
  tags: string[]
  pdfUrl: string
  codeUrl?: string
  arxivUrl?: string
  publicationType: "journal" | "conference" | "preprint"
}

export const publications: Publication[] = [
  {
    id: "2610.15732",
    title: "NepPlural: A Human-Anchored Benchmark for Persona Annotation in Nepali Migration Discourse",
    authors: "Jinu Nyachhyon, Anish Khatiwada, Bimal Timilsina",
    conference: "(PlurVA-LLM) AACL-IJCNLP, 2026",
    year: 2026,
    abstract:
      "We introduced NepPlural, a benchmark of 2,148 code-mixed Nepali YouTube comments on youth migration, annotated with a four-axis persona taxonomy and a 300-comment gold set labelled by native speakers. We found that LLM annotation reliability depends heavily on protocol: batched chat labels barely agree, while per-comment annotation with an abstention option lets models match or exceed individual native speakers. A steerability probe shows frontier models adopt single persona axes well but rarely compose full personas.",
    tags: ["NLP", "Pluralistic Alignment", "Benchmarking", "LLM Annotation"],
    pdfUrl: "https://arxiv.org/pdf/2610.15732",
    codeUrl: "https://github.com/iriis-research/NepPlural",
    arxivUrl: "https://arxiv.org/abs/2610.15732",
    publicationType: "conference",
  },
  {
    id: "2604.14262",
    title: "GUI-Perturbed: Domain Randomization Reveals Systematic Brittleness in GUI Grounding Models",
    authors: "Yangyue Wang, Harshvardhan Sikka, Yash Mathur, Tony Zhou, Jinu Nyachhyon, Pranav Guruprasad",
    conference: "(AABA4ET) NeurIPS, 2026",
    year: 2026,
    abstract:
      "We introduced GUI-Perturbed, a controlled perturbation framework that independently varies visual scenes and instructions to measure GUI grounding robustness. Although grounding models report over 85% accuracy on standard benchmarks, they drop 27–56 percentage points when instructions require spatial reasoning, degrade significantly under 70% browser zoom, and get worse rather than better with rank-8 LoRA fine-tuning on augmented data. We release the dataset, augmentation pipeline, and a fine-tuned model.",
    tags: ["GUI Agents", "Visual Grounding", "Robustness", "Domain Randomization"],
    pdfUrl: "https://arxiv.org/pdf/2604.14262",
    codeUrl: "https://github.com/ManifoldRG/GUI-DR",
    arxivUrl: "https://arxiv.org/abs/2604.14262",
    publicationType: "conference",
  },
  {
    id: "cs.HC",
    title: "Confirmation bias: A challenge for scalable oversight",
    authors: "Gabriel Recchia, Chatrik Singh Mangat, Jinu Nyachhyon, Mridul Sharma, Callum Canavan, Dylan Epstein-Gross, Muhammed Abdulbari",
    conference: "AAAI-AIA, 2026",
    year: 2026,
    abstract:
      "We evaluated simple scalable-oversight protocols and found that they offer no reliable advantage when humans assess models that are “usually but not always” correct. While showing arguments for both sides sometimes improved accuracy, evaluators still became overconfident, even in wrong model answers, and prior optimistic results likely relied on human knowledge advantages that won’t scale with stronger models. Our findings highlight the need for oversight methods that remain robust to human biases and increasing model capabilities.",
    tags: ["Scalable Oversight", "Human-AI Interaction", "Automation Bias", "AI Alignment"],
    pdfUrl: "https://arxiv.org/pdf/2507.19486",
    codeUrl: "",
    arxivUrl: "https://arxiv.org/abs/2507.19486",
    publicationType: "conference",
  },
  {
    id: "cs.CL",
    title: "Consolidating and Developing Benchmarking Datasets for the Nepali Natural Language Understanding Tasks",
    authors: "Jinu Nyachhyon, Mridul Sharma, Prajwal Thapa, Bal Krishna Bal",
    conference: "AACL-IJCNLP, 2025",
    year: 2025,
    abstract:
      "We developed NLUE, a comprehensive 12-task Nepali NLU benchmark that expands far beyond the limited four-task Nep-gLUE. It includes classification, paraphrase, similarity, NLI, and a GMET task, revealing that current state-of-the-art models struggle with these more complex challenges. Our results show multilingual models outperform monolingual ones, underscoring the need for stronger Nepali-specific solutions and advancing NLP research for low-resource languages.",
    tags: ["NLP", "Benchmarking", "Nepali Language Understanding Evaluation (NLUE)"],
    pdfUrl: "https://arxiv.org/pdf/2411.19244",
    codeUrl: "https://huggingface.co/collections/IRIIS-RESEARCH/nepali-lanuguage-understanding-evaluation-benchmark-68592c0105fe37d5d97629d4",
    arxivUrl: "https://arxiv.org/abs/2411.19244",
    publicationType: "conference",
  },
  {
    id: "2025.chipsal-1.2",
    title: "Development of Pre-Trained Transformer-based Models for the Nepali Language",
    authors: "Prajwal Thapa, Jinu Nyachhyon, Mridul Sharma, Bal Krishna Bal (Joint First Author)",
    conference: "(CHiPSAL) COLING, 2025",
    year: 2025,
    abstract:
      "We created the largest-ever 27.5 GB Nepali text corpus and pre-trained Nepali-specific BERT, RoBERTa, and GPT-2 models, addressing the scarcity of monolingual resources. Our models achieved state-of-the-art results on Nep-gLUE and improved Nepali text generation, showing the potential of decoder-based and instruction-tuned models for the Nepali language.",
    tags: ["NLP", "Transformers", "Low-Resource Language", "Instruction Tuning"],
    pdfUrl: "https://aclanthology.org/2025.chipsal-1.2.pdf",
    codeUrl: "https://huggingface.co/collections/IRIIS-RESEARCH/nepali-language-models-6729fc7a5cd58b3f40f47708",
    arxivUrl: "https://arxiv.org/abs/2411.15734",
    publicationType: "conference",
  },
  {
    id: "cs.LG",
    title: "Local Herb Identification Using Transfer Learning: A CNN-Powered Mobile Application for Nepalese Flora",
    authors: "Prajwal Thapa, Mridul Sharma, Jinu Nyachhyon, Yagya Raj Pandeya",
    conference: "arXiv preprint",
    year: 2025,
    abstract:
      "We built a deep learning–based herb classification system for 60 Nepali herb species using a curated dataset of 12,000 images. Multiple CNN and transformer architectures were tested, with DenseNet121 achieving the best performance, enhanced through augmentation and regularization. Our work improves automated herb recognition to support botanical research and sustainable herb use.",
    tags: ["Herb Classification", "Computer Vision", "Transfer Learning", "Mobile Application"],
    pdfUrl: "https://arxiv.org/pdf/2505.02147",
    codeUrl: "https://huggingface.co/collections/IRIIS-RESEARCH/local-herbs-dataset-681a597b77f72cae52904b90",
    arxivUrl: "https://arxiv.org/abs/2505.02147",
    publicationType: "preprint",
  },
  {
    id: "pub5",
    title: "Interactive Guide Assignment System with Destination Recommendation and Built-in Chatbox",
    authors: "Babina Banjara , Jinish Shrestha, Jinu Nyachhyon, Rijan Timilsina, Subarna Shakya",
    conference: "Journal of Trends in Computer Science and Smart Technology",
    year: 2023,
    abstract:
      "We developed “Safari Nepal,” a travel platform where users can search destinations, view maps, connect with tour guides, and join chatrooms. Our system provides personalized destination recommendations using a content-based KNN + cosine-similarity model, and also allows users to publish blogs and share travel experiences.",
    tags: ["Recommender System", "Machine Learning"],
    pdfUrl: "https://irojournals.com/tcsst/article/pdf/5/3/3",
    codeUrl: "",
    arxivUrl: "",
    publicationType: "journal",
  },
]

export function getAllPublications(): Publication[] {
  return publications
}

export function getPublicationsByYear(): Record<number, Publication[]> {
  return publications.reduce(
    (acc, pub) => {
      if (!acc[pub.year]) {
        acc[pub.year] = []
      }
      acc[pub.year].push(pub)
      return acc
    },
    {} as Record<number, Publication[]>,
  )
}

export function getPublicationsByType(): Record<string, Publication[]> {
  return publications.reduce(
    (acc, pub) => {
      if (!acc[pub.publicationType]) {
        acc[pub.publicationType] = []
      }
      acc[pub.publicationType].push(pub)
      return acc
    },
    {} as Record<string, Publication[]>,
  )
}

export function getPublicationTags(): string[] {
  const tagsSet = new Set<string>()
  publications.forEach((pub) => {
    pub.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

export function searchPublications(
  query: string,
  filters: { tags?: string[]; type?: string; year?: number },
): Publication[] {
  return publications.filter((pub) => {
    // Text search
    const textMatch =
      query === "" ||
      pub.title.toLowerCase().includes(query.toLowerCase()) ||
      pub.authors.toLowerCase().includes(query.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(query.toLowerCase()) ||
      pub.conference.toLowerCase().includes(query.toLowerCase())

    // Tag filter
    const tagMatch = !filters.tags || filters.tags.length === 0 || pub.tags.some((tag) => filters.tags?.includes(tag))

    // Type filter
    const typeMatch = !filters.type || pub.publicationType === filters.type

    // Year filter
    const yearMatch = !filters.year || pub.year === filters.year

    return textMatch && tagMatch && typeMatch && yearMatch
  })
}
