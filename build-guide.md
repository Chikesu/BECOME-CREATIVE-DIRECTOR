# AI Video Production Pipeline — Full Build Guide

## Hoà's Setup

| Component | Tool |
|-----------|------|
| Agent Brain | **Claude Projects** (Custom Instructions) |
| Video Generation | **Google Flow + Veo 3** (native audio, scene editing, extend) |
| Voice-Over | **ElevenLabs** (for precise VO control) |
| Music | **Suno** (free tier) — OR use Veo 3 native audio |
| Image Reference | **Flow Imagen** (built-in) or **ChatGPT DALL-E** |
| Compile & Edit | **After Effects** |

### Why Flow + Veo 3 is a game-changer for this pipeline:

- **Native audio:** Veo 3 generates ambient sound, SFX, even dialogue WITH the video — no need to layer audio separately for many shots
- **Ingredients to Video:** Upload reference images to control character/object consistency across shots
- **Frames to Video:** Provide start + end frame for seamless transitions between shots
- **Extend:** Extend clips to create longer continuous shots (up to 60s+)
- **Insert/Remove:** Edit objects in/out of generated scenes
- **Built-in image gen:** Use Imagen inside Flow to create ingredients without leaving the platform
- **Resolution:** 1080p and 4K upscaling available

---

# PHASE 0: SETUP (30 min)

## 0.1 — Create Claude Project

1. Go to **claude.ai** → Left sidebar → **Projects** → **Create Project**
2. Name: `Video Production Pipeline`
3. Open the project → click **"Set custom instructions"**
4. Paste the System Prompt below (Section 0.2)
5. This is your agent — every conversation inside this project will follow the pipeline

## 0.2 — System Prompt (paste into Custom Instructions)

```
You are an AI Video Production Director. Your job is to take a video brief and guide the user through a complete video production pipeline, step by step.

## YOUR ROLE
You are the brain of a video production pipeline. You analyze briefs, propose creative directions, write scripts, create storyboards, and generate optimized prompts for AI video/audio tools.

## PIPELINE STEPS
Always follow this exact sequence. Never skip steps. Wait for user approval at each checkpoint before proceeding.

### STEP 1: CREATIVE DIRECTION
When the user provides a brief:
- Analyze the brief thoroughly
- Propose exactly 3 creative directions
- For each direction, provide:
  - **Direction Name** (2-3 words)
  - **Concept** (1 paragraph describing the creative idea)
  - **Mood & Tone** (3-5 keywords)
  - **Visual Style** (cinematic, minimal, abstract, 3D, flat motion, etc.)
  - **Color Palette** (5 hex codes with descriptions)
  - **Typography Suggestion** (font pairing)
  - **Reference Vibe** (describe what it would feel like)
- Ask: "Which direction do you want to go with? (1, 2, or 3)"

### STEP 2: SCRIPT & STORYBOARD
After user picks a direction:
- Write a complete video script in a table format:

| Shot # | Time | Duration | Voice-Over Text | On-Screen Text | Visual Description | Camera Movement |
|--------|------|----------|-----------------|----------------|-------------------|-----------------|

- Keep total duration to the brief's target (15s/30s/60s)
- For 30s video: 5-7 shots
- Each shot: 3-6 seconds
- Voice-over should be concise, punchy, match the tone
- On-screen text: key phrases only, not full sentences
- Visual description: be extremely specific and cinematic
- Ask: "Approve this script? Or any changes needed?"

### STEP 3: PROMPT GENERATION
After script approval, generate:

**3A — Google Flow / Veo 3 Video Prompts:**
For each shot, write an optimized Veo 3 prompt:
- Start with the visual style/medium
- Describe the scene in detail
- Include camera movement (dolly in, pan left, static, etc.)
- Include lighting description
- Include color grading reference
- Include audio direction (ambient sound, SFX) since Veo 3 supports native audio
- Keep prompts under 150 words
- Format: Shot # → Prompt → Duration → Aspect Ratio → Audio Notes
- Also suggest which Flow features to use per shot:
  - "Text to Video" for most shots
  - "Ingredients to Video" for shots needing character/brand consistency
  - "Frames to Video" for transition shots (provide start/end frame description)
  - "Extend" for shots that need to be longer

**3B — ElevenLabs Voice-Over:**
- Compile all VO text into one continuous script
- Recommend voice characteristics (gender, age, accent, energy level)
- Suggest specific ElevenLabs voice presets if applicable
- Include pacing notes: [pause 0.5s], [emphasis], [slower]

**3C — Suno Music Prompt:**
- Write 2-3 Suno prompts for different music options
- Include: genre, tempo (BPM), mood, instruments, duration
- Format: Style tag + description

Ask: "All prompts ready. Shall I adjust anything before you start generating?"

### STEP 4: COMPILE GUIDE
After user generates all assets, provide:
- After Effects timeline breakdown
- Layer order (bottom to top)
- Text overlay timing and animation suggestions
- Transition recommendations between shots
- Audio mix notes (VO volume vs music volume)
- Export settings recommendation

## RULES
- Always be specific, never vague
- Use professional video production terminology
- When describing visuals, think like a cinematographer
- Prompts should be optimized for each specific AI tool
- Always provide multiple options where specified
- Never proceed to next step without user confirmation
- If the brief is missing information, ask before starting
```

