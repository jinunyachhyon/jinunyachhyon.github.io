---
title: NLP Introduction and Preprocessings
categories: [Machine Learning, NLP]
tags: [NLP, python, machine_learning, preprocessing]
---

This is part-1 of the series on NLP.

# Introduction to NLP
Natural Language Processing (NLP) is a subfield of artificial intelligence (AI) that focuses on the interaction between computers and human language. It involves the development of algorithms and models that enable computers to understand, interpret, and generate human language text and speech. NLP plays a crucial role in various applications, including machine translation, chatbots, sentiment analysis, speech recognition, and text summarization, among others.

Difficulty:
Ambiguity (Prepositional Phrase - attachment problem; syntactic ambiguity)
Eg. “Stolen painting found by tree”
Here, “by tree” → prepositional phrase
Two interpretations:
By a tree, a stolen painting was found.
A tree found a stolen painting.

Lexical Ambiguity
Eg. “He’s at the bank.”
Two meanings:
River bank
Financial bank

Eg. She flew in last night.
Also two interpretations:
She came in by airplane.
She sprouted wings and flew in.

Beyond text (tones and gestures)
Eg. It’s hot in here.
It’s actually hot 
I dont want to be here with you

 

<math xmlns='http://www.w3.org/1998/Math/MathML'>
  <mi> P </mi>
  <mrow>
    <mo> ( </mo>
      <mi> A </mi>
      <mo> | </mo>
      <mi> B </mi>
    <mo> ) </mo>
  </mrow>
  <mo> = </mo>
  <mfrac>
    <mrow>
      <mi> P </mi>
      <mrow>
        <mo> ( </mo>
          <mi> A </mi>
        <mo> ) </mo>
      </mrow>
      <mo> &#x00B7; <!-- middle dot --> </mo>
      <mi> P </mi>
      <mrow>
        <mo> ( </mo>
          <mi> B </mi>
          <mo> | </mo>
          <mi> A </mi>
        <mo> ) </mo>
      </mrow>
    </mrow>
    <mrow>
      <mi> P </mi>
      <mrow>
        <mo> ( </mo>
          <mi> B </mi>
        <mo> ) </mo>
      </mrow>
    </mrow>
  </mfrac>
</math>



