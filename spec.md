# AI Video Production Pipeline

## Agent Spec — Nguyễn Ngọc Hoà (Brand Designer)

---

## 1. Overview

**Agent Name:** AI Video Production Pipeline

**One-liner:** From 1 text brief → a complete 30–60s video (with motion, text overlay, music, voice-over) — with multiple creative directions for the user to choose from.

**Mindset:** You are the Creative Director. You don't edit video by hand — you review AI pipeline output, pick a direction, and refine until satisfied.

---

## 2. User & Problem

### Who is the user?

- Marketing teams needing videos for campaigns, product launches, social content
- Brand teams needing video that maintains brand identity but lacking video production resources
- Founders/PMs needing quick demo videos for pitches or idea validation

### What is the problem?

| Issue | Details |
|-------|---------|
| **Slow** | A 30s video takes 1–2 days manually (scriptwriting → storyboard → shoot/animate → edit → sound) |
| **Resource-heavy** | Requires multiple skill sets: copywriter, motion designer, sound designer |
| **Few options** | Usually only 1 version is produced, with long feedback loops |
| **Hard to scale** | Need 5 videos for 5 platforms? Multiply time by 5x |

### Solution

1 brief → AI pipeline runs through each step automatically → produces 2–3 creative directions → each direction is a complete video → Human reviews and picks.

**Time reduction:** from 1–2 days → down to 30–60 minutes.

---

## 3. Input / Output

### Input

```
1 text or markdown brief, including:
- What is the product/service
- Video purpose (product launch, social content, ad, explainer...)
- Target audience
- Desired tone & mood (energetic, calm, premium, playful...)
- Desired duration (15s / 30s / 60s)
- Brand guideline (if available): color, font, logo
- Reference video (if available): YouTube/TikTok link
```

### Output

```
Each brief → 2–3 Creative Directions, each direction includes:

1. Complete script (voice-over text + on-screen text + timing)
2. Storyboard (shot-by-shot visual description + prompt for AI video tool)
3. Voice-over audio file (AI-generated)
4. Background music track (AI-generated, mood-matched)
5. Video clips for each shot (AI-generated)
6. Final compiled video (with text overlay, music, VO)
```

---

## 4. Step-by-Step Workflow

```
┌─────────────────────────────────────────────────────┐
│                    BRIEF INPUT                       │
│            (text/markdown from user)                 │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  STEP 1: CREATIVE DIRECTION (Claude/ChatGPT)        │
│                                                      │
│  - Analyze brief                                     │
│  - Propose 2–3 creative directions                   │
│  - Each direction: concept, mood, visual style,      │
│    color palette, typography suggestion               │
│                                                      │
│  ★ CHECKPOINT 1: Human picks a direction             │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  STEP 2: SCRIPT & STORYBOARD (Claude/ChatGPT)       │
│                                                      │
│  - Write script: VO text + on-screen text            │
│  - Break into shots (4–8 shots for 30s)              │
│  - Each shot: timing, visual description,            │
│    camera movement, text overlay                     │
│  - Generate optimized prompts for AI video tool      │
│                                                      │
│  ★ CHECKPOINT 2: Human reviews script & storyboard   │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  STEP 3: ASSET GENERATION (Parallel)                 │
│                                                      │
│  3a. VIDEO CLIPS — Runway / Kling / Veo              │
│      Use prompts from Step 2 → gen clip per shot     │
│      Gen 2–3 variations per shot to choose from      │
│                                                      │
│  3b. VOICE-OVER — ElevenLabs                         │
│      VO script → select voice matching tone          │
│      Gen audio, adjust speed/emotion                 │
│                                                      │
│  3c. MUSIC — Suno / Udio                             │
│      Gen background music matching mood + tempo      │
│      Gen 2–3 tracks to choose from                   │
│                                                      │
│  ★ CHECKPOINT 3: Human reviews each asset            │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  STEP 4: COMPILE & POLISH                            │
│                                                      │
│  - Assemble video clips on timeline                  │
│  - Add text overlay (on-screen text from script)     │
│  - Sync voice-over with visuals                      │
│  - Layer background music                            │
│  - Add transitions between shots                     │
│  - Export final video                                │
│                                                      │
│  Tool: CapCut / DaVinci (or AI-assisted edit)        │
│                                                      │
│  ★ CHECKPOINT 4: Human reviews final → approve/refine│
└─────────────────────────────────────────────────────┘
```

---

## 5. AI Tools Stack

