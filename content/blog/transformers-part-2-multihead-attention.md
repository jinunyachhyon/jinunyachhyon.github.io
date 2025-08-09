---
title: "Understanding Transformers: Part 2 - Multi-Head Attention and Self-Attention"
date: "2023-11-08"
tags: ["Transformers", "Deep Learning", "NLP", "Attention"]
author: "Jinu Nyachhyon"
excerpt: "Second part of our Transformers series, diving deep into multi-head attention and self-attention mechanisms."
series:
  name: "Understanding Transformers"
  part: 2
  description: "A comprehensive deep-dive into Transformer architecture and its applications"
---

# Understanding Transformers: Part 2 - Multi-Head Attention and Self-Attention

Welcome back to our Transformers series! In [Part 1](/blog/transformers-part-1-attention), we explored the fundamental attention mechanism. Now, let's dive deeper into multi-head attention and self-attention - the key innovations that make Transformers so powerful.

## Recap: The Attention Foundation

In our previous post, we learned that attention allows models to:
- Process sequences in parallel
- Capture long-range dependencies
- Focus on relevant information dynamically

Now we'll see how Transformers extend this concept to capture multiple types of relationships simultaneously.

## Multi-Head Attention

### The Core Idea

Instead of using a single attention mechanism, Transformers use multiple "attention heads" in parallel. Each head can focus on different types of relationships:

- **Head 1**: Might focus on syntactic relationships (subject-verb)
- **Head 2**: Might capture semantic similarities
- **Head 3**: Might attend to positional patterns
- **Head 4**: Might focus on long-range dependencies

### Mathematical Formulation

Multi-head attention works by:

1. **Linear Projections**: Transform input into multiple Q, K, V representations
2. **Parallel Attention**: Apply attention mechanism to each head
3. **Concatenation**: Combine outputs from all heads
4. **Final Projection**: Transform concatenated result

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h)W^O$$

Where each head is:
$$\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

### Why Multiple Heads?

Different heads can specialize in different aspects:

- **Linguistic relationships**: Grammar, syntax, semantics
- **Positional patterns**: Local vs. global dependencies
- **Content types**: Entities, actions, modifiers
- **Abstraction levels**: Surface form vs. meaning

## Self-Attention: The Game Changer

### What is Self-Attention?

Self-attention is when the queries, keys, and values all come from the same sequence. This allows each position to attend to all positions in the same sequence, including itself.

### Why Self-Attention Matters

1. **Context Understanding**: Each word can see the entire sentence context
2. **Relationship Modeling**: Captures dependencies between any two words
3. **Parallel Processing**: All relationships computed simultaneously
4. **Dynamic Weighting**: Attention changes based on context

### Self-Attention in Action

Consider the sentence: "The animal didn't cross the street because it was too tired."

Self-attention helps the model understand that "it" refers to "animal" by:
1. Computing attention scores between "it" and all other words
2. Finding high similarity with "animal"
3. Using this information for better representation

## Positional Encoding

### The Position Problem

Since attention doesn't inherently understand order, we need to inject positional information. Transformers use positional encoding to give the model a sense of sequence order.

### Sinusoidal Positional Encoding

The original Transformer uses sinusoidal functions:

$$PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d_{model}})$$
$$PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i/d_{model}})$$

This encoding has nice properties:
- Unique encoding for each position
- Relative position information
- Extrapolation to longer sequences

## Implementation Deep Dive

Here's a more complete implementation of multi-head self-attention:

```python
import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        # Linear projections for Q, K, V
        self.w_q = nn.Linear(d_model, d_model)
        self.w_k = nn.Linear(d_model, d_model)
        self.w_v = nn.Linear(d_model, d_model)
        self.w_o = nn.Linear(d_model, d_model)
        
    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)
        
        # Linear projections and reshape for multi-head
        Q = self.w_q(query).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.w_k(key).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.w_v(value).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Apply attention
        attention_output, attention_weights = self.attention(Q, K, V, mask)
        
        # Concatenate heads
        attention_output = attention_output.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )
        
        # Final linear projection
        output = self.w_o(attention_output)
        
        return output, attention_weights
    
    def attention(self, Q, K, V, mask=None):
        d_k = Q.size(-1)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        
        attention_weights = torch.softmax(scores, dim=-1)
        output = torch.matmul(attention_weights, V)
        
        return output, attention_weights
```

## Attention Patterns in Practice

Research has shown that different attention heads learn different patterns:

### Syntactic Heads
- Focus on grammatical relationships
- Subject-verb, verb-object connections
- Dependency parsing-like patterns

### Semantic Heads
- Attend to semantically similar words
- Coreference resolution (pronouns to entities)
- Thematic role assignment

### Positional Heads
- Focus on relative positions
- Local vs. global attention patterns
- Sequential dependencies

## Computational Complexity

### Time Complexity
- Self-attention: O(n²d) where n is sequence length, d is model dimension
- This quadratic scaling is the main limitation for very long sequences

### Memory Complexity
- Attention matrix: O(n²) memory for each head
- Total: O(h × n²) where h is number of heads

### Optimization Strategies
- **Sparse attention**: Only attend to subset of positions
- **Linear attention**: Approximate attention with linear complexity
- **Sliding window**: Local attention patterns

## What's Next?

In Part 3, we'll put everything together to understand the complete Transformer architecture:

- Encoder and decoder stacks
- Layer normalization and residual connections
- Feed-forward networks
- How all components work together

We'll also explore different Transformer variants and their specific use cases.

## Key Takeaways

1. **Multi-head attention** allows capturing multiple types of relationships simultaneously
2. **Self-attention** enables rich context understanding within sequences
3. **Positional encoding** provides sequence order information
4. **Different heads specialize** in different linguistic and semantic patterns
5. **Quadratic complexity** is the main computational challenge

Understanding multi-head self-attention is crucial for grasping how Transformers achieve their remarkable performance across various tasks.


