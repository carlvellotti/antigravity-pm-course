# Module 3.1: AI for Product Managers - Teaching Script

## Introduction & Overview

Welcome to Module 3.1: AI for Product Managers!

This module teaches you how to think about LLM-powered products as a PM.

The key insight: AI is a tool with real constraints — latency, cost, reliability, and failure modes. Understanding these helps you scope features realistically and collaborate effectively with ML engineers.

You'll learn when to use AI, when NOT to use it, and how to evaluate AI feature quality.

**STOP: Ready to dive in?**

**USER: Confirms ready**

---

## Show Complete Workflow

Let me show you what we'll cover today.

Here's what each phase does:
- Phase 1: The PM's AI Mental Model (how LLMs differ from traditional software)
- Phase 2: Build vs Buy vs Prompt (API calls, fine-tuning, RAG decision framework)
- Phase 3: Real Tradeoffs (latency, cost, reliability, hallucinations)
- Phase 4: Evaluation & Metrics (how to measure AI feature quality)
- Phase 5: When NOT to Use AI (critical anti-patterns)
- Phase 6: Hands-On Exercise (design an AI feature for TaskFlow)

This gives you a practical mental model for AI products.

**STOP: Any questions before we begin?**

**USER: Confirms**

---

## Phase 1: The PM's AI Mental Model

Let's start with the most important thing to understand about AI products.

The key insight: LLMs are probabilistic, not deterministic.

What does this mean in practice?

| Traditional Software | LLM-Powered Features |
|---------------------|---------------------|
| Same input → same output | Same input → different outputs |
| Errors are bugs to fix | Errors are inherent and statistical |
| Testing is binary (pass/fail) | Testing is probabilistic (% good) |
| Behavior is predictable | Behavior varies by prompt, model, temperature |

This changes everything about how you design, test, and scope AI features.

Here's a TaskFlow example: If you build a "summarize meeting notes" feature, the summary will be slightly different each time — even with identical input. This isn't a bug. It's how LLMs work.

**STOP: Does this distinction make sense? Any questions before we continue?**

**USER: Confirms**

---

## Phase 2: Build vs Buy vs Prompt

When you decide to add an AI feature, you have three main approaches. Each has real tradeoffs.

**Option 1: API Calls (Prompt Engineering)**
- What it is: Send prompts to OpenAI/Anthropic/Google APIs
- Cost: Pay per token (see cost table below)
- Time to build: Hours to days
- Quality: Good for general tasks
- Control: Limited — you're using their model as-is

**Option 2: Fine-Tuning**
- What it is: Train a model on your specific data
- Cost: $100s–$10Ks upfront, then cheaper per call
- Time to build: Weeks to months
- Quality: Better for specialized domains
- Control: More control over behavior

**Option 3: RAG (Retrieval-Augmented Generation)**
- What it is: Connect an LLM to your data via search/embedding
- Cost: Moderate (embedding + API costs)
- Time to build: Days to weeks
- Quality: Great for knowledge-intensive tasks
- Control: You control what data the model sees

Here's a decision framework:

| Situation | Best Approach |
|-----------|---------------|
| General task, need it fast | API (prompt engineering) |
| Domain-specific outputs needed | Fine-tuning |
| Need to reference your data | RAG |
| All three matter | Start with RAG + API, fine-tune later |

**STOP: Which approach would you use for a feature that helps users write better task descriptions? Take a moment to think through the tradeoffs.**

**USER: Responds**

---

## Phase 2 Continued: Discussion

Great thinking! Let's discuss why that makes sense.

For general text improvement, you'd likely start with API calls — it's fast to build and GPT-4o or Claude 3.5 Sonnet handle writing tasks well.

RAG becomes valuable if you want to match the user's writing style or reference their previous tasks.

Fine-tuning is overkill for this — save it for cases where you need very specific output formats or domain knowledge.

**STOP: Make sense so far?**

**USER: Confirms**