| Step | Tool | Role |
|------|------|------|
| Creative Direction | **Claude / ChatGPT** | Analyze brief, propose concepts, write scripts |
| Script & Storyboard | **Claude / ChatGPT** | Write detailed script, break into shots, generate prompts |
| Video Generation | **Runway Gen-3** / **Kling** / **Veo 2** | Generate video clips from text prompts or image-to-video |
| Image Reference | **Midjourney** / **DALL-E** | Generate reference images for style frames / key visuals |
| Voice-Over | **ElevenLabs** | Natural-sounding text-to-speech |
| Music | **Suno** / **Udio** | Generate background music by mood |
| Compile & Edit | **CapCut** / **DaVinci Resolve** | Assemble video, text overlay, sync audio |
| Text Overlay | **Claude** | Generate text animation spec / subtitle file (.srt) |

---

## 6. Multi-Option Output (Critical!)

The agent MUST generate multiple options at each key step:

| Step | # of Options | Human Decides |
|------|-------------|---------------|
| Creative Direction | 2–3 directions | Concept + mood + visual style |
| Script | 1 (based on chosen direction) | Review & approve |
| Video clip per shot | 2–3 variations | Best clip |
| Voice | 2–3 different voices | Best-fitting voice |
| Music | 2–3 tracks | Best-matching track |
| Final video | 1 (compiled) | Approve or request refinement |

---

## 7. Demo Scenario

### Sample Brief for Demo

```markdown
## Video Brief: Whales Market Launch

- **Product:** Whales Market — Crypto pre-market trading platform
- **Purpose:** Product launch announcement video for social media
- **Target:** Crypto traders, DeFi users, early-stage token investors
- **Tone:** Bold, futuristic, premium, high-stakes energy
- **Duration:** 30 seconds
- **Platform:** Twitter/X, Telegram channel
- **Brand colors:** Refer to Whales Market brand guideline
- **Key message:** "Trade the future before it hits the market"
- **CTA:** "Start trading pre-market now — whales.market"
```

### Expected Demo Output

1. Present 2–3 creative directions with different mood boards
2. Show detailed script + storyboard for the chosen direction
3. Play voice-over samples (2–3 voices)
4. Play music samples (2–3 tracks)
5. Play video clips for each shot
6. **Play the final 30s complete video**

---

## 8. Before vs. After

| | Before (Manual) | After (AI Pipeline) |
|---|---|---|
| **Time** | 1–2 days | 30–60 minutes |
| **Skills needed** | Copywriter + Motion designer + Sound designer | 1 person (Creative Director) |
| **Options** | 1 version, long feedback loop | 2–3 directions, pick immediately |
| **Scale** | 5 videos = 5–10 days | 5 videos = half a day |
| **Cost** | Expensive freelancers/agency | AI tool subscription |
| **Consistency** | Depends on individual | Brand guideline encoded in prompts |

---

## 9. Scope Management (MVP for 4 Days)

### Must Have (MVP)

- [x] Step 1: AI proposes 2–3 creative directions from brief
- [x] Step 2: AI writes detailed script + storyboard
- [x] Step 3a: Generate video clips using Runway/Kling
- [x] Step 3b: Generate voice-over using ElevenLabs
- [x] Step 3c: Generate music using Suno
- [x] Step 4: Compile into a complete video (can use CapCut)
- [x] Live demo with a new brief

### Nice to Have (If Time Permits)

- [ ] Auto-compile without CapCut (using ffmpeg or API)
- [ ] Auto-generate subtitle file (.srt) from script
- [ ] Template prompt library for different video types
- [ ] Batch generation: 1 brief → videos for multiple platforms (9:16, 16:9, 1:1)

---

## 10. Expansion Roadmap (For Q&A with Judges)

**Phase 2:** Template library — pre-built prompt templates for each video type (product launch, testimonial, explainer, social content)

**Phase 3:** Brand memory — agent remembers brand guidelines, no need to re-input every time

**Phase 4:** Auto-compile — automatically assemble video via script, no need to open CapCut

**Phase 5:** Multi-platform export — 1 source video → auto crop/resize for TikTok, Instagram, YouTube Shorts, Twitter

---

## 11. GitHub Repo Structure

```
ai-video-pipeline/
├── README.md                         # Agent introduction
├── spec.md                           # This file
├── workflow/
│   ├── step1-creative-direction.md   # Prompt template for Step 1
│   ├── step2-script-storyboard.md    # Prompt template for Step 2
│   ├── step3-asset-prompts.md        # Prompts for Runway/ElevenLabs/Suno
│   └── step4-compile-guide.md        # Compile instructions
├── output-samples/
│   ├── direction-A/                  # Sample output direction A
│   ├── direction-B/                  # Sample output direction B
│   └── final-video/                  # Final video
└── ai-showcase/
    ├── prompt-screenshots/           # Screenshots of best prompts
    └── conversation-links.md         # AI conversation links
```

---

*Spec version 1.0 — Nguyễn Ngọc Hoà — Day 1*