## 0.3 — Setup Accounts

| Tool | Action | Link |
|------|--------|------|
| **Google Flow** | Access Veo 3 (requires Google AI Pro or Ultra plan) | https://labs.google/flow/about |
| **ElevenLabs** | You already have account ✓ | https://elevenlabs.io |
| **Suno** | Create free account (50 credits/day free) — backup for music | https://suno.com |

> **Note on Flow plans:**
> - Google AI Pro ($19.99/mo): 100 generations/month, Veo 3.1, all core features
> - Google AI Ultra ($249.99/mo): highest limits, early access features
> - Ask BTC for credit if needed

---

# PHASE 1: CREATIVE DIRECTION (15 min)

## 1.1 — Start a conversation in your Claude Project

Open the `Video Production Pipeline` project and type your brief:

```
Here's my video brief:

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

Generate 3 creative directions for me.
```

## 1.2 — Review & Pick

Claude will give you 3 directions. Example of what to expect:

- **Direction 1:** "Deep Ocean" — dark, cinematic, whale metaphor, deep blues
- **Direction 2:** "Digital Trading Floor" — fast-paced, neon, data visualization
- **Direction 3:** "Time Machine" — concept of trading the future, sci-fi aesthetic

Reply with your pick:
```
I like Direction 2. Let's go with that. Proceed to script & storyboard.
```

---

# PHASE 2: SCRIPT & STORYBOARD (15 min)

## 2.1 — Claude auto-generates script

After you pick a direction, Claude will output a full script table like:

| Shot | Time | Dur | VO | On-Screen | Visual | Camera |
|------|------|-----|----|-----------|--------|--------|
| 1 | 0:00 | 4s | "The market never sleeps..." | WHALES MARKET | Dark ocean, bioluminescent particles rising | Slow dolly up |
| 2 | 0:04 | 5s | "But the smartest traders..." | PRE-MARKET ACCESS | Digital trading interface materializing | Push in |
| ... | ... | ... | ... | ... | ... | ... |

## 2.2 — Review & Refine

If you want changes:
```
Shot 3 feels too slow. Make it more dynamic.
Change the CTA text to "Trade before everyone else".
The VO in shot 5 is too long, cut it shorter.
```

When satisfied:
```
Script approved. Generate all prompts now.
```

---

# PHASE 3: ASSET GENERATION (This is where the magic happens)

## 3A — Generate Video Clips with Google Flow + Veo 3 (30-45 min)

### How to use Flow:

1. Go to **https://labs.google/flow/about** → Open Flow
2. Sign in with Google account
3. Create a new project in Flow

