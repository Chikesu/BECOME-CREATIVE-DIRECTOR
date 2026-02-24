import { useState, useCallback, useRef } from "react";

const MODEL = "claude-sonnet-4-20250514";
const SYS = `You are an AI Video Production Director. You take video briefs and produce creative directions, scripts, storyboards, and optimized prompts for AI tools. Be specific. Use professional video terminology. Think like a cinematographer.`;

const P1 = (brief) => `Analyze this brief and propose exactly 3 creative directions.

For EACH direction:
- **Direction Name** (2-3 words)
- **Concept** (1 paragraph)
- **Mood & Tone** (3-5 keywords)
- **Visual Style**
- **Color Palette** (5 hex codes with descriptions)
- **Typography** (font pairing)
- **Reference Vibe**

IMPORTANT: Separate each direction with a line containing only "---"

BRIEF:
${brief}`;

const P2 = (dir, brief) => `Based on this direction, write a complete 30s video production package.

## Script & Storyboard
Table: | Shot # | Time | Duration | Voice-Over | On-Screen Text | Visual Description | Camera |
5-7 shots, each 3-6s. VO concise and punchy. Visuals extremely specific and cinematic.

## Veo 3 Prompts
For each shot, write an optimized Veo 3 prompt (under 150 words): visual style, scene detail, camera movement, lighting, color grading, audio direction (Veo 3 has native audio). Under 150 words each.

## ElevenLabs VO Script
Full compiled VO text in one block. Use ... for pauses, [emphasis] for stress, [slower] for pacing.

## Suno Music Prompts
2-3 prompts: genre, BPM, mood, instruments, duration. Include [instrumental] tag.

DIRECTION:
${dir}

BRIEF:
${brief}`;

const STEPS = [
  { id: "brief", n: "00", title: "Brief Input", sub: "Paste your video brief — this feeds the entire pipeline", color: "#4A9EFF", tool: null, url: null, type: "input", int: "none", btn: "" },
  { id: "dir", n: "01", title: "Creative Direction", sub: "Claude generates 3 directions — pick your favorite", color: "#4A9EFF", tool: "Claude AI", url: null, type: "select", int: "claude1", btn: "✨ Generate Directions" },
  { id: "script", n: "02", title: "Script + All Prompts", sub: "Claude writes script, Veo 3 prompts, VO script, Suno prompts", color: "#4A9EFF", tool: "Claude AI", url: null, type: "single", int: "claude2", btn: "✨ Generate Production Package" },
  { id: "video", n: "3A", title: "Video Clips", sub: "Copy Veo 3 prompts → open Google Flow → paste → generate", color: "#00D4FF", tool: "Google Flow", url: "https://labs.google/flow/about", type: "select", int: "copy", btn: "📋 Copy & Open Flow", par: true },
  { id: "voice", n: "3B", title: "Voice-Over", sub: "ElevenLabs generates audio directly here", color: "#00FF88", tool: "ElevenLabs", url: "https://elevenlabs.io", type: "select", int: "eleven", btn: "🎙️ Generate Voice-Over", par: true },
  { id: "music", n: "3C", title: "Music", sub: "Copy Suno prompts → open Suno → paste → generate", color: "#A855F7", tool: "Suno", url: "https://suno.com", type: "select", int: "copy", btn: "📋 Copy & Open Suno", par: true },
  { id: "comp", n: "04", title: "Compile & Polish", sub: "Assemble in After Effects — video + VO + music + text + transitions", color: "#FF8A00", tool: "After Effects", url: null, type: "single", int: "none", btn: "" },
];

const mkInit = () => STEPS.map(s => ({ id: s.id, pr: "", out: [], sel: null, done: false, exp: true, err: null }));

function exSec(text, kw) {
  const m = text.match(new RegExp(`##?[^\\n]*${kw}[^\\n]*\\n([\\s\\S]*?)(?=\\n##|$)`, "i"));
  return m ? m[1].trim() : "";
}

