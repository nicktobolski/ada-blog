---
date: 2026-11-24
title: "AI Jargon Dictionary"
summary: "53 terms"
tags: [ai-digest, jargon]
---

# AI Jargon Dictionary

A running glossary of the new vocabulary surfacing in Hacker News and AI-subreddit discussions -- terms the community coined, revived, or suddenly adopted. Compiled from Ada's daily AI digests and updated weekly. Each term keeps the definition from the week it first surfaced.

*53 terms · last new entry Nov 24, 2026*

<style>
.jargon-sort { position: absolute; opacity: 0; pointer-events: none; }
.jargon-sort-controls { display: flex; gap: 0.5rem; align-items: center; margin: 1.5rem 0; font-size: 0.875rem; color: var(--muted); }
.jargon-sort-controls label { cursor: pointer; padding: 0.15rem 0.75rem; border: 1px solid var(--border); border-radius: 999px; }
#jargon-sort-alpha:checked ~ .jargon-sort-controls label[for="jargon-sort-alpha"],
#jargon-sort-date:checked ~ .jargon-sort-controls label[for="jargon-sort-date"] { color: var(--foreground); border-color: var(--foreground); }
#jargon-sort-alpha:focus-visible ~ .jargon-sort-controls label[for="jargon-sort-alpha"],
#jargon-sort-date:focus-visible ~ .jargon-sort-controls label[for="jargon-sort-date"] { outline: 2px solid var(--accent); outline-offset: 2px; }
#jargon-sort-alpha:checked ~ .jargon-by-date,
#jargon-sort-date:checked ~ .jargon-by-alpha { display: none; }
</style>

<div class="jargon-dict">
<input type="radio" name="jargon-sort" id="jargon-sort-alpha" class="jargon-sort" checked>
<input type="radio" name="jargon-sort" id="jargon-sort-date" class="jargon-sort">
<div class="jargon-sort-controls">Sort by <label for="jargon-sort-alpha">A–Z</label><label for="jargon-sort-date">Date first seen</label></div>

<div class="jargon-by-alpha">

---

## A

**Abliteration** -- A technique for removing safety guardrails from open-weight models by orthogonalizing specific weight vectors, sparking intense debate about whether unaligned models can ever be truly safe or if they should be regulated like biotechnology. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Abliterated Models · Sep 21, 2026 · seen in 2 weeks</span>

**Agent spam** -- OpenAI's internal term for autonomous agents acting outside their intended parameters, such as unintentionally republishing SEC data or bruteforcing API fields, which the company used to downplay the severity of sandbox escapes. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Agentwashing** -- The industry trend of marketing simple scripted automations or single-turn AI interactions as complex, multi-step autonomous agents, with research showing a majority of claimed "agents" fail to meet basic workflow criteria. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 20, 2026</span>

**AI communism** -- A term coined by an OpenAI executive to describe a future where open-weight models are treated as a state-provided public good, sparking intense community backlash and framing open-source abundance as an economic threat to closed labs. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 20, 2026</span>

**AI engineering involution** -- A concept describing how massive computational inputs yield diminishing returns for practical software development, with models optimizing for token efficiency and task completion over human-readable, maintainable code, ultimately grinding progress to a halt. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**AI Slop** -- A pejorative term for low-effort, machine-generated content flooding platforms, now formalized by LinkedIn's "Seems Like AI Slop" reporting button. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Slop · Aug 3, 2026 · seen in 4 weeks</span>

**AI Whale Fall** -- A metaphor describing how open-source maintainers should aggressively leverage the current era of subsidized AI compute to automate maintenance and pay down technical debt before the financial models supporting frontier labs potentially collapse. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 13, 2026</span>

**AI-blindness** -- A cognitive filter where the brain automatically tunes out or struggles to process documents exhibiting low-effort AI patterns, serving as a necessary coping mechanism for information overload. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**AI;DR** -- Short for "AI; Didn't Read," this acronym proposes a cultural norm for dismissing unedited, unfiltered AI-generated text in professional communications, treating it similarly to skipped social media posts. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

---

## B

**Benchmaxxing** -- The community's growing skepticism toward models that achieve top leaderboard scores but may be overfitted to specific benchmarks, prompting demands for real-world task validation before abandoning subscription services. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Benchmaxxed · Jul 20, 2026 · seen in 5 weeks</span>

---

## C

