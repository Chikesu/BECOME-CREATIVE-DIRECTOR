# 🎬 AI Video Production Pipeline

> **Designer × AI = Creative Director** — Biến 1 brief thành video 30s hoàn chỉnh trong dưới 1 giờ.

<div align="center">
<img src="assets/screenshot.png" width="800" alt="AI Video Production Pipeline Workspace">
<br><br>

| ⏱️ Trước: **2–4 tuần** (5-7 người) | ⚡ Sau: **< 1 giờ** (1 người + AI) |
|:---:|:---:|

</div>

---

## What is this?

Single HTML file kết nối **5 AI tools** thành 1 pipeline sản xuất video tự động:

```
00 Brief Input          → Paste brief + upload brand images
01 Creative Direction   → 3 directions with color palettes         🤖 Claude API
02 Script & Storyboard  → Formatted table + revision loop          🤖 Claude API
03 Generate Prompts     → Auto-generates Veo + VO + Suno prompts   🤖 Claude API
4A Video Clips          → Per-shot cards, copy & open Flow         📋 Google Flow
4B Voice-Over           → Generate audio directly in workspace     🎤 ElevenLabs API
4C Music                → Per-track cards, copy & open Suno        📋 Suno
05 Compile & Polish     → Auto-generate After Effects .jsx script  ⚡ After Effects
```

---

## Key Features

- 🔗 **Direct API** — Claude + ElevenLabs gọi trực tiếp từ browser, không cần backend
- 🎬 **Per-Shot / Per-Track Cards** — Mỗi shot & track có nút copy riêng
- 🎯 **Smart Auto-fill** — Step 03 done → prompts tự điền vào 4A, 4B, 4C
- 🔄 **Script Revision Loop** — Gõ feedback → Claude rewrite → iterate
- 🎨 **Veo 3 Optimized** — Prompts theo best practices, consistency anchors
- ⚡ **AE Auto-Assembly** — 1 click generate .jsx → import, timeline, transitions, text overlays
- 🖼️ **Vision Analysis** — Upload brand images → Claude analyze → inform direction

---

## Quick Start

1. Mở `pipeline-workspace.html` trong Chrome
2. Nhập API keys (Claude + ElevenLabs) ở Settings
3. Paste brief → bấm Generate từng step → done

---

<div align="center">

*Built with 🐋 for Become Creative Director — Cook Series*

</div>
