# AI Feature Design Exercise

## Your Task

Design an AI feature for TaskFlow: **Smart Task Breakdown**

When a user creates a high-level task like "Launch new pricing page," the AI suggests breaking it into subtasks automatically.

---

## Exercise Template

Complete each section below. Be specific and grounded in what you learned.

### 1. Problem Statement

**What problem does this solve?**
[Write 2-3 sentences describing the user pain point]

**Who has this problem?**
[Which TaskFlow persona? How often do they encounter it?]

---

### 2. Implementation Approach

**Which approach will you use?**
- [ ] API calls (prompt engineering only)
- [ ] RAG (retrieval + generation)
- [ ] Fine-tuning
- [ ] Combination: _______________

**Why this approach?**
[Explain your reasoning using the decision framework from Phase 2]

---

### 3. Key Tradeoffs

**Latency**
- Expected response time: _____ seconds
- Is this acceptable for the use case? Why?

**Cost**
- Estimated cost per request: $_____
- At 10K daily users × 5 requests each, daily cost: $_____
- Does this work with TaskFlow's unit economics?

**Reliability**
- What happens when the API is down?
- Fallback strategy: _____________________

---

### 4. Success Metrics

| Metric | Target | How You'll Measure |
|--------|--------|-------------------|
| Primary: | | |
| Secondary: | | |
| Guardrail: | | |

**What does failure look like?**
[Describe the signal that would tell you to kill or pivot this feature]

---

### 5. Guardrails & Failure Modes

**What could go wrong?**
| Failure Mode | Likelihood | Mitigation |
|--------------|------------|------------|
| | | |
| | | |
| | | |

**User-facing safeguards:**
- [ ] Human review before action
- [ ] Confidence indicator
- [ ] Easy undo/edit
- [ ] Clear AI disclaimer
- [ ] Other: _______________

---

## What Good Looks Like

A strong response will:

✅ **Problem Statement**
- Specific about the pain point (not vague like "users want help")
- Tied to a real persona and frequency

✅ **Implementation Approach**
- Chooses the simplest approach that could work
- Justifies with concrete reasoning (not "because AI is powerful")

✅ **Tradeoffs**
- Uses realistic numbers from the module
- Shows awareness of cost at scale
- Has a real fallback plan

✅ **Metrics**
- Includes at least one leading indicator
- Has a clear "kill" signal
- Metrics are actually measurable

✅ **Guardrails**
- Identifies 2-3 realistic failure modes
- Each has a specific mitigation
- Includes user-facing safeguards

---

## Example Response (Partial)

**Problem Statement:**
TaskFlow users spend 15+ minutes breaking down complex tasks like "Q4 roadmap planning" into actionable subtasks. Project managers report this as one of their top 3 weekly time sinks. This feature targets the "Overwhelmed PM" persona who manages 10+ projects.

**Implementation Approach:**
RAG + API calls. We'll retrieve the user's existing task patterns and project context, then use GPT-4o-mini to generate subtask suggestions. We're NOT fine-tuning because:
1. We need it shipped in 2 weeks
2. General task breakdown doesn't require domain-specific behavior
3. RAG gives us personalization without training costs

**Latency:**
2-3 seconds expected (GPT-4o-mini + retrieval). Acceptable because users invoke this explicitly via a button, not inline as they type.

---

## When You're Done

Say **"ready for review"** and I'll give you feedback on your feature design.