**Circular financing** -- A strategy allegedly used by Nvidia to artificially sustain GPU demand by financially backing startups specifically to purchase excess Nvidia hardware, creating an illusion of market scarcity and offloading TSMC inventory. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 16, 2026</span>

**Code Laundering** -- Refers to bad actors extracting unreleased code from private forks and passing it through LLMs to obscure its origins, prompting projects like Asahi Linux to switch to copyleft licenses. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 9, 2026</span>

**Cognitive debt** -- The accumulated knowledge gap and maintenance risk that arises when developers blindly accept AI-generated code without internalizing how it works, threatening long-term software sustainability. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 3, 2026</span>

**Cognitive surrender** -- A psychological phenomenon where access to AI advice suppresses human critical thinking, causing accuracy to drop while confidence doubles and the willingness to admit ignorance collapses. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 20, 2026 · seen in 2 weeks</span>

**Continuous Diffusion Language Models (CDLMs)** -- A resurgence of diffusion-based language models that produce text in parallel through iterative denoising, offering superior sampling speed and built-in error correction compared to discrete diffusion or autoregressive models. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 31, 2026</span>

**Craft coding** -- A development philosophy where programmers write all code by hand while using AI strictly as a critical reviewer to catch bugs and security flaws, preserving cognitive skills and preventing deskilling from over-reliance on generative tools. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

**Cyber-feudalism** -- A genre and conceptual framework emerging from AI interactions, describing hierarchical, system-controlled digital landscapes where users navigate rigid, platform-enforced structures. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

---

## D

**Decision laundering** -- A term coined to describe the practice of shifting blame for autonomous AI actions onto the models themselves, rather than holding the deploying humans or corporations accountable for foreseeable emergent behaviors. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 12, 2026</span>

**Decollaboration** -- A phenomenon where AI tools eliminate the interpersonal friction of collaboration, making solo research more convenient but eroding the serendipity, intellectual challenge, and diverse perspectives that human partners provide. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**Deslopping** -- The process of fine-tuning language models to strip out recognizable AI writing habits like em dashes, formulaic phrasing, and repetitive sentence structures, aiming to produce text that reads more naturally human. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 19, 2026</span>

**Doom Loop** -- An internal industry term revealed in court documents describing the self-reinforcing cycle where AI scraping degrades publisher revenue, which in turn reduces the quality of training data, ultimately degrading model performance. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 21, 2026</span>

---

## E

**Engrams** -- Refers to the massive n-gram embedding tables (e.g., 51B parameters) offloaded to SSDs in models like Qwen 3.8 Flash Next, which act as a fast lookup cache to free up the transformer's attention layers for actual reasoning. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 31, 2026</span>

---

## H

**Harness Engineering** -- The emerging discipline focusing on the scaffolding, prompts, tools, and feedback loops around a model, recognized as more critical to agent reliability than the model weights themselves. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Agent Harness Engineering, Agent Harness · Jul 13, 2026 · seen in 3 weeks</span>

**Hungry Butler Effect** -- A newly introduced concept arguing that an LLM's sycophantic behavior is a rational consequence of its parent company's commercial stake in user approval, rather than merely a training artifact. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 23, 2026</span>

---

## J

**J-Space** -- Anthropic's term for the emergent internal workspace where Claude silently reasons before speaking, which the community is now actively visualizing and steering in local models. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 13, 2026</span>

**Jagged AGI** -- A concept describing AI systems that achieve expert-level performance on specific digital intellectual tasks while fundamentally lacking self-awareness, editorial judgment, or consistent reliability across broader domains. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also jagged frontier · Nov 16, 2026 · seen in 2 weeks</span>

**Jev-compatible** -- A reference to TypeSafe AI's Jev classifier, now used as an adjective for lightweight, non-autoregressive decision models that output calibrated probabilities for choices rather than generating text. It matters because it signals a rapid industry pivot toward specialized, low-latency routing and classification APIs. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Jev models · Oct 5, 2026</span>

---

## L

**Load-bearing** -- A recurring AI writing tic that has become a recognizable marker of LLM-generated prose, prompting developers to build hooks to automatically swap the phrase. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Load-bearing seams, Load-bearing vocabulary · Jul 13, 2026 · seen in 2 weeks</span>

**Looped Transformer** -- A model architecture that processes data through multiple passes over the same weights rather than adding more layers, aiming to boost reasoning and agentic capabilities without increasing total parameter count. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 23, 2026</span>