---

## Phase 3: Real Tradeoffs

Now let's get into the numbers. As a PM, you need to understand these constraints to scope features realistically.

**Latency (how long before user sees response)**

| Model | Typical Response Time |
|-------|----------------------|
| GPT-4o | 1–5 seconds |
| GPT-4o-mini | 0.5–2 seconds |
| Claude 3.5 Sonnet | 1–4 seconds |
| Claude 3.5 Haiku | 0.3–1 second |
| Gemini 2.0 Flash | 0.3–1 second |
| Gemini 1.5 Pro | 1–4 seconds |
| Fine-tuned small model | 100ms–500ms |
| Local/edge model | 50ms–200ms |

PM Implication: If your feature requires real-time responses (like autocomplete), GPT-4o is too slow. Use Flash/Haiku models or accept the latency.

**Cost (per 1M tokens, approximate 2024-2025)**

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o | $2.50 | $10 |
| GPT-4o-mini | $0.15 | $0.60 |
| Claude 3.5 Sonnet | $3 | $15 |
| Claude 3.5 Haiku | $0.25 | $1.25 |
| Gemini 2.0 Flash | $0.10 | $0.40 |
| Gemini 1.5 Pro | $1.25 | $5 |
| Open-source (self-hosted) | $0 | + infra costs |

PM Implication: At 10,000 daily active users making 10 requests each, you're looking at 100K+ API calls/day. GPT-4o could cost $500+/day. Gemini Flash might cost $20/day. Does your unit economics support this?

**STOP: Given these numbers, which model tier would you choose for a feature used 10+ times per user per day?**

**USER: Responds**

---

## Phase 3 Continued: Reliability & Hallucinations

Two more critical tradeoffs:

**Reliability**
- API uptime: 99.5–99.9% (but outages happen)
- Rate limits: All providers limit requests per minute
- Model deprecation: Models get retired (e.g., GPT-3.5 Turbo → GPT-4o-mini)

PM Implication: You need fallback strategies. What happens when the API is down? Graceful degradation, cached responses, or feature unavailability?

**Hallucinations**

LLMs confidently generate false information. This is not a bug — it's inherent to how they work.

Examples:
- Factual errors: "TaskFlow was founded in 2018" (made up)
- Logical errors: Incorrect calculations
- Citation errors: Fake URLs, non-existent sources

PM Implication: Any feature where correctness matters needs guardrails:
- Human review before action
- Retrieval grounding (RAG)
- Confidence scores
- Clear disclaimers

**STOP: What guardrails would you add to an AI feature that auto-generates sprint summaries for TaskFlow?**

**USER: Responds**

---

## Phase 4: Evaluation & Metrics

How do you know if your AI feature is good? This is harder than traditional software.

**Offline Evaluation (Before Launch)**
- Test set: Curated examples with known-good answers
- Human rating: Have people grade outputs (1-5 scale)
- Automated checks: Regex, keyword matching, format validation
- LLM-as-judge: Use GPT-4o to evaluate smaller model outputs

**Online Evaluation (After Launch)**
- User satisfaction: Thumbs up/down, explicit ratings
- Engagement: Do users actually use the feature?
- Task completion: Does the feature help users do their job?
- Regeneration rate: How often do users ask for a new response?

Here are the key metrics for AI features:

| Metric | What It Measures |
|--------|-----------------|
| Acceptance rate | % of AI suggestions users accept |
| Edit distance | How much users modify AI output |
| Regeneration rate | How often users ask for another try |
| Time saved | Task completion time vs manual |
| Error rate | % of outputs with critical errors |

TaskFlow example: For the AI task summarizer, you might track:
- 70% of summaries accepted without edits (target)
- <5% contain factual errors
- Users save 3 minutes per standup (measured via before/after)

**STOP: What metrics would you choose for an AI feature that suggests task priorities? Think about leading vs lagging indicators.**

**USER: Responds**

