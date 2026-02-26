---
title: "Stop Typing the Same Prompts: A Practical Guide to Claude Code Skills"
excerpt: "After months of building custom skills for Claude Code, here's what actually works and what's mostly hype."
date: "2025-01-07"
readTime: "10 min read"
category: "Engineering"
featured: true
slug: "claude-code-skills-practical-guide"
published: true
---

# Stop Typing the Same Prompts: A Practical Guide to Claude Code Skills

I've been using Claude Code as my primary coding assistant for a while now. Somewhere around the third time I typed out my preferred git commit format, I realized I was doing this wrong. There had to be a better way than re-explaining my preferences in every session.

Turns out there is. Skills.

## What Skills Actually Are

Skills are reusable prompts that Claude Code can invoke when relevant. Think of them as saved procedures—you define a workflow once, and Claude can run it whenever the situation calls for it. They live as markdown files in `~/.claude/commands/` and get loaded when you invoke them with a slash command like `/git:commit` or `/research:deep`.

The mental model that helped me: skills are like shell aliases, but for AI interactions. Instead of typing `git log --oneline --graph --all` every time, you alias it to `gl`. Skills do the same thing for complex prompts.

## The Hierarchy: Skills vs. Agents vs. Your CLAUDE.md

Before we get into examples, it's worth understanding how these pieces fit together because I mixed them up initially.

**CLAUDE.md** is your persistent context. It tells Claude who you are, what you care about, your coding style preferences. Mine specifies that I follow TDD strictly and prefer TypeScript's strict mode. It applies to every conversation.

**Skills** are workflows. They're procedural—do X, then Y, then Z. They get invoked when needed and disappear when done.

**Agents** are specialized workers. When a skill needs to do something complex (like deep web research), it can spawn an agent that has its own context and tools, runs in the background, and reports back.

The confusion usually happens because people try to stuff everything into CLAUDE.md. Don't do that. If it's a workflow, make it a skill. If it's a preference, put it in CLAUDE.md.

## Skills That Actually Save Time

Let me walk through some skills I use daily and why they work.

### The Git Commit Skill

Here's my `/git:commit` workflow. Before I built this, my commits were a mess—inconsistent formatting, sometimes forgetting to run linting, mixing unrelated changes.

```bash
/git:commit "feat: add user authentication"
```

What happens under the hood:

1. Runs pre-commit linting with auto-fix
2. Analyzes uncommitted files to detect the conventional commit type
3. Validates the commit message format
4. Creates the commit (or multiple logical commits if I use `--batch`)

The skill file is about 300 lines of markdown that specifies exactly how to detect commit types from file paths:

```markdown
## Type Auto-Detection from Uncommitted Files

1. **All documentation files** (`*.md`, `docs/**`) → `docs:`
2. **All test files** (`*.test.*`, `*.spec.*`) → `test:`
3. **New files added** (git status: A) → `feat:`
4. **Files with fix/bug keywords** → `fix:`
```

Is this overkill? Maybe. But I haven't thought about commit message formatting in months, and my git history actually makes sense now.

### Research Skills (The Tiered Approach)

I have three research skills that form a hierarchy:

- `/research:quick` — for "what's the latest version of X"
- `/research:standard` — for "compare these two libraries"
- `/research:deep` — for "what's the best architecture for integrating Salesforce with SQL Server"

The key insight: **different questions need different depth**. Quick lookups don't need problem decomposition and evidence synthesis. But architecture decisions do.

The deep research skill does something clever. It decomposes my question into 3-5 sub-questions, generates multiple search queries per sub-question, synthesizes findings with source rankings, and iterates until it reaches a completeness threshold. For a question like "microservices vs. monolith for e-commerce," it might run 25 different searches across 5 sub-topics.

Is it slower? Yes. Does it give better answers for complex questions? Significantly.

### The Brainstorming Skill

This one surprised me with how useful it became. When I type something like "add dark mode to my app," my instinct is to start coding immediately. The brainstorming skill forces me to slow down:

```markdown
## The Process

**Understanding the idea:**
- Check out the current project state first
- Ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible

**Exploring approaches:**
- Propose 2-3 different approaches with trade-offs
- Lead with your recommendation and reasoning

**Presenting the design:**
- Break it into sections of 200-300 words
- Ask after each section whether it looks right
```

The constraint of presenting designs in small chunks and validating each section has caught several misunderstandings before I wrote any code. Turns out "add dark mode" can mean very different things—a toggle in settings, system preference detection, a full theming system, or just inverting colors.

## Writing Your Own Skills

The skill format is straightforward. Here's the structure:

```markdown
---
description: "What this skill does in one line"
argument-hint: "expected arguments"
allowed-tools: Bash, Read, Edit, WebSearch
---

# Command: Your Skill Name

## What this skill does

[Explain the workflow]

## Steps

1. First, do this
2. Then, do that
3. Finally, validate

## Examples

[Show concrete usage]
```

A few things I learned the hard way:

**Be specific about allowed tools.** If your skill needs web search, say so. If it shouldn't modify files, don't include Edit in allowed-tools.

**Include examples with realistic arguments.** Claude is better at following patterns when it can see what good looks like.

**Structure the workflow as explicit steps.** Vague instructions produce vague results. "Analyze the codebase" is worse than "Run `git diff HEAD --name-status` to get uncommitted changes, then categorize files by type."

**Add constraint sections.** My git commit skill explicitly says "YOU MUST NOT commit without a type prefix." Negative constraints prevent drift.

## The Speckit System (Structured Specification)

One skill system worth highlighting is the `/speckit:*` family. It's a workflow for turning vague feature ideas into structured specifications:

```bash
/speckit:specify "user can export their data as CSV"
```

This creates a feature branch, generates a spec file from a template, and walks through clarifying questions. The spec covers:

- User scenarios and acceptance criteria
- Functional requirements (written to be testable)
- Success criteria (measurable, technology-agnostic)
- Key entities and data models

What I like about this: it separates **what** from **how**. The spec describes the feature from a user's perspective without mentioning React or PostgreSQL or whatever. Implementation details come later in the planning phase.

The skill even runs a quality validation checklist:

```markdown
## Content Quality

- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
```

If the spec mentions "REST API" or "database schema," it fails validation and you have to fix it.

## What Doesn't Work Well

Skills aren't magic, and some approaches fail:

**Over-engineered skills.** I had a skill that tried to do code review, security analysis, performance profiling, and documentation updates all in one. It was too much context, and Claude would lose track of what it was supposed to be doing. Better to have focused skills that do one thing.

**Skills without concrete examples.** Abstract descriptions of what a skill should do lead to inconsistent behavior. The more specific examples you provide, the more consistent the output.

**Skills that fight your CLAUDE.md.** If your CLAUDE.md says "always use TypeScript strict mode" and your skill says "generate JavaScript for quick prototypes," you'll get confused output. They need to complement each other.

**Agent-heavy skills for simple tasks.** Spawning a research agent for "what's the latest React version" is overkill. Match the tool to the task.

## The Actual Productivity Gain

Here's the honest assessment: skills don't make Claude Code faster at everything. They make it **consistent** at the things you do repeatedly.

My commits follow the same format every time. My research follows the same methodology. My feature specs have the same structure. That consistency compounds—when everything follows predictable patterns, you spend less mental energy on format and more on substance.

The setup cost is real. Building a good skill takes a few iterations. You'll write a first draft, discover edge cases, refine, repeat. But once it works, it works every time.

If you're typing the same kind of prompt more than three times, stop. Write a skill.

---

*I'm still iterating on my skill collection. If you're using Claude Code and want to compare notes, find me on [Bluesky](https://bsky.app/profile/travis.dev).*
