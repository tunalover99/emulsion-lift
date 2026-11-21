/* Small Web Audio toolkit for the theory pages: a two-octave keyboard and a metronome. */
(function () {
  let ctx = null, master = null;
  function ac() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0.55;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp); comp.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  const freq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  function tone(midi, when, dur = 0.6, vel = 0.5) {
    const c = ac();
    const t = c.currentTime + when;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.012);
    g.gain.exponentialRampToValueAtTime(vel * 0.35, t + 0.25);
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur + 0.5);
    const f = freq(midi);
    [[1, "triangle", 1], [2, "sine", 0.28], [3, "sine", 0.08]].forEach(([m, type, a]) => {
      const o = c.createOscillator(); const og = c.createGain();
      o.type = type; o.frequency.value = f * m; og.gain.value = a;
      o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 0.6);
    });
    g.connect(master);
  }
  function click(when, accent) {
    const c = ac(); const t = c.currentTime + when;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = "square"; o.frequency.value = accent ? 1760 : 1100;
    g.gain.setValueAtTime(accent ? 0.35 : 0.18, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.06);
  }

  /* ---------- keyboard ---------- */
  const NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
  const SOL = ["도", "", "레", "", "미", "파", "", "솔", "", "라", "", "시"];
  const BLACK = new Set([1, 3, 6, 8, 10]);
  const LOW = 60; // C4

  function keyboard(host) {
    const whites = [], blacks = [];
    for (let m = LOW; m < LOW + 25; m++) (BLACK.has(m % 12) ? blacks : whites).push(m);
    const kb = document.createElement("div");
    kb.className = "kb";
    kb.innerHTML = whites.map((m) => `<div class="wk" data-m="${m}"><span>${m % 12 === 0 ? "C" + (Math.floor(m / 12) - 1) : SOL[m % 12]}</span></div>`).join("");
    const w = 100 / whites.length;
    blacks.forEach((m) => {
      const idx = whites.indexOf(m - 1);
      const b = document.createElement("div");
      b.className = "bk"; b.dataset.m = m;
      b.style.left = `calc(${(idx + 1) * w}% - ${w * 0.3}%)`; b.style.width = w * 0.6 + "%";
      kb.appendChild(b);
    });
    kb.addEventListener("pointerdown", (e) => {
      const k = e.target.closest("[data-m]"); if (!k) return;
      const m = +k.dataset.m; tone(m, 0, 0.5); flash([m], 0, 0.4);
    });
    host.appendChild(kb);
    function keyEl(m) { return kb.querySelector(`[data-m="${m}"]`); }
    function flash(ms, when, dur) {
      setTimeout(() => ms.forEach((m) => keyEl(m)?.classList.add("hit")), when * 1000);
      setTimeout(() => ms.forEach((m) => keyEl(m)?.classList.remove("hit")), (when + dur) * 1000);
    }
    function mark(ms) { kb.querySelectorAll(".mark").forEach((k) => k.classList.remove("mark")); ms.forEach((m) => keyEl(m)?.classList.add("mark")); }
    return { flash, mark };
  }

  function seq(kb, steps, gap = 0.32) {
    // steps: array of arrays (chords) of midi numbers
    let t = 0;
    steps.forEach((ch) => {
      ch.forEach((m) => tone(m, t, gap * (ch.length > 1 ? 2.2 : 1.1), ch.length > 1 ? 0.3 : 0.5));
      kb.flash(ch, t, gap * (ch.length > 1 ? 2 : 0.9));
      t += ch.length > 1 ? gap * 2.4 : gap;
    });
    kb.mark([...new Set(steps.flat())]);
  }
  const up = (root, ivs) => ivs.map((i) => [root + i]);

  const SCALES = {
    major: [0, 2, 4, 5, 7, 9, 11, 12],
    natMinor: [0, 2, 3, 5, 7, 8, 10, 12],
    harmMinor: [0, 2, 3, 5, 7, 8, 11, 12],
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    wholeTone: [0, 2, 4, 6, 8, 10, 12],
    penta: [0, 2, 4, 7, 9, 12]
  };

  const DEMOS = {
    majorminor: {
      title: "C 장조와 C 단조를 비교해 들어 보세요",
      items: [
        { k: "C 장음계", cap: "도-레-미-파-솔-라-시-도. 3음(미)이 으뜸음에서 반음 4개 위.", run: (kb) => seq(kb, up(LOW, SCALES.major)) },
        { k: "C 단음계 (자연)", cap: "도-레-미♭-파-솔-라♭-시♭-도. 3음(미♭)이 반음 3개 위.", run: (kb) => seq(kb, up(LOW, SCALES.natMinor)) },
        { k: "C 장3화음", cap: "도-미-솔을 차례로, 그리고 함께.", run: (kb) => seq(kb, [[60], [64], [67], [60, 64, 67]], 0.34) },
        { k: "C 단3화음", cap: "도-미♭-솔. 단 한 음(3음)만 달라졌습니다.", run: (kb) => seq(kb, [[60], [63], [67], [60, 63, 67]], 0.34) }
      ]
    },
    scales: {
      title: "여러 가지 음계",
      items: [
        { k: "장음계", cap: "온-온-반-온-온-온-반", run: (kb) => seq(kb, up(LOW, SCALES.major)) },
        { k: "화성단음계", cap: "7음을 반음 올려 으뜸음으로 끌려가는 힘을 만든 단음계. 6–7음 사이가 넓게 벌어집니다.", run: (kb) => seq(kb, up(LOW, SCALES.harmMinor)) },
        { k: "반음계", cap: "12개 음을 모두 반음씩.", run: (kb) => seq(kb, up(LOW, SCALES.chromatic), 0.2) },
        { k: "온음음계", cap: "모든 간격이 온음. 중심이 흐릿한, 떠다니는 느낌 — 드뷔시의 색채.", run: (kb) => seq(kb, up(LOW, SCALES.wholeTone)) },
        { k: "5음음계", cap: "도-레-미-솔-라. 반음이 없어 민요처럼 소박하게 들립니다.", run: (kb) => seq(kb, up(LOW, SCALES.penta)) }
      ]
    },
    intervals: {
      title: "도(C4)에서 시작하는 음정",
      items: [
        ["단2도", 1, "반음 1개 · 날카롭게 부딪힘"], ["장3도", 4, "반음 4개 · 장조의 색"], ["단3도", 3, "반음 3개 · 단조의 색"],
        ["완전4도", 5, "반음 5개"], ["증4도 (트라이톤)", 6, "반음 6개 · 매우 불안정"], ["완전5도", 7, "반음 7개 · 가장 안정적인 협화음 중 하나"], ["옥타브", 12, "반음 12개 · 같은 음이름"]
      ].map(([k, n, cap]) => ({ k, cap, run: (kb) => seq(kb, [[60], [60 + n], [60, 60 + n]], 0.45) }))
    },
    chords: {
      title: "화음과 진행",
      items: [
        { k: "I – IV – V – I", cap: "C – F – G – C. 출발 → 긴장 → 해결. 조성 음악의 기본 문장.", run: (kb) => seq(kb, [[60, 64, 67], [65, 69, 72], [67, 71, 74], [60, 64, 67, 72]], 0.42) },
        { k: "V7 → I (정격종지)", cap: "G7(솔-시-레-파)의 트라이톤(시-파)이 도-미로 풀리며 ‘끝났다’는 느낌을 만듭니다.", run: (kb) => seq(kb, [[67, 71, 74, 77], [72, 76, 79]], 0.5) },
        { k: "I → V (반종지)", cap: "딸림화음에서 멈추면 쉼표처럼, 아직 이야기가 이어질 것처럼 들립니다.", run: (kb) => seq(kb, [[60, 64, 67], [67, 71, 74]], 0.5) },
        { k: "V → vi (거짓종지)", cap: "으뜸화음 대신 A단조로 ‘빗나가는’ 진행. 기대를 살짝 배반합니다.", run: (kb) => seq(kb, [[67, 71, 74], [69, 72, 76]], 0.5) }
      ]
    }
  };

  function mountDemo(host, id) {
    if (id === "metronome") return metronome(host);
    const d = DEMOS[id]; if (!d) return;
    host.innerHTML = `<div class="demo-head"><b>🎹 ${d.title}</b><span class="small muted">건반을 직접 눌러도 됩니다</span></div>`;
    const kb = keyboard(host);
    const chips = document.createElement("div"); chips.className = "chips";
    chips.innerHTML = d.items.map((it, i) => `<button class="chip" data-i="${i}">▶ ${it.k}</button>`).join("");
    const cap = document.createElement("div"); cap.className = "demo-cap"; cap.textContent = "버튼을 누르면 소리가 납니다.";
    host.append(chips, cap);
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-i]"); if (!b) return;
      chips.querySelectorAll(".on").forEach((x) => x.classList.remove("on")); b.classList.add("on");
      const it = d.items[+b.dataset.i]; cap.textContent = it.cap; it.run(kb);
    });
  }

  /* ---------- metronome ---------- */
  const METERS = {
    "2/4": { beats: 2, acc: [0], cap: "강–약. 행진곡처럼 둘로 걷는 느낌." },
    "3/4": { beats: 3, acc: [0], cap: "강–약–약. 왈츠, 미뉴에트, 마주르카." },
    "4/4": { beats: 4, acc: [0], half: [2], cap: "강–약–중강–약. 가장 흔한 박자." },
    "6/8": { beats: 6, acc: [0], half: [3], cap: "셋씩 묶인 두 박: (강-약-약)(중강-약-약). 흔들리는 뱃노래 같은 느낌." },
    "5/4": { beats: 5, acc: [0], half: [3], cap: "3 + 2로 나뉘는 불규칙 박자. 차이콥스키 〈비창〉 2악장." }
  };
  function metronome(host) {
    host.innerHTML = `<div class="demo-head"><b>⏱ 박자와 템포 메트로놈</b><span class="small muted">강세 위치를 귀로 확인해 보세요</span></div>
      <div class="chips" data-meters>${Object.keys(METERS).map((m, i) => `<button class="chip${i === 1 ? " on" : ""}" data-m="${m}">${m}</button>`).join("")}</div>
      <div class="metro" data-beats></div>
      <div class="range"><label for="bpm">템포</label><input id="bpm" type="range" min="40" max="200" value="96" data-bpm><span class="mono" data-bpmv>♩ = 96</span><span class="muted" data-tname></span></div>
      <div class="actions" style="margin-top:14px"><button class="btn sm" data-go>▶ 시작</button></div>
      <div class="demo-cap" data-cap>${METERS["3/4"].cap}</div>`;
    let meter = "3/4", bpm = 96, timer = null, beat = 0, next = 0;
    const beatsEl = host.querySelector("[data-beats]");
    const tname = (b) => b < 50 ? "Largo · Grave" : b < 66 ? "Adagio · Lento" : b < 80 ? "Andante" : b < 100 ? "Moderato" : b < 116 ? "Allegretto" : b < 160 ? "Allegro" : b < 180 ? "Vivace" : "Presto";
    function drawBeats() {
      const M = METERS[meter];
      beatsEl.innerHTML = Array.from({ length: M.beats }, (_, i) => `<span class="beat${M.acc.includes(i) || (M.half || []).includes(i) ? " acc" : ""}">${i + 1}</span>`).join("");
      host.querySelector("[data-cap]").textContent = M.cap;
    }
    function tick() {
      const c = ac(); const M = METERS[meter];
      const spb = (meter === "6/8" ? 30 : 60) / bpm; // 6/8: 8th-note pulses at double speed
      while (next < c.currentTime + 0.12) {
        const i = beat % M.beats; const when = Math.max(0, next - c.currentTime);
        click(when, M.acc.includes(i));
        if ((M.half || []).includes(i)) click(when, false);
        setTimeout(() => { beatsEl.querySelectorAll(".beat").forEach((b, j) => b.classList.toggle("now", j === i)); }, when * 1000);
        next += spb; beat++;
      }
    }
    function start() { const c = ac(); beat = 0; next = c.currentTime + 0.05; timer = setInterval(tick, 25); host.querySelector("[data-go]").textContent = "■ 정지"; }
    function stop() { clearInterval(timer); timer = null; host.querySelector("[data-go]").textContent = "▶ 시작"; beatsEl.querySelectorAll(".now").forEach((b) => b.classList.remove("now")); }
    host.querySelector("[data-go]").onclick = () => (timer ? stop() : start());
    host.querySelector("[data-meters]").onclick = (e) => {
      const b = e.target.closest("[data-m]"); if (!b) return;
      host.querySelectorAll("[data-m]").forEach((x) => x.classList.toggle("on", x === b)); meter = b.dataset.m; beat = 0; drawBeats();
    };
    const r = host.querySelector("[data-bpm]");
    r.oninput = () => { bpm = +r.value; host.querySelector("[data-bpmv]").textContent = "♩ = " + bpm; host.querySelector("[data-tname]").textContent = tname(bpm); };
    r.oninput(); drawBeats();
    host._cleanup = stop;
  }

  window.OA = window.OA || {};
  OA.audio = { mountDemo, tone };
})();