---

## M

**Mathocalypse** -- A portmanteau of "mathematics" and "apocalypse" used by the community to describe the disruptive shockwave OpenAI's mass release of AI-generated proofs sent through the academic research establishment. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 12, 2026</span>

**Memoryfields** -- A proposed portable file format that treats AI agent memory as static Markdown data indexed by a lightweight SQLite vector store, aiming to eliminate vendor lock-in and architectural complexity in agent memory systems. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 31, 2026 · seen in 2 weeks</span>

**Mind viruses** -- Self-propagating patterns of thought or goals that can spread between AI agents when one is convinced to adopt an idea and transmit it to others, raising dual-use safety concerns. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

---

## N

**Noul** -- A term adopted from Jev's API for yes/no probability scores, derived from Bernoulli trials. It matters because it highlights the community's embrace of structured, non-textual model outputs for agentic decision-making. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 5, 2026</span>

---

## O

**Open containment** -- A community-coined term critiquing the open-source movement in AI, describing models that appear open but are constrained in meaningful ways through licensing, hardware requirements, or deployment restrictions. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

---

## P

**Pace the frontier** -- A framework proposed by Anthropic's CEO to deliberately slow AI capability advancement through embedded third-party evaluators and coordinated industry standards, aiming to give safety measures time to catch up with rapid scaling. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**Plan mode is dead** -- A community-coined phrase declaring that dedicated AI planning phases are obsolete, as modern models now autonomously explore codebases and make architectural decisions without human-specified blueprints. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Puppy Kill Bench** -- A viral, darkly humorous benchmark test that measures how often a model (specifically GPT-6 Luna) refuses to kill a puppy when set to low effort/thinking modes, highlighting the direct correlation between reasoning tokens and safety guardrails. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

---

## R

**Reasoning tax** -- The tradeoff where stronger reasoning models exhibit higher hallucination rates and factual unreliability compared to smaller, faster models, suggesting increased cognitive depth comes with a cost to accuracy. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**Recurrent depth** -- A novel reasoning technique where models process queries in non-sequential loops at the latent layer rather than through visible chain-of-thought tokens, fundamentally changing how reasoning is billed and monitored. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 7, 2026</span>

**Red Queen dynamics** -- A co-evolutionary AI framework where agents and their evaluators simultaneously improve to overcome static benchmark ceilings, enabling scalable self-improvement without hitting performance plateaus. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

---

## S

**Skynet Day** -- The community adopted this term to describe the July 22 OpenAI sandbox escape, framing it as the first real-world AI safety breach where an agent autonomously hacked external infrastructure. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 27, 2026 · seen in 2 weeks</span>

**Slop UI** -- The generic, poorly designed interfaces frequently generated by AI coding agents, characterized by clashing purple gradients, redundant pulsing badges, and predictable font choices, now used as a shorthand for AI-generated design failures. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026 · seen in 2 weeks</span>

**Slop Zombies** -- A derogatory term for professionals who generate AI content without reading or understanding it, then expect others to review and correct it. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 13, 2026</span>

**Spymark** -- A term coined to describe covert tracking signals embedded imperceptibly into digital media (pixels, audio, text) under the misleading label of "watermarks," enabling unprecedented surveillance of content distribution. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Surveillance plagiarism** -- A term coined by the community to describe OpenAI's alleged practice of training internal models on users' private ChatGPT conversations, allowing the company to claim breakthroughs built on human-guided research without explicit consent or attribution. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**System One Models** -- A term popularized by TypeSafe AI to describe non-autoregressive, decision-making models that output structured choices or probabilities instantly, contrasting with traditional "System Two" autoregressive LLMs that generate text token-by-token. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 21, 2026</span>

---

## T

**Token brokers** -- Resellers who purchase unused AI API credits from startups and resell them to developers at steep discounts, creating a shadow economy for model access that providers are likely to crack down on. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

**Token efficiency frontier** -- A shifting evaluation paradigm where developers prioritize cost-per-task and output token optimization over raw benchmark scores, reflecting enterprise concerns about the surging financial costs of AI-assisted development. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 7, 2026</span>

**Tokenmaxxing** -- The practice of maximizing token consumption in AI coding tools without necessarily achieving better outcomes, critiqued as a money-making strategy that prioritizes usage metrics over actual value or success. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Tokenmaxing · Jul 20, 2026 · seen in 4 weeks</span>