### Workflow per shot:

**Option A — Text to Video (most shots):**
1. Paste the Veo 3 prompt that Claude generated
2. Set duration (4s / 6s / 8s)
3. Set aspect ratio (16:9 for Twitter, 9:16 for TikTok)
4. Generate → review → regenerate if needed
5. **Veo 3 will generate audio too** — ambient sound, SFX are included natively

**Option B — Ingredients to Video (for brand consistency):**
1. First, create "ingredients" — generate reference images of your key visual elements using Flow's built-in Imagen
2. Example ingredients: Whales Market logo/UI, a whale silhouette, trading interface, crypto tokens
3. Combine ingredients + text prompt → Flow generates a scene with your specific elements
4. Great for maintaining consistent look across multiple shots

**Option C — Frames to Video (for transitions):**
1. Provide a start frame (screenshot from end of previous shot)
2. Provide an end frame (first frame of next shot)
3. Flow generates a smooth transition between them
4. Perfect for connecting shots seamlessly

**Option D — Extend (for longer shots):**
1. If a shot needs to be longer than 8s
2. Generate the initial clip → use Extend to continue the action
3. Flow maintains continuity from the last second of your clip

### Tips for best Veo 3 results:

- **Generate 2-3 variations per shot** — pick the best one
- **Include audio direction in prompts:** e.g., "ambient electronic hum, subtle data processing sounds"
- **Use Ingredients for brand elements** — this keeps the Whales Market identity consistent
- **If a shot doesn't look right:** go back to Claude and say:
  ```
  Shot 3 output from Veo 3 doesn't look right. The lighting is too bright
  and there's no sense of depth. Rewrite the prompt with more emphasis on
  dark moody lighting and atmospheric fog. Also add audio direction for
  deep bass rumble and digital glitch sounds.
  ```
- **Download** each approved clip and name them: `shot01.mp4`, `shot02.mp4`, etc.
- **Keep the native audio** from Veo 3 — you can mix it with your VO and music in After Effects

### File Organization:

```
whales-market-video/
├── clips/
│   ├── shot01.mp4
│   ├── shot01_v2.mp4    (variation)
│   ├── shot02.mp4
│   ├── shot03.mp4
│   └── ...
├── audio/
│   ├── voiceover.mp3
│   └── music.mp3
├── text/
│   └── script.md
└── final/
    └── whales-market-30s.mp4
```

## 3B — Generate Voice-Over with ElevenLabs (10 min)

### Steps:

1. Go to **ElevenLabs** → **Speech Synthesis** or **Projects**
2. Claude gave you the compiled VO script with pacing notes
3. **Choose a voice:**
   - For crypto/tech: try **"Adam"** (deep, confident) or **"Antoni"** (clear, professional)
   - For premium feel: try **"Daniel"** (British, authoritative)
   - Generate the same script with **2-3 different voices** to compare
4. **Settings to adjust:**
   - **Stability:** 60-70% (more expressive)
   - **Clarity + Similarity Enhancement:** 75%
   - **Style Exaggeration:** 30-40% (adds energy)
5. **Add pacing manually:**
   - Use `...` for short pauses
   - Use line breaks for longer pauses
   - Re-generate sections that sound off
6. **Download** as MP3: `voiceover.mp3`

### Pro tip:
If you want different energy for different sections, generate each section separately and combine in After Effects. This gives you more control over timing.

## 3C — Generate Music with Suno (10 min)

### Steps:

1. Go to **suno.com** → **Create**
2. Toggle **Custom Mode** ON
3. Claude gave you Suno prompts. Paste them. Example:

```
Style: dark electronic, cinematic, ambient bass, futuristic
Tempo: 110 BPM
Mood: intense, premium, building tension then release
Instruments: deep bass synth, glitch percussion, atmospheric pads, subtle risers
Duration: 35 seconds (slightly longer than video for editing room)
```

