---
title: "Understanding Transformers: Part 3 - The Complete Architecture"
date: "2023-11-15"
tags: ["Transformers", "Deep Learning", "NLP", "Architecture"]
author: "Jinu Nyachhyon"
excerpt: "Third part of our Transformers series, exploring the complete architecture including encoders, decoders, and all the components working together."
series:
  name: "Understanding Transformers"
  part: 3
  description: "A comprehensive deep-dive into Transformer architecture and its applications"
---

# Understanding Transformers: Part 3 - The Complete Architecture

Welcome to Part 3 of our Transformers series! We've covered the [attention mechanism](/blog/transformers-part-1-attention) and [multi-head self-attention](/blog/transformers-part-2-multihead-attention). Now let's see how all the pieces fit together in the complete Transformer architecture.

## The Big Picture

The original Transformer consists of two main components:
1. **Encoder**: Processes the input sequence
2. **Decoder**: Generates the output sequence

Each component is built from stacked layers, and each layer contains multiple sub-components working together.

## Encoder Architecture

### Encoder Layer Components

Each encoder layer contains:
1. **Multi-Head Self-Attention**
2. **Position-wise Feed-Forward Network**
3. **Residual Connections**
4. **Layer Normalization**

### The Flow Through an Encoder Layer

1. **Input**: Token embeddings + positional encoding
2. **Self-Attention**: Multi-head self-attention mechanism
3. **Add & Norm**: Residual connection + layer normalization
4. **Feed-Forward**: Position-wise feed-forward network
5. **Add & Norm**: Another residual connection + layer normalization
6. **Output**: Enhanced representations

### Position-wise Feed-Forward Network

Each position gets processed independently through:
- Linear transformation
- ReLU activation
- Another linear transformation

$$\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2$$

This adds non-linearity and allows the model to process information at each position.

## Decoder Architecture

### Decoder Layer Components

Each decoder layer contains:
1. **Masked Multi-Head Self-Attention**
2. **Multi-Head Cross-Attention** (encoder-decoder attention)
3. **Position-wise Feed-Forward Network**
4. **Residual Connections and Layer Normalization**

### Masked Self-Attention

The decoder uses **masked self-attention** to prevent positions from attending to subsequent positions. This maintains the autoregressive property needed for generation.

### Cross-Attention

Cross-attention allows the decoder to attend to the encoder's output:
- **Queries**: Come from the decoder
- **Keys and Values**: Come from the encoder
- This enables the decoder to access input information while generating

## Key Architectural Components

### 1. Residual Connections

Residual connections help with:
- **Gradient flow**: Prevents vanishing gradients in deep networks
- **Training stability**: Makes optimization easier
- **Information preservation**: Allows information to flow directly

$$\text{output} = \text{LayerNorm}(x + \text{Sublayer}(x))$$

### 2. Layer Normalization

Applied after each sub-layer:
- Normalizes activations across the feature dimension
- Stabilizes training
- Reduces internal covariate shift

### 3. Positional Encoding

Added to input embeddings to provide position information:
- Sinusoidal encoding in the original paper
- Learned positional embeddings in many implementations
- Relative positional encoding in some variants

## The Complete Data Flow

### Training (Teacher Forcing)

1. **Input Processing**:
   - Tokenize input and target sequences
   - Add positional encoding
   - Apply dropout

2. **Encoder Processing**:
   - Process input through encoder stack
   - Generate contextualized representations

3. **Decoder Processing**:
   - Process target sequence (shifted right)
   - Use masked self-attention
   - Apply cross-attention to encoder output
   - Generate predictions

4. **Loss Calculation**:
   - Compare predictions with target
   - Compute cross-entropy loss
   - Backpropagate gradients

### Inference (Autoregressive Generation)

1. **Encoder**: Process input sequence once
2. **Decoder**: Generate tokens one by one
   - Start with special start token
   - Use previously generated tokens as input
   - Apply beam search or sampling for generation

## Implementation Example

Here's a simplified Transformer implementation:

```python
import torch
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, num_heads)
        self.feed_forward = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.ReLU(),
            nn.Linear(d_ff, d_model)
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x, mask=None):
        # Self-attention with residual connection
        attn_output, _ = self.attention(x, x, x, mask)
        x = self.norm1(x + self.dropout(attn_output))
        
        # Feed-forward with residual connection
        ff_output = self.feed_forward(x)
        x = self.norm2(x + self.dropout(ff_output))
        
        return x

class Transformer(nn.Module):
    def __init__(self, vocab_size, d_model, num_heads, num_layers, d_ff, max_seq_len):
        super().__init__()
        self.d_model = d_model
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.pos_encoding = PositionalEncoding(d_model, max_seq_len)
        
        self.encoder_layers = nn.ModuleList([
            TransformerBlock(d_model, num_heads, d_ff)
            for _ in range(num_layers)
        ])
        
        self.output_projection = nn.Linear(d_model, vocab_size)
    
    def forward(self, x, mask=None):
        # Embedding and positional encoding
        x = self.embedding(x) * math.sqrt(self.d_model)
        x = self.pos_encoding(x)
        
        # Pass through encoder layers
        for layer in self.encoder_layers:
            x = layer(x, mask)
        
        # Output projection
        return self.output_projection(x)
```

## Transformer Variants

### Encoder-Only Models
- **BERT**: Bidirectional encoder for understanding tasks
- **RoBERTa**: Optimized BERT training
- **DeBERTa**: Enhanced position encoding

### Decoder-Only Models
- **GPT**: Autoregressive generation
- **GPT-2/3/4**: Scaled-up versions
- **PaLM**: Pathways Language Model

### Encoder-Decoder Models
- **T5**: Text-to-Text Transfer Transformer
- **BART**: Denoising autoencoder
- **mT5**: Multilingual T5

## Design Choices and Trade-offs

### Model Size
- **Parameters**: More parameters → better performance but higher cost
- **Layers**: Deeper models can capture more complex patterns
- **Hidden size**: Wider models have more representational capacity

### Attention Heads
- **Number of heads**: More heads → more diverse attention patterns
- **Head size**: Larger heads → more capacity per head
- **Trade-off**: Total parameters remain constant

### Sequence Length
- **Quadratic complexity**: Longer sequences → quadratically more computation
- **Memory requirements**: Attention matrices grow quadratically
- **Solutions**: Sparse attention, linear attention, hierarchical models

## What's Next?

In Part 4, we'll explore:
- Training techniques and optimization
- Pre-training strategies
- Fine-tuning approaches
- Common training challenges and solutions

We'll also discuss practical considerations for training Transformers effectively.

## Key Takeaways

1. **Modular design**: Transformers are built from reusable components
2. **Residual connections**: Essential for training deep networks
3. **Layer normalization**: Stabilizes training and improves convergence
4. **Encoder-decoder structure**: Flexible for various tasks
5. **Autoregressive generation**: Enables text generation capabilities

The complete Transformer architecture elegantly combines all these components to create a powerful and flexible model that has revolutionized natural language processing and beyond.