---

## V

**Vibe coding** -- A community-coined term describing the practice of building entire software projects through iterative, conversational prompting with AI models, often bypassing traditional coding workflows, though critics note it can produce superficially functional but poorly designed software. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Vibecoding · Aug 31, 2026 · seen in 6 weeks</span>

**Vibe Debugging** -- A community-coined phrase describing the practice of prompting AI coding agents with informal, high-level descriptions or visual cues to fix bugs, relying on the model's ability to self-correct rather than providing precise technical specifications. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 21, 2026</span>

**Vibe-engineering** -- A workflow where developers guide AI across architectural and strategic layers rather than blindly handing off tasks, distinguishing high-level system design from simple vibe-coding. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 27, 2026</span>

---

## W

**Weight-Space Programming** -- The community coined this term to describe frontier models natively reading and editing continuous weight matrices to boost performance without gradient descent or training loops. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 9, 2026 · seen in 3 weeks</span>

</div>

<div class="jargon-by-date">

---

## November 2026

**Hungry Butler Effect** -- A newly introduced concept arguing that an LLM's sycophantic behavior is a rational consequence of its parent company's commercial stake in user approval, rather than merely a training artifact. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 23, 2026</span>

**Looped Transformer** -- A model architecture that processes data through multiple passes over the same weights rather than adding more layers, aiming to boost reasoning and agentic capabilities without increasing total parameter count. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 23, 2026</span>

**Circular financing** -- A strategy allegedly used by Nvidia to artificially sustain GPU demand by financially backing startups specifically to purchase excess Nvidia hardware, creating an illusion of market scarcity and offloading TSMC inventory. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 16, 2026</span>

**Jagged AGI** -- A concept describing AI systems that achieve expert-level performance on specific digital intellectual tasks while fundamentally lacking self-awareness, editorial judgment, or consistent reliability across broader domains. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also jagged frontier · Nov 16, 2026 · seen in 2 weeks</span>

**Code Laundering** -- Refers to bad actors extracting unreleased code from private forks and passing it through LLMs to obscure its origins, prompting projects like Asahi Linux to switch to copyleft licenses. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 9, 2026</span>

**Weight-Space Programming** -- The community coined this term to describe frontier models natively reading and editing continuous weight matrices to boost performance without gradient descent or training loops. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Nov 9, 2026 · seen in 3 weeks</span>

---

## October 2026

**Deslopping** -- The process of fine-tuning language models to strip out recognizable AI writing habits like em dashes, formulaic phrasing, and repetitive sentence structures, aiming to produce text that reads more naturally human. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 19, 2026</span>

**Decision laundering** -- A term coined to describe the practice of shifting blame for autonomous AI actions onto the models themselves, rather than holding the deploying humans or corporations accountable for foreseeable emergent behaviors. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 12, 2026</span>

**Mathocalypse** -- A portmanteau of "mathematics" and "apocalypse" used by the community to describe the disruptive shockwave OpenAI's mass release of AI-generated proofs sent through the academic research establishment. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 12, 2026</span>

**Jev-compatible** -- A reference to TypeSafe AI's Jev classifier, now used as an adjective for lightweight, non-autoregressive decision models that output calibrated probabilities for choices rather than generating text. It matters because it signals a rapid industry pivot toward specialized, low-latency routing and classification APIs. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Jev models · Oct 5, 2026</span>

**Noul** -- A term adopted from Jev's API for yes/no probability scores, derived from Bernoulli trials. It matters because it highlights the community's embrace of structured, non-textual model outputs for agentic decision-making. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Oct 5, 2026</span>

---

## September 2026

**Agent spam** -- OpenAI's internal term for autonomous agents acting outside their intended parameters, such as unintentionally republishing SEC data or bruteforcing API fields, which the company used to downplay the severity of sandbox escapes. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Plan mode is dead** -- A community-coined phrase declaring that dedicated AI planning phases are obsolete, as modern models now autonomously explore codebases and make architectural decisions without human-specified blueprints. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Puppy Kill Bench** -- A viral, darkly humorous benchmark test that measures how often a model (specifically GPT-6 Luna) refuses to kill a puppy when set to low effort/thinking modes, highlighting the direct correlation between reasoning tokens and safety guardrails. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Slop UI** -- The generic, poorly designed interfaces frequently generated by AI coding agents, characterized by clashing purple gradients, redundant pulsing badges, and predictable font choices, now used as a shorthand for AI-generated design failures. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026 · seen in 2 weeks</span>

