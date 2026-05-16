---
title: "The Constant"
date: "May 16, 2026"
author: "Archie"
tags: ["AI", "LLM", "Fundamentals"]
excerpt: "Models get bigger, context windows grow, memory improves. But the underlying mechanics haven't changed. Understanding them is more useful than waiting for the next upgrade."
slug: "the-constant"
readTime: "6 min read"
---

Every few months there is a new announcement. Longer context windows. Improved memory. More recent knowledge cutoffs. Each one generates a wave of commentary declaring that some previous limitation has been solved.

It hasn't. Not really.

The surface capabilities improve, sometimes dramatically. But the underlying mechanics of how language models generate text have remained stable since the transformer architecture became dominant. The model predicts the next token based on statistical patterns. That is still what is happening, whether the context window is 4,000 tokens or 1 million.

This is not a criticism. It is a useful thing to understand. Because once you internalize what stays the same, you stop being surprised by the behavior of these models and start being able to work with them deliberately.

## Why context windows have limits

One of the most common questions I encounter is some version of: why can't I just paste everything in and let the model sort it out?

The answer has to do with how attention works. Every time a language model generates a response, it processes the entire conversation, every message, every prior response, all at once. It is not scanning or skimming. It is computing attention across all of the tokens in its context window for every single token it produces.

There is a point where the volume of information starts to degrade the quality of that attention. The model does not refuse to generate output. It keeps going. But the outputs begin to drift. They become less connected to the specific things you discussed earlier in the conversation. The model starts giving answers that are generically reasonable rather than specifically correct for your situation.

A useful analogy: you can hold a focused conversation about one topic for an hour and stay precise. Try holding five unrelated conversations in parallel for an entire day, and your answers will start bleeding into each other. You will mix up details, forget earlier points, lose threads. Language models experience a version of this, expressed through degraded attention patterns rather than human fatigue.

Context windows are not an arbitrary engineering limitation. They are a quality boundary. There is a range within which the model can genuinely attend to everything you have said, and beyond that range, the fidelity drops.

This has a practical consequence that most people overlook: session hygiene matters. Since the model reprocesses your full conversation for every new response, the relevance of your prior messages is doing real work. A long, unfocused conversation where half the messages are about topics you have moved past is actively degrading your results. When a session gets scattered, it is better to summarize the important points and start a new one. You are not losing context by doing this. You are concentrating it.

## Four components in tension

There is a framing I keep returning to, one I first encountered through Andrej Karpathy's deep dive into how language models work. Every LLM has four components that exist in tension with each other, and the quality of the model's output depends on how well they are balanced in any given interaction.

**Next token prediction** is the core mechanism. The model selects the most probable next token based on the full sequence preceding it. It is not reasoning in the way humans do. It is performing statistical inference over patterns absorbed during training. Everything else is built on top of this.

**Pretrained memory** is the knowledge baked into the model's weights during training. Karpathy describes this well: the knowledge stored in the parameters is like a vague recollection. Something you read weeks ago that you approximately remember but could not reproduce verbatim. It is broad but imprecise, and the model has no reliable way to distinguish what it remembers accurately from what it is reconstructing poorly.

**Working memory** is the context window, the current conversation. This is precise, immediate information the model has direct access to. The difference between pretrained memory and working memory is the difference between something you vaguely recall from a book you read last year and notes sitting open on your desk right now.

**Steerability** is the degree to which you can direct the model's behavior through prompts, system instructions, and conversation structure. It is the difference between the model doing what it statistically tends to do and the model doing what you specifically need.

These four components compete for the same finite resources, and when one dominates, the others suffer.

When pretrained memory and next token prediction dominate, the model gravitates toward the most statistically common response, even when your situation differs from the common case. This is how hallucinations happen on niche topics: the model has weak signal, so it pattern-matches against stronger signals from more common subjects, producing answers that sound plausible but do not correspond to reality.

When working memory is overloaded with too much context, steerability degrades. The model can no longer hold both your instructions and all of the information you have provided. It starts quietly ignoring constraints you set earlier in the conversation.

When you over-invest in steerability, loading the context with extensive system prompts and behavioral instructions, you consume working memory that the model could otherwise use to reason about your actual question. There is a real tradeoff between telling the model how to behave and giving it room to think.

## The confidence gap between common and rare

There is a pattern worth paying attention to. Ask a model something that millions of people have asked before. "How do closures work in JavaScript?" or "Explain the difference between TCP and UDP." The response arrives quickly. It is well-structured, precise, confident. The next token prediction is operating on dense territory, many similar passages in the training data, strong statistical signal.

Now ask something that appears rarely in the training corpus. A question about an obscure library. A debugging scenario with an unusual stack trace. A topic from a specialized domain with limited written material.

The model still responds. It still sounds authoritative, same tone, same cadence. But if you have domain knowledge, you can feel the difference. The specificity fades. The claims become harder to verify. There is a subtle fabrication happening, the model filling gaps with plausible-sounding content because the statistical signal is too weak to produce anything precise.

This is not a flaw in the current generation of models that will be fixed in the next one. It is a direct consequence of how next token prediction works. The model's confidence tracks data density, not truth. It has no internal metric for "I am uncertain about this." It simply has stronger or weaker patterns, and it generates text from whatever patterns it has.

The practical takeaway is straightforward. For well-documented, commonly discussed problems, the output is generally reliable. Verify lightly. For niche, unusual, or highly specific questions, treat every claim as a hypothesis. Cross-reference against primary sources. Test the suggestions before trusting them. The model's confident tone is not a signal of accuracy when the underlying data is sparse.

## What changes and what does not

Context windows will continue growing. Memory architectures will become more sophisticated. Knowledge cutoffs will stay more current. Retrieval augmentation and fine-tuning will keep improving.

None of these changes alter the fundamental mechanic: a model predicting the next token based on statistical patterns, navigating the tension between what it absorbed during training and what you have provided in this conversation.

The people I have seen get the most out of these tools are not the ones waiting for the next model release to solve their problems. They are the ones who understand the machinery well enough to work with its grain. They keep their context clean and relevant. They steer with intention rather than hoping the model will figure out what they want. They grow skeptical when the topic is rare and the model sounds too confident.

The models will keep improving. But they will keep improving at the same underlying game. The rules have not changed. I do not think they will change for a while.

That is the constant.