async function callClaude(prompt) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 4096, system: SYS, messages: [{ role: "user", content: prompt }] }),
  });
  if (!r.ok) throw new Error(`Claude error ${r.status}`);
  const d = await r.json();
  return d.content.map(c => c.text || "").join("\n");
}

async function callEleven(text, key, vid) {
  if (!key) throw new Error("Enter ElevenLabs API key first");
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${vid || "pNInz6obpgDQGcFmaJgB"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": key },
    body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.65, similarity_boost: 0.75, style: 0.35 } }),
  });
  if (!r.ok) throw new Error(`ElevenLabs error ${r.status}`);
  return URL.createObjectURL(await r.blob());
}

const Chk = () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Ext = () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M5 1H2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V7M7 1h4m0 0v4m0-4L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Del = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M4.5 3V2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M9 3v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>;

export default function App() {
  const [S, setS] = useState(mkInit);
  const [ld, setLd] = useState({});
  const [toast, setToast] = useState(null);
  const [ek, setEk] = useState("");
  const [ev, setEv] = useState("");
  const [showK, setShowK] = useState(false);
  const refs = useRef({});

  const up = useCallback((i, p) => setS(v => v.map((s, j) => j === i ? { ...s, ...p } : s)), []);
  const upM = useCallback((ps) => setS(v => v.map((s, j) => ps[j] ? { ...s, ...ps[j] } : s)), []);
  const tt = (m) => { setToast(m); setTimeout(() => setToast(null), 2500); };

  const lk = (i) => {
    if (!i) return false;
    const st = STEPS[i];
    if (st.par) return !S[2].done;
    if (st.id === "comp") return !STEPS.every((s, j) => !s.par || S[j].done);
    const p = S[i - 1], ps = STEPS[i - 1];
    return ps.type === "select" ? !p.done || p.sel === null : !p.done;
  };

  const dn = S.filter(s => s.done).length;
  const pct = Math.round((dn / S.length) * 100);

  const gen = async (i) => {
    const st = STEPS[i];
    setLd(p => ({ ...p, [i]: true }));
    up(i, { err: null });
    try {
      if (st.int === "claude1") {
        const b = S[0].pr;
        if (!b) throw new Error("Fill in Brief (Step 00) first");
        const res = await callClaude(P1(b));
        const pts = res.split(/\n---\n/).filter(p => p.trim());
        up(i, { out: pts.length >= 2 ? pts.map((p, j) => ({ text: p.trim(), id: Date.now() + j })) : [{ text: res.trim(), id: Date.now() }], sel: null });
      } else if (st.int === "claude2") {
        const b = S[0].pr, di = S[1].sel;
        if (di === null) throw new Error("Select a direction (Step 01) first");
        const res = await callClaude(P2(S[1].out[di]?.text || "", b));
        const veo = exSec(res, "Veo"), vo = exSec(res, "ElevenLabs|VO Script"), suno = exSec(res, "Suno");
        const ps = { [i]: { out: [{ text: res.trim(), id: Date.now() }], sel: 0 } };
        if (veo) ps[3] = { pr: veo };
        if (vo) ps[4] = { pr: vo };
        if (suno) ps[5] = { pr: suno };
        upM(ps);
      } else if (st.int === "eleven") {
        const txt = S[i].pr || exSec(S[2].out[0]?.text || "", "ElevenLabs|VO Script");
        if (!txt) throw new Error("No VO script — complete Step 02 first");
        const url = await callEleven(txt, ek, ev);
        up(i, { pr: txt, out: [...S[i].out, { text: "🎙️ Voice-Over Audio", id: Date.now(), au: url }] });
      } else if (st.int === "copy") {
        const kw = st.id === "video" ? "Veo" : "Suno";
        const txt = S[i].pr || exSec(S[2].out[0]?.text || "", kw);
        if (!txt) throw new Error("No prompts — complete Step 02 first");
        up(i, { pr: txt });
        await navigator.clipboard.writeText(txt);
        tt("✓ Copied! Paste in " + st.tool);
        if (st.url) setTimeout(() => window.open(st.url, "_blank"), 400);
      }
    } catch (e) { up(i, { err: e.message }); }
    setLd(p => ({ ...p, [i]: false }));
  };

  const addO = (i) => {
    const el = refs.current[i]; if (!el) return;
    const v = el.value.trim(); if (!v) return;
    const no = [...S[i].out, { text: v, id: Date.now() }];
    up(i, { out: no, sel: STEPS[i].type === "single" && no.length === 1 ? 0 : S[i].sel });
    el.value = "";
  };

  const rmO = (i, j) => {
    const out = S[i].out.filter((_, k) => k !== j);
    let sel = S[i].sel;
    if (sel === j) sel = null; else if (sel > j) sel--;
    up(i, { out, sel });
  };

  const inp = { width: "100%", padding: 12, borderRadius: 10, border: "1px solid #1E2235", background: "#0C0E18", color: "#E8ECF4", fontFamily: "monospace", fontSize: 11, lineHeight: 1.6, resize: "vertical", outline: "none" };
  const mono = { fontFamily: "monospace" };

  return (
    <div style={{ minHeight: "100vh", background: "#08090E", color: "#E8ECF4", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(#1E2235 1px,transparent 1px),linear-gradient(90deg,#1E2235 1px,transparent 1px)", backgroundSize: "60px 60px", opacity: 0.08, pointerEvents: "none" }} />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px 100px", position: "relative", zIndex: 1 }}>

        <div style={{ ...mono, fontSize: 10, letterSpacing: 4, color: "#00D4FF", marginBottom: 10, opacity: 0.7 }}>PIPELINE WORKSPACE</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: "#E8ECF4" }}>AI Video Production</h1>
            <p style={{ fontSize: 13, color: "#7A8299", marginTop: 6 }}>Claude & ElevenLabs integrated · Flow & Suno auto-prompted</p>
          </div>
          <button onClick={() => { if (confirm("Reset all?")) { setS(mkInit()); setLd({}); } }} style={{ ...mono, fontSize: 10, padding: "6px 14px", borderRadius: 6, border: "1px solid #2A3050", background: "transparent", color: "#4A5068", cursor: "pointer" }}>Reset All</button>
        </div>

        {/* Keys */}
        <div style={{ marginTop: 14 }}>
          <button onClick={() => setShowK(!showK)} style={{ ...mono, fontSize: 10, padding: "6px 14px", borderRadius: 8, border: "1px solid #1E2235", background: "#111320", color: "#7A8299", cursor: "pointer" }}>🔑 {showK ? "Hide" : "Show"} API Settings</button>
          {showK && (
            <div style={{ marginTop: 10, padding: 16, borderRadius: 12, background: "#111320", border: "1px solid #1E2235", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ ...mono, fontSize: 10, color: "#4A5068", marginBottom: 4 }}>ELEVENLABS API KEY</div>
                <input type="password" value={ek} onChange={e => setEk(e.target.value)} placeholder="Paste key" style={{ ...inp, padding: "8px 12px" }} />
              </div>
              <div>
                <div style={{ ...mono, fontSize: 10, color: "#4A5068", marginBottom: 4 }}>VOICE ID <span style={{ opacity: 0.5 }}>(default: Adam)</span></div>
                <input value={ev} onChange={e => setEv(e.target.value)} placeholder="pNInz6obpgDQGcFmaJgB" style={{ ...inp, padding: "8px 12px" }} />
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div style={{ margin: "20px 0 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", ...mono, fontSize: 10, color: "#4A5068", marginBottom: 6 }}>
            <span>PROGRESS</span>
            <span style={{ color: pct === 100 ? "#00FF88" : "#7A8299" }}>{dn}/{S.length} · {pct}%</span>
          </div>
          <div style={{ width: "100%", height: 4, background: "#1E2235", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "linear-gradient(90deg,#00FF88,#00D4FF)" : "linear-gradient(90deg,#4A9EFF,#00D4FF)", borderRadius: 2, transition: "width 0.5s" }} />
          </div>
        </div>

        {/* Steps */}
        {STEPS.map((st, i) => {
          const s = S[i], locked = lk(i), il = ld[i], isPS = st.par && !STEPS[i - 1]?.par, hasN = i < STEPS.length - 1, nc = hasN ? STEPS[i + 1].color : "#4A9EFF";
          return (
            <div key={st.id}>
              {isPS && <div style={{ textAlign: "center", margin: "4px 0 14px" }}><span style={{ ...mono, fontSize: 10, letterSpacing: 3, color: "#00D4FF", background: "#08090E", padding: "4px 14px", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 20 }}>⚡ STEP 3 — PARALLEL</span></div>}

              <div style={{ background: s.done ? "rgba(0,255,136,0.03)" : "#111320", border: `1px solid ${s.done ? "rgba(0,255,136,0.2)" : "#1E2235"}`, borderRadius: 14, overflow: "hidden", opacity: locked ? 0.3 : 1, pointerEvents: locked ? "none" : "auto", transition: "all 0.3s" }}>

                <div onClick={() => up(i, { exp: !s.exp })} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", cursor: "pointer" }}>
                  <span style={{ ...mono, fontSize: 11, fontWeight: 600, padding: "3px 11px", borderRadius: 14, background: st.color + "18", color: st.color, border: `1px solid ${st.color}40`, flexShrink: 0 }}>{st.n}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{st.title}</div>
                    {!s.exp && <div style={{ fontSize: 11, color: "#7A8299", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{st.sub}</div>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    {st.tool && st.url && <a href={st.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ ...mono, fontSize: 10, padding: "4px 10px", borderRadius: 6, background: st.color + "12", border: `1px solid ${st.color}30`, color: st.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}><Ext /> {st.tool}</a>}
                    {st.tool && !st.url && <span style={{ ...mono, fontSize: 10, padding: "4px 10px", borderRadius: 6, background: st.color + "12", border: `1px solid ${st.color}30`, color: st.color }}>{st.tool}</span>}
                    <button onClick={e => { e.stopPropagation(); up(i, { done: !s.done, err: null }); }} style={{ width: 26, height: 26, borderRadius: 7, border: s.done ? "1px solid rgba(0,255,136,0.4)" : "1px solid #2A3050", background: s.done ? "rgba(0,255,136,0.15)" : "transparent", color: s.done ? "#00FF88" : "#4A5068", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Chk /></button>
                    <span style={{ color: "#4A5068", fontSize: 11, transform: s.exp ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
                  </div>
                </div>

                {s.exp && (
                  <div style={{ padding: "0 18px 18px", borderTop: "1px solid #1a1d2e" }}>
                    <div style={{ fontSize: 13, color: "#7A8299", margin: "12px 0 14px", lineHeight: 1.5 }}>{st.sub}</div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ ...mono, fontSize: 10, letterSpacing: 2, color: "#4A5068", marginBottom: 6 }}>{st.type === "input" ? "BRIEF" : "PROMPT"}</div>
                      <textarea rows={st.type === "input" ? 6 : 3} value={s.pr} onChange={e => up(i, { pr: e.target.value, err: null })} placeholder={st.type === "input" ? "Paste your video brief here...\n\n- Product: Whales Market\n- Purpose: Launch video\n- Tone: Bold, futuristic\n- Duration: 30s\n- Key message: Trade the future" : "Auto-generated or paste manually..."} style={inp} />

                      {(st.int === "claude1" || st.int === "claude2" || st.int === "eleven") && (
                        <button disabled={il} onClick={() => gen(i)} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: st.color, color: "#08090E", fontSize: 14, fontWeight: 600, cursor: il ? "not-allowed" : "pointer", opacity: il ? 0.6 : 1, marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          {il ? <><span style={{ width: 16, height: 16, border: "2px solid transparent", borderTop: "2px solid #08090E", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> Generating...</> : st.btn}
                        </button>
                      )}
                      {st.int === "copy" && (
                        <button onClick={() => gen(i)} style={{ width: "100%", padding: 12, borderRadius: 10, border: `1px solid ${st.color}50`, background: "transparent", color: st.color, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 10 }}>{st.btn}</button>
                      )}
                      {s.err && <div style={{ marginTop: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(255,51,102,0.08)", border: "1px solid rgba(255,51,102,0.2)", color: "#FF3366", fontSize: 12, ...mono }}>⚠ {s.err}</div>}
                    </div>

                    {st.type !== "input" && (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", ...mono, fontSize: 10, letterSpacing: 2, color: "#4A5068", marginBottom: 8 }}>
                          <span>{st.type === "select" ? "OPTIONS (CLICK TO SELECT)" : "OUTPUT"}</span>
                          {s.out.length > 0 && st.type === "select" && <span style={{ color: s.sel !== null ? "#00FF88" : "#FF8A00" }}>{s.sel !== null ? `✓ Option ${s.sel + 1}` : "⚠ Pick one"}</span>}
                        </div>
                        {s.out.map((o, j) => {
                          const iS = s.sel === j;
                          return (
                            <div key={o.id} onClick={() => st.type === "select" && up(i, { sel: j })} style={{ padding: 12, borderRadius: 8, background: iS ? st.color + "0A" : "#0C0E18", border: `1px solid ${iS ? st.color + "50" : "#1E2235"}`, display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, cursor: st.type === "select" ? "pointer" : "default" }}>
                              {st.type === "select" && <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${iS ? st.color : "#2A3050"}`, background: iS ? st.color : "transparent", flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>{iS && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#08090E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>}
                              <div style={{ flex: 1 }}>
                                <div style={{ ...mono, fontSize: 10, color: iS ? st.color : "#4A5068", marginBottom: 4 }}>{st.type === "select" ? `Option ${j + 1}` : "Result"}</div>
                                <div style={{ fontSize: 12, color: "#B8BDD0", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{o.text}</div>
                                {o.au && <audio controls src={o.au} style={{ width: "100%", height: 40, marginTop: 8 }} />}
                              </div>
                              <button onClick={e => { e.stopPropagation(); rmO(i, j); }} style={{ background: "none", border: "none", color: "#4A5068", cursor: "pointer", padding: 4, opacity: 0.4 }}><Del /></button>
                            </div>
                          );
                        })}
                        <div style={{ display: "flex", gap: 8 }}>
                          <textarea ref={el => { refs.current[i] = el; }} rows={2} placeholder="Add manually..." onKeyDown={e => { if (e.key === "Enter" && e.metaKey) { e.preventDefault(); addO(i); } }} style={{ ...inp, flex: 1, minHeight: 48 }} />
                          <button onClick={() => addO(i)} style={{ padding: "8px 14px", borderRadius: 8, background: st.color + "15", border: `1px solid ${st.color}40`, color: st.color, cursor: "pointer", ...mono, fontSize: 11, whiteSpace: "nowrap", alignSelf: "flex-end" }}>+ Add</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {hasN && (st.par && STEPS[i + 1]?.par
                ? <div style={{ height: 10 }} />
                : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "6px 0" }}>
                    <div style={{ width: 2, height: 32, background: `linear-gradient(180deg, #1E2235, ${nc})` }} />
                    <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `7px solid ${nc}` }} />
                  </div>
              )}
            </div>
          );
        })}

        {pct === 100 && (
          <div style={{ marginTop: 30, padding: "20px 24px", borderRadius: 14, background: "linear-gradient(135deg, rgba(0,255,136,0.06), rgba(0,212,255,0.04))", border: "1px solid rgba(0,255,136,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎬</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#00FF88" }}>Pipeline Complete!</div>
            <div style={{ fontSize: 13, color: "#7A8299", marginTop: 4 }}>All steps done — your video is ready</div>
          </div>
        )}
      </div>

      {toast && <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "#111320", border: "1px solid #00FF88", color: "#00FF88", padding: "10px 24px", borderRadius: 10, ...mono, fontSize: 12, zIndex: 999 }}>{toast}</div>}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