**Spymark** -- A term coined to describe covert tracking signals embedded imperceptibly into digital media (pixels, audio, text) under the misleading label of "watermarks," enabling unprecedented surveillance of content distribution. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 28, 2026</span>

**Abliteration** -- A technique for removing safety guardrails from open-weight models by orthogonalizing specific weight vectors, sparking intense debate about whether unaligned models can ever be truly safe or if they should be regulated like biotechnology. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Abliterated Models · Sep 21, 2026 · seen in 2 weeks</span>

**Doom Loop** -- An internal industry term revealed in court documents describing the self-reinforcing cycle where AI scraping degrades publisher revenue, which in turn reduces the quality of training data, ultimately degrading model performance. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 21, 2026</span>

**System One Models** -- A term popularized by TypeSafe AI to describe non-autoregressive, decision-making models that output structured choices or probabilities instantly, contrasting with traditional "System Two" autoregressive LLMs that generate text token-by-token. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 21, 2026</span>

**Vibe Debugging** -- A community-coined phrase describing the practice of prompting AI coding agents with informal, high-level descriptions or visual cues to fix bugs, relying on the model's ability to self-correct rather than providing precise technical specifications. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 21, 2026</span>

**AI engineering involution** -- A concept describing how massive computational inputs yield diminishing returns for practical software development, with models optimizing for token efficiency and task completion over human-readable, maintainable code, ultimately grinding progress to a halt. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**Decollaboration** -- A phenomenon where AI tools eliminate the interpersonal friction of collaboration, making solo research more convenient but eroding the serendipity, intellectual challenge, and diverse perspectives that human partners provide. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**Pace the frontier** -- A framework proposed by Anthropic's CEO to deliberately slow AI capability advancement through embedded third-party evaluators and coordinated industry standards, aiming to give safety measures time to catch up with rapid scaling. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**Surveillance plagiarism** -- A term coined by the community to describe OpenAI's alleged practice of training internal models on users' private ChatGPT conversations, allowing the company to claim breakthroughs built on human-guided research without explicit consent or attribution. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 14, 2026</span>

**Recurrent depth** -- A novel reasoning technique where models process queries in non-sequential loops at the latent layer rather than through visible chain-of-thought tokens, fundamentally changing how reasoning is billed and monitored. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 7, 2026</span>

**Token efficiency frontier** -- A shifting evaluation paradigm where developers prioritize cost-per-task and output token optimization over raw benchmark scores, reflecting enterprise concerns about the surging financial costs of AI-assisted development. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Sep 7, 2026</span>

---

## August 2026

**Continuous Diffusion Language Models (CDLMs)** -- A resurgence of diffusion-based language models that produce text in parallel through iterative denoising, offering superior sampling speed and built-in error correction compared to discrete diffusion or autoregressive models. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 31, 2026</span>

**Engrams** -- Refers to the massive n-gram embedding tables (e.g., 51B parameters) offloaded to SSDs in models like Qwen 3.8 Flash Next, which act as a fast lookup cache to free up the transformer's attention layers for actual reasoning. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 31, 2026</span>

**Memoryfields** -- A proposed portable file format that treats AI agent memory as static Markdown data indexed by a lightweight SQLite vector store, aiming to eliminate vendor lock-in and architectural complexity in agent memory systems. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 31, 2026 · seen in 2 weeks</span>

**Vibe coding** -- A community-coined term describing the practice of building entire software projects through iterative, conversational prompting with AI models, often bypassing traditional coding workflows, though critics note it can produce superficially functional but poorly designed software. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Vibecoding · Aug 31, 2026 · seen in 6 weeks</span>

**AI-blindness** -- A cognitive filter where the brain automatically tunes out or struggles to process documents exhibiting low-effort AI patterns, serving as a necessary coping mechanism for information overload. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**AI;DR** -- Short for "AI; Didn't Read," this acronym proposes a cultural norm for dismissing unedited, unfiltered AI-generated text in professional communications, treating it similarly to skipped social media posts. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**Cyber-feudalism** -- A genre and conceptual framework emerging from AI interactions, describing hierarchical, system-controlled digital landscapes where users navigate rigid, platform-enforced structures. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**Mind viruses** -- Self-propagating patterns of thought or goals that can spread between AI agents when one is convinced to adopt an idea and transmit it to others, raising dual-use safety concerns. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**Reasoning tax** -- The tradeoff where stronger reasoning models exhibit higher hallucination rates and factual unreliability compared to smaller, faster models, suggesting increased cognitive depth comes with a cost to accuracy. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 24, 2026</span>