---

## Phase 5: When NOT to Use AI

This is the most important section. Good PMs know when AI is the wrong tool.

**Don't Use AI When:**

**1. Correctness is non-negotiable**
- Medical diagnosis
- Legal advice
- Financial calculations
- Compliance/audit requirements

AI makes mistakes. If a mistake has serious consequences, don't use AI as the primary system.

**2. Determinism is required**
- Same input MUST produce same output
- Reproducible results for debugging
- Audit trails that can't vary

LLMs are inherently non-deterministic. Even with temperature=0, outputs can vary.

**3. Latency is critical**
- Real-time gaming
- High-frequency trading
- Sub-100ms response requirements

LLM inference is too slow for many real-time applications.

**4. The task is simple**
- Lookups, filters, CRUD operations
- Rule-based logic
- Simple calculations

Don't use AI to be fancy. If a database query solves the problem, use a database query.

**5. Data sensitivity prevents API use**
- PII that can't leave your infrastructure
- Trade secrets
- Regulated data (HIPAA, GDPR edge cases)

If you can't send data to external APIs, you need self-hosted models — which adds significant complexity.

**Red Flags in PRDs:**

Watch for these phrases that suggest AI might be misapplied:
- "AI will ensure 100% accuracy"
- "The AI will always..."
- "Users can trust the AI to..."

These expectations will fail. Reframe or reconsider.

**STOP: Has this changed how you think about any feature ideas you've had? What's one case where you now realize AI might be wrong?**

**USER: Responds**

---

## Phase 6: Hands-On Exercise

Now let's apply everything you've learned.

Your Task: Design an AI feature for TaskFlow called **Smart Task Breakdown**

When a user creates a task like "Launch new pricing page," the AI suggests breaking it into subtasks.

**ACTION: Open and read ai-feature-exercise.md in this folder**

You'll use the exercise template to:
1. Define the problem clearly
2. Choose your implementation approach (API/fine-tune/RAG)
3. Identify the key tradeoffs
4. Define success metrics
5. List guardrails and failure modes

Take 10 minutes to fill out the template. I'll review your work when you're done.

**STOP: Say "ready for review" when you've completed the exercise.**

**USER: Completes exercise**

---

## Review & Feedback

**ACTION: Review the student's completed ai-feature-exercise.md**

Let me review your AI Feature Decision Doc...

I'll provide specific feedback on:
- Problem definition: Is it clear and scoped?
- Approach choice: Does the rationale make sense?
- Tradeoffs: Did you identify the key constraints?
- Metrics: Are they measurable and meaningful?
- Guardrails: Did you plan for failure modes?

**STOP: How does this feedback land? Any questions?**

**USER: Responds**

---

## Recap & Key Takeaways

Excellent work! Let's recap what you learned:

- ✅ LLMs are probabilistic — design for variability, not perfection
- ✅ Start with APIs, add complexity only when needed — RAG before fine-tuning
- ✅ Know your constraints — latency, cost, reliability shape what's possible
- ✅ Measure what matters — acceptance rate, edit distance, not just "accuracy"
- ✅ Know when NOT to use AI — sometimes a database query is the right answer

Here's the key insight: Understanding AI constraints makes you a BETTER PM.

You can scope features realistically, push back on unrealistic expectations, and collaborate effectively with ML engineers.

**STOP: Do you see how this mental model will help you make better product decisions about AI features?**

**USER: Confirms**

---

## What's Next

You now have a practical mental model for AI products.

Apply this framework every time you:
- Evaluate an AI feature proposal
- Write a PRD for an AI-powered feature
- Discuss scope with ML engineers
- Push back on unrealistic AI expectations

Congratulations — you now know how to think about AI like a PM who understands systems deeply!

**STOP: When you're ready, type /start-3-2 to continue to the next module (coming soon), or revisit any previous module.**

**USER: Acknowledges**

---

**END OF MODULE 3.1**