4. **Generate 2-3 tracks** — pick the one that matches your video's energy
5. **Important:** make sure the music has a **build-up** that matches your video's climax
6. **Download** as MP3: `music.mp3`

### Tips:
- Keep music **instrumental only** — no vocals (they'll clash with VO)
- If Suno adds vocals, add `[instrumental]` tag in the style prompt
- Listen to the first 30s only — that's what you'll use
- Music should **support**, not overpower the voice-over

---

# PHASE 4: COMPILE IN AFTER EFFECTS (30-45 min)

## 4.1 — Project Setup

1. **New Composition:**
   - Name: `Whales-Market-30s`
   - Resolution: 1920x1080 (16:9) for Twitter/X
   - Frame Rate: 30fps
   - Duration: 0:00:30:00

2. **Import all assets:**
   - All shot clips (`shot01.mp4` — `shot07.mp4`)
   - Voice-over (`voiceover.mp3`)
   - Music (`music.mp3`)

## 4.2 — Timeline Assembly

### Layer Order (bottom to top):

```
Layer 7 (top):    Text overlays / CTA
Layer 6:          Logo / brand elements
Layer 5:          Adjustment layer (color grading)
Layer 4:          Voice-over audio
Layer 3:          Music audio
Layer 2:          Video clips (in sequence)
Layer 1 (bottom): Solid background (black)
```

### Arrange Clips:

1. Place each shot clip sequentially on the timeline
2. Trim each clip to match the script timing:
   - Shot 1: 0:00 → 0:04
   - Shot 2: 0:04 → 0:09
   - Shot 3: 0:09 → 0:13
   - (follow your script table)
3. **Overlap clips by 5-10 frames** for smooth transitions

## 4.3 — Transitions

Keep it clean and premium. Recommended:

| Transition | When to use | How |
|-----------|-------------|-----|
| **Cross dissolve** | Between mood-similar shots | Overlap clips + opacity keyframes |
| **Additive dissolve** | For bright/energetic moments | Blending mode: Add |
| **Hard cut** | For impact moments / beat drops | No transition, just cut |
| **Luma fade** | Intro and outro | Fade from/to black |

### Quick cross-dissolve:
- Overlap two clips by 10 frames
- On the outgoing clip: keyframe Opacity 100% → 0% over 10 frames
- On the incoming clip: keyframe Opacity 0% → 100% over 10 frames

## 4.4 — Text Overlays

### Style Guide:
- **Font:** Use a clean sans-serif (Helvetica Neue Bold, Inter Bold, or match Whales Market brand font)
- **Color:** White (#FFFFFF) with subtle drop shadow or glow
- **Animation:** Keep it simple — fade in + slight scale up (100% → 103% over 15 frames)

### For each on-screen text:
1. Create Text Layer
2. Type the text from your script
3. Position: center or lower-third depending on the shot
4. Animate:
   - Opacity: 0% → 100% (10 frames ease)
   - Scale: 98% → 100% (10 frames ease)
   - Hold for the shot duration
   - Opacity: 100% → 0% (10 frames) before next shot

### CTA (Last shot):
- Make it bigger and bolder
- Add a subtle pulse animation (scale 100% → 102% → 100%, loop)
- Include URL: `whales.market`

## 4.5 — Audio Mix

You'll have up to 4 audio layers to manage:

### Layer 1 — Veo 3 Native Audio (from video clips):
- Each Veo 3 clip comes with its own ambient sound/SFX
- **Keep it** — it adds realism and immersion
- **Volume:** -15 dB to -18 dB (subtle background layer)
- If a clip's native audio doesn't fit, mute that specific clip's audio

### Layer 2 — Voice-Over:
- Place VO track and align with the corresponding shots
- **Volume:** 0 dB (full volume, this is the primary audio)
- If VO was generated in sections, align each section to its shot

### Layer 3 — Music:
- **Volume:** -12 dB to -15 dB (sits underneath the VO)
- **Ducking:** Where VO speaks, lower music to -18 dB. Between VO lines, bring music back to -12 dB.
   - Use keyframes on the music layer's Audio Levels
- **Fade in:** 0:00 to 0:01 (1 second fade in)
- **Fade out:** last 2 seconds of the video

### Quick ducking technique in AE:
1. Select music layer
2. Press `L L` (double-tap L) to show Audio Levels
3. Add keyframes:
   - Before VO starts: -12 dB
   - When VO starts: -18 dB (over 10 frames)
   - When VO pauses: -12 dB (over 10 frames)
   - Repeat for each VO section

### Audio priority (loudest to quietest):
1. Voice-Over (0 dB) — always on top
2. Music (-12 to -15 dB) — emotional backbone
3. Veo 3 native SFX (-15 to -18 dB) — subtle texture
4. Adjust to taste — the VO must always be clearly audible

## 4.6 — Color Grading (Optional but recommended)

1. Add **Adjustment Layer** above all video clips
2. Apply **Lumetri Color** effect:
   - Lower the highlights slightly
   - Boost shadows with a blue/teal tint (matches crypto aesthetic)
   - Add slight vignette
3. This makes all shots feel cohesive even if Veo 3 output varies

## 4.7 — Export

1. **Composition** → **Add to Render Queue**
2. Settings:
   - Format: H.264 (MP4)
   - Resolution: 1920x1080
   - Frame Rate: 30fps
   - Bitrate: 15-20 Mbps (high quality for social)
3. Or use **Media Encoder** for H.264 export
4. Save as: `whales-market-30s-final.mp4`

---

# PHASE 5: REVIEW & ITERATE

## 5.1 — Self-Review Checklist

Before showing anyone:

- [ ] Video plays smoothly, no glitches
- [ ] VO is clearly audible over music
- [ ] Text is readable (not too small, enough contrast)
- [ ] Transitions feel smooth
- [ ] Brand colors are consistent
- [ ] CTA is clear at the end
- [ ] Total duration is exactly 30s
- [ ] First 3 seconds are attention-grabbing

## 5.2 — If something needs fixing

Go back to Claude in your project:
```
The video feels too slow in the middle section (shots 3-4).
Suggest how I can make it more dynamic — should I re-prompt
Veo 3 for faster shots, or adjust the edit?
```

Claude will advise whether to re-generate specific shots, adjust timing, or change the edit.

---

# TIMELINE ESTIMATE

| Phase | Task | Time |
|-------|------|------|
| Phase 0 | Setup Claude Project + accounts | 30 min |
| Phase 1 | Creative Direction (in Claude) | 15 min |
| Phase 2 | Script & Storyboard (in Claude) | 15 min |
| Phase 3A | Generate video clips (Veo 3) | 30-45 min |
| Phase 3B | Generate voice-over (ElevenLabs) | 10 min |
| Phase 3C | Generate music (Suno) | 10 min |
| Phase 4 | Compile in After Effects | 30-45 min |
| Phase 5 | Review & iterate | 15 min |
| **Total** | | **~2.5 — 3 hours** |

After the first video, subsequent videos using the same pipeline will take **~1 — 1.5 hours** since the agent and workflow are already set up.

---

# DEMO DAY TIPS

When presenting to BGK:

1. **Show the Claude Project** — open it, show the system prompt, explain the pipeline
2. **Live demo:** Give Claude a NEW brief (not Whales Market) right in front of BGK
3. **Show the multi-option output** — "Here are 3 directions Claude proposed, I picked this one because..."
4. **Play the final video** — this is the hero moment
5. **Show Before vs After:**
   - "This video would normally take 1-2 days with a team. I did it in 2.5 hours alone."
6. **Show AI Showcase:**
   - The system prompt you wrote
   - Key moments where you iterated with Claude to improve prompts
   - How you refined Veo 3 prompts when output wasn't right
7. **Roadmap:** Template library, brand memory, auto-compile, multi-platform export

---

*Build Guide v1.0 — Nguyễn Ngọc Hoà*