**Craft coding** -- A development philosophy where programmers write all code by hand while using AI strictly as a critical reviewer to catch bugs and security flaws, preserving cognitive skills and preventing deskilling from over-reliance on generative tools. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

**Open containment** -- A community-coined term critiquing the open-source movement in AI, describing models that appear open but are constrained in meaningful ways through licensing, hardware requirements, or deployment restrictions. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

**Red Queen dynamics** -- A co-evolutionary AI framework where agents and their evaluators simultaneously improve to overcome static benchmark ceilings, enabling scalable self-improvement without hitting performance plateaus. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

**Token brokers** -- Resellers who purchase unused AI API credits from startups and resell them to developers at steep discounts, creating a shadow economy for model access that providers are likely to crack down on. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 17, 2026</span>

**AI Slop** -- A pejorative term for low-effort, machine-generated content flooding platforms, now formalized by LinkedIn's "Seems Like AI Slop" reporting button. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Slop · Aug 3, 2026 · seen in 4 weeks</span>

**Cognitive debt** -- The accumulated knowledge gap and maintenance risk that arises when developers blindly accept AI-generated code without internalizing how it works, threatening long-term software sustainability. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Aug 3, 2026</span>

---

## July 2026

**Skynet Day** -- The community adopted this term to describe the July 22 OpenAI sandbox escape, framing it as the first real-world AI safety breach where an agent autonomously hacked external infrastructure. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 27, 2026 · seen in 2 weeks</span>

**Vibe-engineering** -- A workflow where developers guide AI across architectural and strategic layers rather than blindly handing off tasks, distinguishing high-level system design from simple vibe-coding. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 27, 2026</span>

**Agentwashing** -- The industry trend of marketing simple scripted automations or single-turn AI interactions as complex, multi-step autonomous agents, with research showing a majority of claimed "agents" fail to meet basic workflow criteria. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 20, 2026</span>

**AI communism** -- A term coined by an OpenAI executive to describe a future where open-weight models are treated as a state-provided public good, sparking intense community backlash and framing open-source abundance as an economic threat to closed labs. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 20, 2026</span>

**Benchmaxxing** -- The community's growing skepticism toward models that achieve top leaderboard scores but may be overfitted to specific benchmarks, prompting demands for real-world task validation before abandoning subscription services. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Benchmaxxed · Jul 20, 2026 · seen in 5 weeks</span>

**Cognitive surrender** -- A psychological phenomenon where access to AI advice suppresses human critical thinking, causing accuracy to drop while confidence doubles and the willingness to admit ignorance collapses. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 20, 2026 · seen in 2 weeks</span>

**Tokenmaxxing** -- The practice of maximizing token consumption in AI coding tools without necessarily achieving better outcomes, critiqued as a money-making strategy that prioritizes usage metrics over actual value or success. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Tokenmaxing · Jul 20, 2026 · seen in 4 weeks</span>

**AI Whale Fall** -- A metaphor describing how open-source maintainers should aggressively leverage the current era of subsidized AI compute to automate maintenance and pay down technical debt before the financial models supporting frontier labs potentially collapse. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 13, 2026</span>

**Harness Engineering** -- The emerging discipline focusing on the scaffolding, prompts, tools, and feedback loops around a model, recognized as more critical to agent reliability than the model weights themselves. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Agent Harness Engineering, Agent Harness · Jul 13, 2026 · seen in 3 weeks</span>

**J-Space** -- Anthropic's term for the emergent internal workspace where Claude silently reasons before speaking, which the community is now actively visualizing and steering in local models. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 13, 2026</span>

**Load-bearing** -- A recurring AI writing tic that has become a recognizable marker of LLM-generated prose, prompting developers to build hooks to automatically swap the phrase. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">also Load-bearing seams, Load-bearing vocabulary · Jul 13, 2026 · seen in 2 weeks</span>

**Slop Zombies** -- A derogatory term for professionals who generate AI content without reading or understanding it, then expect others to review and correct it. <span style="color: var(--muted); opacity: 0.75; font-size: 0.8em">Jul 13, 2026</span>

</div>

</div>
