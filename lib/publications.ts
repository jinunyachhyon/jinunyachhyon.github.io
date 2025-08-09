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
    id: "2025.chipsal-1.2",
    title: "Development of Pre-Trained Transformer-based Models for the Nepali Language",
    authors: "Prajwal Thapa, Jinu Nyachhyon, Mridul Sharma, Bal Krishna Bal",
    conference: "International Committee on Computational Linguistics",
    year: 2025,
    abstract:
      "Transformer-based pre-trained language models have dominated the field of Natural Language Processing (NLP) for quite some time now. However, the Nepali language, spoken by approximately 32 million people worldwide, remains significantly underrepresented in this domain. This underrepresentation is primarily attributed to the scarcity of monolingual data corpora and limited available resources for the Nepali language. While existing efforts have predominantly concentrated on basic encoder-based models, there is a notable gap in the exploration of decoder-based architectures. To address this gap, we have collected 27.5 GB of Nepali text data, approximately 2.4x larger than any previously available Nepali language corpus. Leveraging this data, we pre-trained three different models i.e., BERT, RoBERTa, and GPT-2, exclusively for the Nepali Language. Furthermore, we performed instruction tuning and explored its potential for monolingual Nepali data, providing a foundation for future research. Our models outperformed the existing best model by 2 points on Nep-gLUE benchmark, scoring 95.60 and also outperformed existing models on text generation tasks, demonstrating improvements in both understanding and generating Nepali text.",
    tags: ["NLP", "Transformers", "Low-Resource Language", "Instruction Tuning"],
    pdfUrl: "https://papers.nips.cc/paper/2023/file/vision-transformers-dense-prediction.pdf",
    codeUrl: "https://huggingface.co/collections/IRIIS-RESEARCH/nepali-language-models-6729fc7a5cd58b3f40f47708",
    arxivUrl: "https://arxiv.org/abs/2411.15734",
    publicationType: "conference",
  },
  {
    id: "cs.HC",
    title: "Confirmation bias: A challenge for scalable oversight",
    authors: "Gabriel Recchia, Chatrik Singh Mangat, Jinu Nyachhyon, Mridul Sharma, Callum Canavan, Dylan Epstein-Gross, Muhammed Abdulbari",
    conference: "arXiv preprint",
    year: 2025,
    abstract:
      "Scalable oversight protocols aim to empower evaluators to accurately verify AI models more capable than themselves. However, human evaluators are subject to biases that can lead to systematic errors. We conduct two studies examining the performance of simple oversight protocols where evaluators know that the model is 'correct most of the time, but not all of the time'. We find no overall advantage for the tested protocols, although in Study 1, showing arguments in favor of both answers improves accuracy in cases where the model is incorrect. In Study 2, participants in both groups become more confident in the system's answers after conducting online research, even when those answers are incorrect. We also reanalyze data from prior work that was more optimistic about simple protocols, finding that human evaluators possessing knowledge absent from models likely contributed to their positive results--an advantage that diminishes as models continue to scale in capability. These findings underscore the importance of testing the degree to which oversight protocols are robust to evaluator biases, whether they outperform simple deference to the model under evaluation, and whether their performance scales with increasing problem difficulty and model capability.",
    tags: ["Scalable Oversight", "Human-AI Interaction", "Automation Bias", "AI Alignment"],
    pdfUrl: "https://arxiv.org/pdf/2507.19486",
    codeUrl: "",
    arxivUrl: "https://arxiv.org/abs/2507.19486",
    publicationType: "preprint",
  },
  {
    id: "cs.CL",
    title: "Consolidating and Developing Benchmarking Datasets for the Nepali Natural Language Understanding Tasks",
    authors: "Jinu Nyachhyon, Mridul Sharma, Prajwal Thapa, Bal Krishna Bal",
    conference: "arXiv preprint",
    year: 2025,
    abstract:
      "The Nepali language has distinct linguistic features, especially its complex script (Devanagari script), morphology, and various dialects, which pose a unique challenge for natural language processing (NLP) evaluation. While the Nepali Language Understanding Evaluation (Nep-gLUE) benchmark provides a foundation for evaluating models, it remains limited in scope, covering four tasks. This restricts their utility for comprehensive assessments of NLP models. To address this limitation, we introduce eight new datasets, creating a new benchmark, the Nepali Language Understanding Evaluation (NLUE) benchmark, which covers a total of 12 tasks for evaluating the performance of models across a diverse set of Natural Language Understanding (NLU) tasks. The added tasks include single-sentence classification, similarity and paraphrase tasks, and Natural Language Inference (NLI) tasks. On evaluating the models using added tasks, we observe that the existing models fall short in handling complex NLU tasks effectively. This expanded benchmark sets a new standard for evaluating, comparing, and advancing models, contributing significantly to the broader goal of advancing NLP research for low-resource languages.",
    tags: ["NLP", "Benchmarking", "Nepali Language Understanding Evaluation (NLUE)"],
    pdfUrl: "https://arxiv.org/pdf/2411.19244",
    codeUrl: "https://huggingface.co/collections/IRIIS-RESEARCH/nepali-lanuguage-understanding-evaluation-benchmark-68592c0105fe37d5d97629d4",
    arxivUrl: "https://arxiv.org/abs/2411.19244",
    publicationType: "preprint",
  },
  {
    id: "cs.LG",
    title: "Local Herb Identification Using Transfer Learning: A CNN-Powered Mobile Application for Nepalese Flora",
    authors: "Prajwal Thapa, Mridul Sharma, Jinu Nyachhyon, Yagya Raj Pandeya",
    conference: "arXiv preprint",
    year: 2025,
    abstract:
      "Herb classification presents a critical challenge in botanical research, particularly in regions with rich biodiversity such as Nepal. This study introduces a novel deep learning approach for classifying 60 different herb species using Convolutional Neural Networks (CNNs) and transfer learning techniques. Using a manually curated dataset of 12,000 herb images, we developed a robust machine learning model that addresses existing limitations in herb recognition methodologies. Our research employed multiple model architectures, including DenseNet121, 50-layer Residual Network (ResNet50), 16-layer Visual Geometry Group Network (VGG16), InceptionV3, EfficientNetV2, and Vision Transformer (VIT), with DenseNet121 ultimately demonstrating superior performance. Data augmentation and regularization techniques were applied to mitigate overfitting and enhance the generalizability of the model. This work advances herb classification techniques, preserving traditional botanical knowledge and promoting sustainable herb utilization.",
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
      "This proposed system provides a website called 'Safari Nepal', where users can search for destinations and check their location on a map. Users when registering on the website, can fill up the details about themselves and choose to either be a tour guide or a tourist. Based on the search and preferences of the user, similar destinations are recommended to the user via a recommendation system that uses a content-based recommendation feature. This feature works on the data obtained from the user, either explicitly or implicitly. The concept of K-Nearest Neighbours (KNN) and Cosine similarity makes the recommendation more accurate. KNN uses a distance algorithm that sorts from most liked destinations to least liked, based on the preferences of the user. This sorted list of destinations is further filtered by Cosine similarity, which is a measure of how similar two vectors in an inner product space are. It is calculated by taking the cosine of the angle between two vectors and determining whether two vectors are pointing towards the same general direction. Thus, combined KNN and Cosine similarity gives a better recommendation to the user. The map is integrated into the system using Mapbox API. Also, the system connects users with tour guides and gives them space to chat via a chatbox called ‘Travel Buddy’ where they can discuss further the destination, the amount charged by the guide, etc. The chatting feature on the system allows multiple users to connect and make conversations about the destination creating various chatrooms. In the system, the user can also publish their blogs describing their experiences and share their thoughts on particular destinations.",
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
