---
title: "Artificial Intelligence and Machine Learning"
term: "Spring 2026"
termStart: "2026-02"
institution: "Herald College Kathmandu (University of Wolverhampton)"
role: "Assistant Lecturer"
level: "Final-year undergraduate (BSc (Hons) Computer Science)"
courseCode: "6CS012"
credits: ""
students: 120
coInstructors: ""
format: "9 weeks · lecture, tutorial & workshop each week"
tags: ["Deep Learning", "Computer Vision", "NLP", "CNNs", "RNNs & LSTMs", "Autoencoders", "Transfer Learning"]
excerpt: "A nine-week deep learning course for final-year computer science students, building from linear algebra and logistic regression to CNNs, autoencoders, word embeddings and sequence-to-sequence models."
weeks:
  - week: 1
    title: "Linear Algebra and Derivatives for Deep Learning"
    summary: >
      A review of the mathematics the rest of the module leans on: vectors, matrices and
      their geometric intuitions, dot products, span, inverse and pseudo-inverse, rank,
      eigen-decomposition and tensors, then derivatives and gradients for finding minima
      and maxima. The workshop applied this directly by implementing PCA for image compression.
    topics: ["Vectors & matrices", "Eigen-decomposition", "Tensors", "Gradients", "PCA"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1XCXJyNd1dZRSgZptw2vZmcf-mshVOLht/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 2
    title: "Image Classification with Linear Classifiers"
    summary: >
      From rule-based expert systems to learning from data. Students framed supervised
      learning through Empirical Risk Minimization, derived logistic regression and its
      cross-entropy cost by hand, extended it to softmax for multi-class problems, and
      trained it with gradient descent on MNIST — then examined where a linear decision
      boundary breaks down.
    topics: ["ERM framework", "Logistic & softmax regression", "Gradient descent", "Bias–variance", "Confusion matrix & ROC"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1fHDq0Nje-NwQM7ikzEYgtTnCJfuH605f/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 3
    title: "Getting Started with Deep Learning and Neural Networks"
    summary: >
      Why hand-crafted features limit classical ML, and how neural networks grew out of
      connectionism. We traced the path from the McCulloch–Pitts neuron to the perceptron and
      its learning rule, realised logic gates with it, and used Minsky and Papert's XOR result
      to motivate multilayer networks. Students coded a perceptron on linearly and
      non-linearly separable data.
    topics: ["McCulloch–Pitts neuron", "Perceptron learning", "XOR problem", "Activation functions"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1cCW15w-D_Qfydcebl3Xab930vgWVKN9u/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 4
    title: "Multilayer Neural Networks"
    summary: >
      Building deep networks from perceptrons: universal approximation, why depth helps,
      loss functions and empirical risk, and backpropagation worked through on paper as
      forward and backward passes. Covered batch, stochastic and mini-batch gradient descent,
      then implemented an MLP in Keras to classify Devanagari handwritten digits.
    topics: ["Universal approximation", "Backpropagation", "SGD & mini-batch", "Keras", "Devanagari digits"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1bdJwASsDtp9esV32EWauinpK0eYvslYA/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 5
    title: "Introduction to Convolutional Neural Networks"
    summary: >
      Why fully connected networks struggle with images, and how convolution exploits
      spatial structure. Students computed convolutions, padding, stride and pooling output
      dimensions by hand, looked at feature maps and representation learning in deep CNNs,
      and built a CNN image classifier from scratch in Keras.
    topics: ["Convolution & feature maps", "Padding & stride", "Pooling", "Classic CNN architectures"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/14kiPTIvBCyzPy-TW_K4UP2WOd57ppOxl/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 6
    title: "Practical Aspects of Training Deep Neural Networks"
    summary: >
      The engineering side of deep learning: hold-out splits, bias versus variance, data
      augmentation, normalisation and batch norm, early stopping, L1/L2 regularisation,
      dropout, weight initialisation, and optimisers from momentum and RMSprop to Adam.
      A tour of AlexNet, VGG-16, GoogLeNet and ResNet led into transfer learning, freezing
      and fine-tuning pre-trained models. Assignment I (image classification) was released.
    topics: ["Regularisation & dropout", "Batch normalisation", "Adam & LR decay", "ResNet & VGG", "Transfer learning"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/17ijo5A0HvrWpBCG8SdnMOBnXnmbFPWQJ/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 7
    title: "Representation Learning with Autoencoders"
    summary: >
      Unsupervised learning through reconstruction. Students studied the encoder–decoder
      bottleneck, compared autoencoders with PCA, and worked through denoising, sparse,
      overcomplete and convolutional variants, including transposed convolutions. The
      workshop doubled as a revision and feedback session for Assignment I.
    topics: ["Encoder–decoder", "PCA vs. autoencoder", "Denoising & sparse AEs", "Transposed convolution"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1w5iDrkWfQrcD-DKg-uHQTlAvs72Jn_qm/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 8
    title: "Getting Started with NLP: Text Pre-processing and Representations"
    summary: >
      Why language is hard for machines — variation, sparsity and ambiguity at every
      linguistic level — and how to turn text into numbers. We moved from one-hot encoding
      and bag-of-words through TF-IDF and n-gram language models to distributional semantics
      and word2vec (CBOW and skip-gram). Students built a Naive Bayes text classifier and
      compared representations. Assignment II was released.
    topics: ["Tokenisation & normalisation", "Bag-of-words & TF-IDF", "N-gram LMs", "word2vec"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1hqhyfkYFx6v87oXqd2rbQnPoxlQouYW-/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
  - week: 9
    title: "RNNs and Sequence-to-Sequence Learning"
    summary: >
      Modelling sequences with recurrence: RNN state updates, unrolling in time,
      backpropagation through time and the vanishing gradient problem. LSTMs were introduced
      gate by gate, followed by bidirectional RNNs and encoder–decoder seq2seq models.
      Students built an LSTM-based machine translation model. Assignment III was released.
    topics: ["RNNs & BPTT", "Vanishing gradients", "LSTM gates", "Bidirectional RNNs", "Seq2seq translation"]
    materials:
      - label: "Slides"
        href: "https://docs.google.com/presentation/d/1Un96Wp87BTqx_Hkj1kf5Z56Ks9zbNocV/edit?usp=sharing&ouid=116754477205459735016&rtpof=true&sd=true"
---

## Course Description

The second course in the AI and Machine Learning sequence for final-year BSc (Hons)
Computer Science students, delivered as part of a module teaching team to a cohort of 120.
It builds from foundational machine learning into deep learning and its theoretical
underpinnings, with applications in computer vision and natural language processing, and
keeps returning to the linear algebra and optimisation that make modern architectures work.

Each week ran as a lecture, a tutorial and a workshop. Tutorials were largely pen-and-paper:
deriving gradients, computing convolutions and walking through backpropagation by hand.
Workshops turned the same ideas into code, with a worksheet submitted most weeks: PCA image
compression, softmax regression on MNIST, a perceptron from scratch, an MLP for Devanagari
handwritten digits, CNNs with transfer learning, Naive Bayes text classification and LSTM
machine translation.

## Learning Outcomes

By the end of the course, students can:

1. Explain the core challenges of machine learning: data quality, model selection, overfitting and model complexity.
2. Apply linear algebra, matrix operations and optimisation to understand and improve deep learning architectures.
3. Select an appropriate model (CNN, RNN, autoencoder, transformer) for a problem in vision or language, and implement it with a modern framework.
4. Design and tune models through preprocessing, regularisation and hyperparameter choices, and evaluate them with appropriate metrics.

## Assessment

Weekly worksheets, a mid-term quiz, and a final project portfolio made up of three
assignments (image classification, question answering and text classification), defended
in a final viva.
