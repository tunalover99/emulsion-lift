/* Opus Atlas — single-page app (hash routing, no build step). */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const idx = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
  const C = idx(OA.composers), W = idx(OA.works), G = idx(OA.genres), E = idx(OA.eras), TH = idx(OA.theory),
    T = idx(OA.glossary), P = idx(OA.performers), CAT = idx(OA.catalogs);
  const ERA_ORDER = OA.eras.map((e) => e.id);
  const workEra = (w) => C[w.composer].era;

  /* ---------- icons ---------- */
  const I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a.5.5 0 0 0 .76.43l10.4-6.5a.5.5 0 0 0 0-.86L8.76 5.07A.5.5 0 0 0 8 5.5Z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>',
    starF: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    shelf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 4v16M9 4v16M13.5 4.5l4.5 15"/><path d="M3 20h18"/></svg>'
  };

  /* ---------- storage (per-browser conveniences) ---------- */
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem("oa:" + k)); return v ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("oa:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  const has = (k, id) => store.get(k, []).includes(id);
  const toggle = (k, id) => { const a = store.get(k, []); const i = a.indexOf(id); i < 0 ? a.push(id) : a.splice(i, 1); store.set(k, a); return i < 0; };

  /* ---------- formatting ---------- */
  const KEY_LETTER = { C: "다", D: "라", E: "마", F: "바", G: "사", A: "가", B: "나" };
  function keyInfo(k) {
    if (!k) return null;
    const m = k.match(/^([A-G])([b#]?) (major|minor)$/); if (!m) return null;
    const acc = m[2] === "b" ? "내림" : m[2] === "#" ? "올림" : "";
    return { ko: acc + KEY_LETTER[m[1]] + (m[3] === "major" ? "장조" : "단조"), en: m[1] + (m[2] === "b" ? "♭" : m[2] === "#" ? "♯" : "") + " " + m[3], mode: m[3] };
  }
  const catText = (w) => w.cat.length ? w.cat.map((c) => c.t).join(" · ") : "작품 번호 없음";
  const yrs = (c) => `${c.born}–${c.died}`;
  const compact = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[\s.\-·,'’()〈〉《》「」‘’“”:;/]/g, "");

  function label(kind, id) {
    switch (kind) {
      case "c": return C[id]?.short; case "w": return W[id]?.ko; case "g": return G[id]?.ko; case "e": return E[id]?.ko;
      case "th": return TH[id]?.ko; case "t": return T[id]?.term; case "p": return P[id]?.ko; case "cat": return CAT[id]?.abbr;
    }
  }
  function route(kind, id) {
    return { c: "#/composers/", w: "#/works/", g: "#/genres/", e: "#/eras/", th: "#/theory/", t: "#/glossary/", p: "#/performers/", cat: "#/catalog/" }[kind] + id;
  }
  function rich(s) {
    return String(s || "").replace(/\[\[(\w+):([\w-]+)(?:\|([^\]]+))?\]\]/g, (_, k, id, lbl) => {
      const text = lbl || label(k, id) || id;
      if (k === "t") return `<button type="button" class="term" data-term="${id}">${text}</button>`;
      return `<a class="lk" href="${route(k, id)}">${text}</a>`;
    });
  }
  const eraTag = (id) => `<a class="era-tag" data-era="${id}" href="#/eras/${id}">${E[id].ko}</a>`;

  /* ---------- catalogue reading ---------- */
  function readCat(c) {
    const t = c.t; let m;
    switch (c.s) {
      case "op":
        if ((m = t.match(/Op\. posth\. (\d+)/))) return `사후 출판에 붙은 작품번호 ${m[1]}`;
        if ((m = t.match(/Op\. (\d+)(a?)(?: No\. (\d+))?/))) return `작품번호 ${m[1]}${m[2] ? "a (같은 번호의 다른 판본)" : ""}${m[3] ? `로 묶인 작품집의 ${m[3]}번째 곡` : ""}`;
        return "작품번호";
      case "k": return (m = t.match(/K\. (\d+)(?: \((\w+)\))?/)) ? `쾨헬 목록 ${m[1]}번${m[2] ? ` · 괄호 안 ${m[2]}은 개정판 번호` : ""}` : "쾨헬 목록";
      case "d": return `도이치 목록 ${t.replace("D. ", "")}번`;
      case "bwv": return (m = t.match(/BWV (\d+)–(\d+)/)) ? `바흐 작품 목록 ${m[1]}번부터 ${m[2]}번까지의 곡 묶음` : `바흐 작품 목록 ${t.replace("BWV ", "")}번`;
      case "rv": return `리옴 목록 ${t.replace("RV ", "")}번`;
      case "s": return (m = t.match(/S\. (\d+)\/(\d+)/)) ? `설 목록 ${m[1]}번 작품집의 ${m[2]}번째 곡` : `설 목록 ${t.replace("S. ", "")}번`;
      case "l": return `레쥐르 목록(1977년판) ${t.replace("L. ", "")}번`;
      case "woo": return (m = t.match(/WoO (\d+) No\. (\d+)/)) ? `작품번호 없는 작품 목록 ${m[1]}번 묶음의 ${m[2]}번째 곡` : `작품번호 없는 작품 목록 ${t.replace("WoO ", "")}번`;
      case "m": return `마르나 목록 ${t.replace("M. ", "")}번`;
    }
    return "";
  }

  /* ---------- shared bits ---------- */
  function listenBtn(queries, lbl, text = "듣기") {
    return `<button type="button" class="listen" data-listen='${esc(JSON.stringify(queries))}' data-label="${esc(lbl)}">${I.play}${text}</button>`;
  }
  const workQueries = (w) => [w.am, `${C[w.composer].latin} ${w.en}`];
  function perfQ(p) {
    const special = { imusici: "I Musici", giardino: "Il Giardino Armonico", biondi: "Europa Galante", "rachmaninoff-p": "Rachmaninoff", "fischer-dieskau": "Fischer-Dieskau", cho: "Seong-Jin Cho", yoyoma: "Yo-Yo Ma", chung: "Kyung Wha Chung", ckleiber: "Carlos Kleiber", karlrichter: "Karl Richter", richter: "Sviatoslav Richter", michelangeli: "Michelangeli" };
    return special[p.id] || p.en.split(" ").pop();
  }
  const recQueries = (w, r) => { const q = perfQ(P[r.p[0]]); return [`${q} ${w.am}`, `${q} ${C[w.composer].latin} ${w.en}`, w.am]; };

  function wrow(w) {
    const c = C[w.composer]; const k = keyInfo(w.key);
    return `<div class="wrow" data-era="${c.era}">
      <span class="bar"></span>
      <a class="t" href="#/works/${w.id}"><b>${esc(w.ko)}</b><span>${c.short} · ${esc(w.year)}</span></a>
      <div class="meta"><span class="mono">${esc(catText(w))}</span>${k ? k.ko : esc(w.keyNote || "")}${w.genre[0] ? " · " + G[w.genre[0]].ko : ""}</div>
      <div class="state">${has("favs", w.id) ? `<span class="on" title="즐겨찾기">${I.starF}</span>` : ""}${has("done", w.id) ? `<span class="on" title="감상 완료">${I.check}</span>` : ""}</div>
      ${listenBtn(workQueries(w), `${c.short} · ${w.ko}`)}
    </div>`;
  }
  function workCard(w) {
    const c = C[w.composer];
    return `<a class="card era-edge" data-era="${c.era}" href="#/works/${w.id}">
      <span class="idx">${esc(catText(w))}</span><h3>${esc(w.ko)}</h3><div class="en">${esc(c.short)} · ${esc(w.en)}</div></a>`;
  }
  function composerCard(c) {
    return `<a class="card ccard" data-era="${c.era}" href="#/composers/${c.id}">
      <div class="mono-portrait">${c.latin[0]}</div>
      <div><span class="yrs">${yrs(c)} · ${esc(c.country)}</span><h3>${esc(c.ko)}</h3><div class="en">${esc(c.en)}</div><p>${esc(c.tagline)}</p></div></a>`;
  }
  const pageHead = (crumbs, eyebrow, title, lede, extra = "") => `
    <header class="page-head">
      <nav class="crumbs" aria-label="경로"><a href="#/">홈</a>${crumbs.map(([h, t]) => `<span>/</span>${h ? `<a href="${h}">${t}</a>` : `<span>${t}</span>`}`).join("")}</nav>
      <div class="eyebrow" style="margin-top:22px">${eyebrow}</div>
      <h1>${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}${extra}
    </header>`;

  /* ---------- Views ---------- */
  const V = {};

  V.home = () => {
    const pool = OA.works.filter((w) => w.recs.length >= 2);
    const day = Math.floor(Date.now() / 864e5);
    const tw = pool[day % pool.length], tc = C[tw.composer];
    const samples = ["chopin-nocturne-op9-2", "mozart-eine-kleine", "bach-cello-suite-1", "beethoven-moonlight", "schubert-impromptus-d899", "vivaldi-spring", "tchaikovsky-symphony-6", "debussy-clair-de-lune"];
    return {
      title: "클래식 학습 아카이브",
      html: `
      <div class="wrap">
        <section class="hero fade-in">
          <div>
            <div class="eyebrow">Opus Atlas · 클래식 음악 학습 아카이브</div>
            <h1>흩어진 클래식을<br>하나의 <em>지도</em>로.</h1>
            <p class="lede">시대, 작곡가, 장르, 음악 이론, 작품 번호, 명연주를 서로 연결해 배우는 클래식 입문 아카이브. 궁금한 곡은 Apple Music으로 바로 들어 보세요.</p>
            <label class="bigsearch" data-open-search>${I.search}<input type="text" placeholder="작곡가, 작품, Op. 9 No. 2, K. 525 …" aria-label="검색" readonly><span class="kbd">/</span></label>
            <div class="chips">${["Op. 9 No. 2", "K. 525", "D. 960", "BWV 1007", "소나타", "녹턴"].map((q) => `<button class="chip" data-q="${q}">${q}</button>`).join("")}</div>
          </div>
          <article class="today" data-era="${tc.era}">
            <div class="eyebrow plain">오늘의 한 곡</div>
            <h2><a href="#/works/${tw.id}" style="text-decoration:none">${esc(tw.ko)}</a></h2>
            <div class="muted">${esc(tc.ko)} · ${esc(tw.year)}</div>
            <div class="cat">${esc(catText(tw))}</div>
            <p>${rich(tw.points[0])}</p>
            <div class="actions">${listenBtn(workQueries(tw), `${tc.short} · ${tw.ko}`, "Apple Music으로 듣기")}<a class="btn ghost sm" href="#/works/${tw.id}">작품 노트</a></div>
          </article>
        </section>

        <section class="block">
          <div class="block-head"><h2>시대의 흐름</h2><a class="more" href="#/eras">음악사 전체 보기 →</a></div>
          <nav class="strip" aria-label="시대">${OA.eras.map((e) => `<a href="#/eras/${e.id}" data-era="${e.id}"><span class="yr">${e.range}</span><b>${e.ko}</b><span class="en">${e.id === "modern" ? "Modern" : e.en.split(" ")[0]}</span></a>`).join("")}</nav>
          <p class="small muted" style="margin-top:10px">시대 구분 연도는 대략적인 범위이며, 지역과 작곡가에 따라 서로 겹칩니다.</p>
        </section>

        <section class="block">
          <div class="block-head"><h2>하나의 작품, 네 개의 축</h2><a class="more" href="#/map">클래식의 구조 →</a></div>
          <div class="axes" data-axes>
            <div class="axes-work">
              <label class="small muted" for="axsel">작품을 골라 보세요</label>
              <select id="axsel" data-axsel>${samples.map((id) => `<option value="${id}">${C[W[id].composer].short} — ${W[id].ko}</option>`).join("")}</select>
              <div data-axwork></div>
              <div class="axes-note">장르, 조성, 작품 번호는 서로 다른 정보입니다. 장르는 작품의 <b>종류</b>를, 조성은 중심 음과 <b>음계</b>를, 작품 번호는 작품을 <b>식별</b>하는 정보를 나타냅니다.</div>
            </div>
            <div class="axes-cells" data-axcells></div>
          </div>
        </section>

        <section class="block">
          <div class="block-head"><h2>학습 경로</h2><a class="more" href="#/me">내 학습 기록 →</a></div>
          <div class="path">${OA.path.map((s) => { const p = pathPct(s); return `<a class="step" href="${s.route}"><span class="prog" style="width:${p}%"></span><b>${s.ko}</b><span>${s.desc}</span><div class="pct">${p}% 완료</div></a>`; }).join("")}</div>
        </section>

        <section class="block">
          <div class="block-head"><h2>작곡가</h2><a class="more" href="#/composers">작곡가 사전 →</a></div>
          <div class="grid g3">${OA.composers.slice(0, 6).map(composerCard).join("")}</div>
        </section>

        <section class="block">
          <div class="block-head"><h2>작품 번호, 이렇게 읽어요</h2><a class="more" href="#/catalog">작품 번호 사전 →</a></div>
          <div class="decoder">
            <div class="decoded">${decodeSegs("Op. 9 No. 2").segs}</div>
            <p class="decode-out">쇼팽 <a class="lk" href="#/works/chopin-nocturne-op9-2">녹턴 E♭장조, Op. 9 No. 2</a> — 작품번호 9로 묶여 출판된 세 곡 가운데 두 번째 곡. Op. 번호는 작곡 순서가 아니라 출판 순서와 관련된 경우가 많습니다.</p>
            <div class="chips">${OA.catalogs.slice(0, 8).map((c) => `<a class="chip" href="#/catalog/${c.id}"><span class="mono">${c.abbr}</span> ${c.read.split(" / ")[0]}</a>`).join("")}</div>
          </div>
        </section>
      </div>`,
      mount(root) {
        const sel = $("[data-axsel]", root);
        const draw = () => {
          const w = W[sel.value], c = C[w.composer], k = keyInfo(w.key);
          $("[data-axwork]", root).innerHTML = `<h3><a href="#/works/${w.id}" style="text-decoration:none">${esc(w.ko)}</a></h3>
            <div class="muted small">${esc(c.ko)} (${yrs(c)}) · ${esc(w.instr)}</div><div>${listenBtn(workQueries(w), `${c.short} · ${w.ko}`)}</div>`;
          const cells = [
            ["시대 · Era", eraTag(c.era), E[c.era].range + " · " + OA.axes[0].desc],
            ["장르·형식 · Genre", w.genre.length ? w.genre.map((g) => `<a href="#/genres/${g}">${G[g].ko}</a>`).join(", ") : "소품", OA.axes[1].desc],
            ["음악 이론 · Theory", k ? `<a href="#/theory/key">${k.ko}</a><div class="small muted latin" style="font-size:15px">${k.en}${w.meter ? " · " + w.meter : ""}</div>` : esc(w.keyNote || "—"), OA.axes[2].desc],
            ["작품 식별 · ID", w.cat.length ? `<span class="mono">${w.cat.map((x) => `<a href="#/catalog/${x.s}">${esc(x.t)}</a>`).join(" / ")}</span>` : "표준 번호 없음", w.cat.length ? readCat(w.cat[0]) : "제목과 작곡 연도로 구별합니다."]
          ];
          $("[data-axcells]", root).innerHTML = cells.map(([kk, v, d]) => `<div class="axcell"><div class="k">${kk}</div><div class="v">${v}</div><div class="d">${d}</div></div>`).join("");
        };
        sel.onchange = draw; draw();
      }
    };
  };

  function pathPct(s) { const v = store.get("visited", []); const n = s.check.filter((c) => v.includes(c)).length; return Math.round((n / s.check.length) * 100); }

  /* --- Structure map --- */
  V.map = () => ({
    title: "클래식의 구조",
    html: `<div class="wrap">
      ${pageHead([[null, "클래식의 구조"]], "Overview", "클래식의 구조", "클래식 작품은 하나의 카테고리로만 분류되지 않습니다. 한 곡에 시대, 장르·형식, 음악 이론, 작품 정보, 연주와 녹음이 동시에 연결됩니다.")}
      <section class="block">
        <div class="block-head"><h2>다섯 개의 층</h2></div>
        <div class="layers">${OA.layers.map((l, i) => `<a class="layer" href="${l.route}"><span class="n">${i + 1}</span><b>${l.ko}</b><span>${l.desc}</span></a>`).join("")}</div>
        <p class="small muted" style="margin-top:12px">작곡가는 <b>시대</b> 안에서 <b>장르</b>를 골라, <b>이론</b>(조성·박자·형식)으로 작품을 짓고, 그 작품은 <b>작품 번호</b>로 식별되며, 오늘 우리는 그것을 여러 <b>연주와 녹음</b>으로 만납니다.</p>
      </section>
      <section class="block">
        <div class="block-head"><h2>관계 지도</h2><select data-gsel aria-label="작품 선택" style="font:inherit;font-size:14px;padding:6px 8px;border:1px solid var(--rule-2);border-radius:4px;background:var(--card);color:var(--ink);max-width:60%">${OA.works.map((w) => `<option value="${w.id}"${w.id === "chopin-nocturne-op9-2" ? " selected" : ""}>${C[w.composer].short} — ${esc(w.ko)}</option>`).join("")}</select></div>
        <div class="graph-wrap" data-graph></div>
        <div class="graph-legend"><span>가운데: 작품</span><span>바깥: 연결된 항목 — 누르면 해당 페이지로 이동</span></div>
      </section>
      <section class="block">
        <div class="block-head"><h2>음악을 이해하는 네 가지 분류 축</h2></div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>분류 축</th><th>무엇을 설명하는가</th><th>예시</th></tr></thead><tbody>
        ${OA.axes.map((a) => `<tr><td>${a.ko}</td><td>${a.desc}</td><td class="mono" style="font-size:13px">${a.ex}</td></tr>`).join("")}</tbody></table></div>
        <div class="note" style="--era:var(--accent)"><b>예시 — 쇼팽 녹턴 Op. 9 No. 2</b><br>작곡가: ${rich("[[c:chopin|프레데리크 쇼팽]]")} · 시대: ${rich("[[e:romantic]]")} · 장르: ${rich("[[g:nocturne|녹턴]]")} · 조성: E♭ 장조(내림마장조) · 작품 식별: ${rich("[[cat:op|Op. 9 No. 2]]")} · 악기: 피아노 독주</div>
      </section>
    </div>`,
    mount(root) { const s = $("[data-gsel]", root); const draw = () => drawGraph($("[data-graph]", root), W[s.value]); s.onchange = draw; draw(); }
  });

  function drawGraph(host, w) {
    const c = C[w.composer], k = keyInfo(w.key);
    const nodes = [
      { k: "작곡가", t: c.ko, h: `#/composers/${c.id}` },
      { k: "시대", t: E[c.era].ko, h: `#/eras/${c.era}` },
      ...w.genre.map((g) => ({ k: "장르·형식", t: G[g].ko, h: `#/genres/${g}` })),
      ...(k ? [{ k: "조성", t: k.ko, h: "#/theory/key" }] : []),
      ...(w.meter ? [{ k: "박자", t: w.meter, h: "#/theory/time-signature" }] : []),
      ...w.cat.map((x) => ({ k: "작품 번호", t: x.t, h: `#/catalog/${x.s}` })),
      ...w.recs.slice(0, 3).map((r) => ({ k: "연주", t: P[r.p[0]].ko, h: `#/performers/${r.p[0]}` })),
      ...w.related.slice(0, 2).map((id) => ({ k: "관련 작품", t: W[id].ko, h: `#/works/${id}` }))
    ];
    const Wd = 820, Hd = 500, cx = Wd / 2, cy = Hd / 2, rx = 300, ry = 185;
    const tw = (s) => [...s].reduce((a, ch) => a + (/[ㄱ-힝]/.test(ch) ? 13.5 : 7.6), 0) + 26;
    const fit = (s) => s.length > 16 ? s.slice(0, 15) + "…" : s;
    let svg = `<svg viewBox="0 0 ${Wd} ${Hd}" role="img" aria-label="${esc(w.ko)}의 관계 지도"><ellipse class="ring" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
    const pos = nodes.map((n, i) => { const a = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2; return { ...n, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) }; });
    pos.forEach((n) => { svg += `<line x1="${cx}" y1="${cy}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}"/>`; });
    pos.forEach((n) => {
      const t = fit(n.t), wd = Math.max(tw(t), tw(n.k) * 0.8);
      svg += `<a class="gnode" href="${n.h}"><rect x="${(n.x - wd / 2).toFixed(1)}" y="${(n.y - 22).toFixed(1)}" width="${wd.toFixed(1)}" height="44" rx="4"/>
        <text class="gk" x="${n.x.toFixed(1)}" y="${(n.y - 6).toFixed(1)}" text-anchor="middle">${esc(n.k)}</text>
        <text x="${n.x.toFixed(1)}" y="${(n.y + 12).toFixed(1)}" text-anchor="middle">${esc(t)}</text></a>`;
    });
    const ct = fit(w.ko), cw = Math.max(tw(ct) * 1.12, 160);
    svg += `<a class="gnode center" href="#/works/${w.id}"><rect x="${cx - cw / 2}" y="${cy - 30}" width="${cw}" height="60" rx="5"/>
      <text class="gk" x="${cx}" y="${cy - 9}" text-anchor="middle">${esc(catText(w).slice(0, 26))}</text>
      <text x="${cx}" y="${cy + 15}" text-anchor="middle">${esc(ct)}</text></a></svg>`;
    host.innerHTML = svg;
  }

  /* --- Theory --- */
  V.theory = (id) => {
    if (id && TH[id]) return theoryDetail(TH[id]);
    const groups = [...new Set(OA.theory.map((t) => t.group))];
    return {
      title: "음악 이론",
      html: `<div class="wrap">${pageHead([[null, "음악 이론"]], "Music Theory", "음악 이론 기초", "악보를 읽지 못해도 괜찮습니다. 작품 제목에 붙은 ‘E♭ 장조’, ‘3/4박자’, ‘Allegro’가 무슨 뜻인지 알면 감상이 훨씬 풍부해집니다. 대부분의 항목에서 소리를 직접 들어 볼 수 있습니다.")}
      ${groups.map((g) => `<section class="block"><div class="block-head"><h2>${g}</h2></div><div class="grid g3">
        ${OA.theory.filter((t) => t.group === g).map((t) => `<a class="card" href="#/theory/${t.id}"><span class="idx">${String(OA.theory.indexOf(t) + 1).padStart(2, "0")}${t.demo ? " · ♪ 소리 예시" : ""}</span><h3>${t.ko}</h3><div class="en">${t.en}</div><p>${t.short}</p></a>`).join("")}</div></section>`).join("")}
      </div>`
    };
  };
  function theoryDetail(t) {
    const i = OA.theory.indexOf(t), prev = OA.theory[i - 1], next = OA.theory[i + 1];
    return {
      title: t.ko,
      html: `<div class="wrap">${pageHead([["#/theory", "음악 이론"], [null, t.ko]], `${t.group} · ${String(i + 1).padStart(2, "0")}`, t.ko + ` <span class="latin muted" style="font-weight:400;font-size:.6em">${t.en}</span>`, t.short)}
      <div class="detail"><div class="prose">
        ${t.body.map((p) => `<p>${rich(p)}</p>`).join("")}
        ${t.demo ? `<div class="demo" data-demo="${t.demo}"></div>` : ""}
        <details class="deep"><summary><span><span class="eyebrow plain" style="display:inline">심화</span> 조금 더 깊이</span></summary><div class="deep-in">${t.deep.map((p) => `<p>${rich(p)}</p>`).join("")}</div></details>
      </div>
      <aside>${(t.related || []).length ? `<div class="side-box"><h4>관련 이론</h4><ul>${t.related.map((r) => `<li><a href="#/theory/${r}">${TH[r].ko}</a></li>`).join("")}</ul></div>` : ""}
        <div class="side-box"><h4>확인 퀴즈</h4><p class="small muted" style="margin:0 0 10px">용어와 이론 문제로 이해도를 점검해 보세요.</p><a class="btn sm" href="#/quiz/theory">퀴즈 풀기</a></div></aside></div>
      <nav class="pager">${prev ? `<a href="#/theory/${prev.id}"><span>← 이전</span><b>${prev.ko}</b></a>` : ""}${next ? `<a class="next" href="#/theory/${next.id}"><span>다음 →</span><b>${next.ko}</b></a>` : ""}</nav></div>`,
      mount(root) { const d = $("[data-demo]", root); if (d) OA.audio.mountDemo(d, d.dataset.demo); }
    };
  }

  /* --- Genres --- */
  V.genres = (id) => {
    if (id && G[id]) return genreDetail(G[id]);
    return {
      title: "장르와 형식",
      html: `<div class="wrap">${pageHead([[null, "장르와 형식"]], "Genres & Forms", "장르와 형식", "교향곡과 협주곡은 무엇이 다를까요? 녹턴과 발라드는요? 장르는 ‘어떤 종류의 곡인가’를, 형식은 ‘어떻게 짜여 있는가’를 설명합니다. 둘은 겹치기도 하고, 시대에 따라 뜻이 달라지기도 합니다.")}
      ${OA.genreFamilies.map((f) => { const gs = OA.genres.filter((g) => g.family === f.id); return gs.length ? `<section class="block"><div class="block-head"><h2>${f.ko}</h2><span class="count">${gs.length}</span></div><div class="grid g3">
        ${gs.map((g) => `<a class="card" href="#/genres/${g.id}"><span class="idx">${g.works.length ? g.works.length + "개 작품" : "개념"}</span><h3>${g.ko}</h3><div class="en">${g.en}</div><p>${g.short}</p></a>`).join("")}</div></section>` : ""; }).join("")}
      </div>`
    };
  };
  function genreDetail(g) {
    const ws = g.works.map((id) => W[id]);
    const cs = OA.composers.filter((c) => c.genres.includes(g.id));
    return {
      title: g.ko,
      html: `<div class="wrap">${pageHead([["#/genres", "장르와 형식"], [null, g.ko]], OA.genreFamilies.find((f) => f.id === g.family).ko, g.ko + ` <span class="latin muted" style="font-weight:400;font-size:.6em">${g.en}</span>`, g.short)}
      <div class="detail"><div class="prose">
        <h3 class="sub">특징</h3><ul class="points">${g.features.map((f) => `<li>${rich(f)}</li>`).join("")}</ul>
        <h3 class="sub">역사</h3><p>${rich(g.history)}</p>
        <details class="deep"><summary><span><span class="eyebrow plain" style="display:inline">심화</span> 더 알아보기</span></summary><div class="deep-in"><p>${rich(g.deep)}</p></div></details>
        <div class="note" style="--era:var(--accent)"><b>감상 팁</b><br>${rich(g.listen)}</div>
        ${ws.length ? `<h3 class="sub">대표 작품</h3><div class="wlist">${ws.map(wrow).join("")}</div>` : ""}
      </div>
      <aside>${cs.length ? `<div class="side-box"><h4>이 장르의 작곡가</h4><ul>${cs.map((c) => `<li><a href="#/composers/${c.id}">${c.ko}</a> <span class="small muted">${yrs(c)}</span></li>`).join("")}</ul></div>` : ""}
        <div class="side-box"><h4>다른 장르</h4><div class="chips">${OA.genres.filter((x) => x.family === g.family && x.id !== g.id).map((x) => `<a class="chip" href="#/genres/${x.id}">${x.ko}</a>`).join("")}</div></div></aside></div></div>`
    };
  }

  /* --- Eras --- */
  function lifeline(composers, from, to) {
    const pct = (y) => ((y - from) / (to - from)) * 100;
    const bands = OA.eras.filter((e) => e.end > from && e.start < to).map((e, i) => `<div class="band" data-era="${e.id}" style="left:${Math.max(0, pct(e.start))}%;width:${pct(Math.min(e.end, to)) - Math.max(0, pct(e.start))}%"><span${i % 2 ? ' style="bottom:auto;top:4px"' : ""}>${e.ko}</span></div>`).join("");
    const ticks = []; for (let y = Math.ceil(from / 50) * 50; y <= to; y += 50) ticks.push(`<span style="left:${pct(y)}%">${y}</span>`);
    return `<div class="scroll-x"><div class="lifeline"><div class="bands">${bands}</div><div class="rows">
      ${composers.map((c) => `<div class="row"><a class="life" data-era="${c.era}" href="#/composers/${c.id}" style="left:${pct(c.born)}%;width:${pct(c.died) - pct(c.born)}%">${c.short} <span style="opacity:.75">${c.born}–${c.died}</span></a></div>`).join("")}
      </div><div class="axis">${ticks.join("")}</div></div></div>`;
  }
  V.eras = (id) => {
    if (id && E[id]) return eraDetail(E[id]);
    return {
      title: "음악사",
      html: `<div class="wrap">${pageHead([[null, "음악사"]], "History", "시대별 음악사", "중세 교회의 단선율 성가에서 오늘날의 현대음악까지. 시대 구분 연도는 대략적인 기준이며, 같은 시기에도 지역과 작곡가에 따라 양식이 겹칩니다.")}
      <section class="block"><div class="block-head"><h2>작곡가 연대표</h2><span class="count">1650 – 1975</span></div>${lifeline(OA.composers, 1650, 1975)}</section>
      <section class="block"><div class="block-head"><h2>일곱 개의 시대</h2></div><div class="grid g2">
        ${OA.eras.map((e, i) => `<a class="card era-edge" data-era="${e.id}" href="#/eras/${e.id}"><span class="idx">${String(i + 1).padStart(2, "0")} · ${e.range}</span><h3>${e.ko}</h3><div class="en">${e.en}</div><p>${e.lede}</p>
          ${e.composers.length ? `<div class="card-foot"><span class="small muted">${e.composers.map((c) => C[c].short).join(" · ")}</span></div>` : ""}</a>`).join("")}
      </div></section></div>`
    };
  };
  function eraDetail(e) {
    const i = ERA_ORDER.indexOf(e.id), prev = OA.eras[i - 1], next = OA.eras[i + 1];
    const ws = OA.works.filter((w) => workEra(w) === e.id);
    return {
      title: e.ko,
      html: `<div class="wrap" data-era="${e.id}">${pageHead([["#/eras", "음악사"], [null, e.ko]], `<span class="dot"></span> ${e.range}`, e.ko + ` <span class="latin" style="font-weight:400;font-size:.6em;color:var(--era)">${e.en}</span>`, e.lede)}
      <div class="detail"><div class="prose">
        <h3 class="sub" style="margin-top:0">사회·문화적 배경</h3><p>${rich(e.background)}</p>
        <h3 class="sub">음악적 특징</h3><ul class="points">${e.features.map((f) => `<li>${rich(f)}</li>`).join("")}</ul>
        <h3 class="sub">대표 작품</h3><ul class="points">${e.landmarks.map((f) => `<li>${rich(f)}</li>`).join("")}</ul>
        ${e.note ? `<div class="note">${rich(e.note)}</div>` : ""}
        ${e.composers.length ? `<h3 class="sub">이 사이트의 작곡가</h3><div class="grid g2">${e.composers.map((c) => composerCard(C[c])).join("")}</div>` : ""}
        ${ws.length ? `<h3 class="sub">이 시대의 작품 (${ws.length})</h3><div class="wlist">${ws.map(wrow).join("")}</div>` : ""}
      </div>
      <aside><div class="side-box"><h4>주요 인물</h4><ul>${e.people.map((p) => `<li>${esc(p)}</li>`).join("")}${e.composers.map((c) => `<li><a href="#/composers/${c}">${C[c].ko} (${yrs(C[c])})</a></li>`).join("")}</ul></div>
        <div class="side-box"><h4>시대 구분에 대해</h4><p class="small muted" style="margin:0">${e.range}는 대략적인 범위입니다. 양식의 변화는 지역마다 다른 속도로 일어났고, 한 작곡가가 두 시대에 걸쳐 있기도 합니다.</p></div></aside></div>
      <nav class="pager">${prev ? `<a href="#/eras/${prev.id}"><span>← 이전 시대</span><b>${prev.ko}</b></a>` : ""}${next ? `<a class="next" href="#/eras/${next.id}"><span>다음 시대 →</span><b>${next.ko}</b></a>` : ""}</nav></div>`
    };
  }

  /* --- Composers --- */
  V.composers = (id) => {
    if (id && C[id]) return composerDetail(C[id]);
    const insts = [...new Set(OA.composers.flatMap((c) => c.instruments))];
    const countries = [...new Set(OA.composers.map((c) => c.country.split(" ")[0]))];
    return {
      title: "작곡가 사전",
      html: `<div class="wrap">${pageHead([[null, "작곡가"]], "Composers", "작곡가 사전", "생애와 음악적 특징, 대표 작품, 작품 번호 체계, 추천 감상 순서를 정리했습니다.")}
        <section class="block">${lifeline(OA.composers, 1650, 1975)}</section>
        <div class="filters" data-filters>
          <div class="fg"><span class="fl">시대</span><div class="chips">${["all", ...new Set(OA.composers.map((c) => c.era))].map((e) => `<button class="chip${e === "all" ? " on" : ""}" data-f="era" data-v="${e}" ${e !== "all" ? `data-era="${e}"` : ""}>${e === "all" ? "전체" : `<span class="dot"></span>${E[e].ko}`}</button>`).join("")}</div></div>
          <div class="fg"><span class="fl">국가</span><select data-f="country"><option value="">전체</option>${countries.map((c) => `<option>${c}</option>`).join("")}</select></div>
          <div class="fg"><span class="fl">주요 악기·분야</span><select data-f="inst"><option value="">전체</option>${insts.map((c) => `<option>${c}</option>`).join("")}</select></div>
          <div class="fg"><span class="fl">장르</span><select data-f="genre"><option value="">전체</option>${OA.genres.filter((g) => OA.composers.some((c) => c.genres.includes(g.id))).map((g) => `<option value="${g.id}">${g.ko}</option>`).join("")}</select></div>
        </div>
        <div class="count" data-count></div><div class="grid g2" data-list></div></div>`,
      mount(root) {
        const f = { era: "all", country: "", inst: "", genre: "" };
        const draw = () => {
          const list = OA.composers.filter((c) => (f.era === "all" || c.era === f.era) && (!f.country || c.country.startsWith(f.country)) && (!f.inst || c.instruments.includes(f.inst)) && (!f.genre || c.genres.includes(f.genre)));
          $("[data-count]", root).textContent = `${list.length}명`;
          $("[data-list]", root).innerHTML = list.map(composerCard).join("") || `<div class="empty">조건에 맞는 작곡가가 없습니다.</div>`;
        };
        root.addEventListener("click", (e) => { const b = e.target.closest('button[data-f="era"]'); if (!b) return; f.era = b.dataset.v; $$('button[data-f="era"]', root).forEach((x) => x.classList.toggle("on", x === b)); draw(); });
        $$("select[data-f]", root).forEach((s) => (s.onchange = () => { f[s.dataset.f] = s.value; draw(); }));
        draw();
      }
    };
  };
  function composerDetail(c) {
    const ws = OA.works.filter((w) => w.composer === c.id);
    const recs = ws.flatMap((w) => w.recs.slice(0, 1).map((r) => ({ w, r })));
    const cat = c.catalog ? CAT[c.catalog] : null;
    return {
      title: c.ko,
      html: `<div class="wrap" data-era="${c.era}">
      <header class="page-head" style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:32px;align-items:end">
        <div class="mono-portrait lg">${c.latin[0]}</div>
        <div><nav class="crumbs"><a href="#/">홈</a><span>/</span><a href="#/composers">작곡가</a><span>/</span><span>${c.short}</span></nav>
        <div class="eyebrow" style="margin-top:18px">${eraTag(c.era)}${c.eraBridge ? ` → ${eraTag(c.eraBridge)}` : ""}</div>
        <h1 style="margin:10px 0 4px">${c.ko}</h1><div class="work-en">${c.en} · ${yrs(c)}</div>
        <p class="lede" style="margin-top:14px">${c.tagline}</p></div>
      </header>
      <div class="detail"><div class="prose">
        <h3 class="sub" style="margin-top:0">생애</h3>${c.life.map((p) => `<p>${rich(p)}</p>`).join("")}
        <h3 class="sub">음악적 특징</h3><ul class="points">${c.style.map((s) => `<li>${rich(s)}</li>`).join("")}</ul>
        ${c.note ? `<div class="note">${rich(c.note)}</div>` : ""}
        <h3 class="sub">추천 감상 순서</h3><p class="small muted">${c.orderNote}</p>
        <ol class="order">${c.order.map((id) => { const w = W[id]; return `<li><a href="#/works/${id}"><b>${esc(w.ko)}</b><span class="mono">${esc(catText(w))}</span></a>${listenBtn(workQueries(w), `${c.short} · ${w.ko}`)}</li>`; }).join("")}</ol>
        ${recs.length ? `<h3 class="sub">대표 음반</h3><div class="recs">${recs.map(({ w, r }) => `<div class="rec"><div><div class="who">${r.p.map((p) => `<a href="#/performers/${p}">${P[p].ko}</a>`).join(" · ")}</div><div class="meta">${esc(w.ko)} · ${esc(r.label)}${r.year ? " · " + esc(r.year) : ""}</div><p class="why">${esc(r.why)}</p></div>${listenBtn(recQueries(w, r), `${P[r.p[0]].ko} · ${w.ko}`)}</div>`).join("")}</div>` : ""}
      </div>
      <aside>
        <dl class="facts"><div><dt>생몰</dt><dd>${yrs(c)}</dd></div><div><dt>국적</dt><dd>${esc(c.country)}</dd></div><div><dt>활동 지역</dt><dd>${esc(c.places)}</dd></div>
          <div><dt>시대</dt><dd>${eraTag(c.era)}</dd></div><div><dt>주요 분야</dt><dd>${c.instruments.join(", ")}</dd></div>
          <div><dt>작품 번호</dt><dd>${cat ? `<a href="#/catalog/${cat.id}"><span class="mono">${cat.abbr}</span></a><small>${cat.origin}</small>` : `표준 목록 없음<small>제목과 작곡 연도로 구별</small>`}</dd></div></dl>
        <div class="side-box" style="margin-top:16px"><h4>대표 장르</h4><div class="chips">${c.genres.map((g) => `<a class="chip" href="#/genres/${g}">${G[g].ko}</a>`).join("")}</div></div>
        <div class="side-box"><h4>작품 목록 (${ws.length})</h4><ul>${ws.map((w) => `<li><a href="#/works/${w.id}">${esc(w.ko)}</a><br><span class="mono small muted">${esc(catText(w))}</span></li>`).join("")}</ul></div>
      </aside></div></div>`
    };
  }

  /* --- Works --- */
  V.works = (id) => {
    if (id && W[id]) return workDetail(W[id]);
    return {
      title: "작품 사전",
      html: `<div class="wrap">${pageHead([[null, "작품"]], "Works", "작품 사전", `${OA.works.length}개 작품의 작곡 시기, 장르, 조성, 편성, 악장, 작품 번호와 대표 녹음. 제목이나 작품 번호(예: <span class="mono">K. 525</span>)로 찾아보세요.`)}
      <div class="filters">
        <div class="fg" style="flex:1;min-width:220px"><span class="fl">검색</span><input type="search" data-f="q" placeholder="제목, 별명, Op. / K. / D. / BWV …" style="width:100%"></div>
        <div class="fg"><span class="fl">작곡가</span><select data-f="composer"><option value="">전체</option>${OA.composers.map((c) => `<option value="${c.id}">${c.short}</option>`).join("")}</select></div>
        <div class="fg"><span class="fl">장르</span><select data-f="genre"><option value="">전체</option>${OA.genres.filter((g) => OA.works.some((w) => w.genre.includes(g.id))).map((g) => `<option value="${g.id}">${g.ko}</option>`).join("")}</select></div>
        <div class="fg"><span class="fl">조성</span><select data-f="mode"><option value="">전체</option><option value="major">장조</option><option value="minor">단조</option></select></div>
        <div class="fg"><span class="fl">시대</span><select data-f="era"><option value="">전체</option>${[...new Set(OA.composers.map((c) => c.era))].map((e) => `<option value="${e}">${E[e].ko}</option>`).join("")}</select></div>
        <div class="fg"><span class="fl">내 기록</span><select data-f="mine"><option value="">전체</option><option value="favs">즐겨찾기</option><option value="done">감상 완료</option><option value="todo">아직 안 들은 곡</option></select></div>
      </div>
      <div class="count" data-count></div><div class="wlist" data-list></div></div>`,
      mount(root) {
        const f = { q: "", composer: "", genre: "", mode: "", era: "", mine: "" };
        const pre = new URLSearchParams(location.hash.split("?")[1] || "");
        pre.forEach((v, k) => { if (k in f) { f[k] = v; const el = $(`[data-f="${k}"]`, root); if (el) el.value = v; } });
        const draw = () => {
          const q = compact(f.q);
          const list = OA.works.filter((w) => {
            if (f.composer && w.composer !== f.composer) return false;
            if (f.genre && !w.genre.includes(f.genre)) return false;
            if (f.mode && keyInfo(w.key)?.mode !== f.mode) return false;
            if (f.era && workEra(w) !== f.era) return false;
            if (f.mine === "favs" && !has("favs", w.id)) return false;
            if (f.mine === "done" && !has("done", w.id)) return false;
            if (f.mine === "todo" && has("done", w.id)) return false;
            if (q && ![w.ko, w.en, w.nick, catText(w), C[w.composer].short, C[w.composer].latin, ...w.cat.map((c) => c.t)].some((s) => compact(s).includes(q))) return false;
            return true;
          });
          $("[data-count]", root).textContent = `${list.length} / ${OA.works.length}개 작품`;
          $("[data-list]", root).innerHTML = list.map(wrow).join("") || `<div class="empty">조건에 맞는 작품이 없습니다.</div>`;
        };
        $$("[data-f]", root).forEach((el) => { el.addEventListener(el.tagName === "INPUT" ? "input" : "change", () => { f[el.dataset.f] = el.value; draw(); }); });
        draw();
      }
    };
  };

  function workDetail(w) {
    const c = C[w.composer], k = keyInfo(w.key), era = c.era;
    const fav = has("favs", w.id), done = has("done", w.id);
    const notes = store.get("notes", {});
    const terms = w.terms.filter((t) => T[t]);
    return {
      title: w.ko,
      html: `<div class="wrap" data-era="${era}">
      <header class="page-head" style="border-bottom:0;margin-bottom:0;padding-bottom:12px">
        <nav class="crumbs"><a href="#/">홈</a><span>/</span><a href="#/works">작품</a><span>/</span><a href="#/composers/${c.id}">${c.short}</a></nav>
        <div class="eyebrow" style="margin-top:22px">${eraTag(era)} <span>·</span> <a href="#/composers/${c.id}" style="text-decoration:none">${c.ko}</a></div>
        <h1 class="work-title">${esc(w.ko)}</h1>
        <div class="work-en">${esc(w.en)}${w.nick ? ` — “${esc(w.nick)}”` : ""}</div>
        <div class="work-cat">${w.cat.length ? w.cat.map((x) => `<a href="#/catalog/${x.s}" title="${esc(CAT[x.s].origin)}">${esc(x.t)}</a>`).join("") : `<span class="small muted" style="font-family:var(--f-sans)">표준 작품 번호 없음 · 제목과 연도로 구별</span>`}</div>
        <div class="actions">
          ${listenBtn(workQueries(w), `${c.short} · ${w.ko}`, "Apple Music으로 듣기").replace('class="listen"', 'class="btn"')}
          <button class="btn ghost${fav ? " on" : ""}" data-fav="${w.id}">${fav ? I.starF : I.star}<span>${fav ? "즐겨찾기됨" : "즐겨찾기"}</span></button>
          <button class="btn ghost${done ? " on" : ""}" data-done="${w.id}">${I.check}<span>${done ? "감상 완료" : "감상 완료로 표시"}</span></button>
        </div>
      </header>
      <div class="detail" style="margin-top:40px"><div class="prose">
        <h3 class="sub" style="margin-top:0">작품의 탄생 배경</h3><p>${rich(w.bg)}</p>
        <h3 class="sub">악장 구성</h3><ol class="mvts">${w.movements.map(([it, ko]) => `<li><span class="it">${esc(it)}</span><span class="ko">${esc(ko)}</span></li>`).join("")}</ol>
        <h3 class="sub">초보자를 위한 감상 포인트</h3><ul class="points">${w.points.map((p) => `<li>${rich(p)}</li>`).join("")}</ul>
        <h3 class="sub">명연주 · 명반</h3>
        ${w.recs.length ? `<p class="small muted">추천 근거: 해석의 개성, 녹음 품질, 역사적 영향력, 비평적 평가. 레이블과 연도는 대표 발매 기준이며 재발매판에 따라 다를 수 있습니다.</p>
          <div class="recs">${w.recs.map((r, i) => `<div class="rec"><div><div class="who"><span class="n">${i + 1}</span> ${r.p.map((p) => `<a href="#/performers/${p}">${P[p].ko}</a>`).join(" · ")}</div><div class="meta">${esc(r.label)}${r.year ? " · " + esc(r.year) : ""} · ${r.p.map((p) => OA.roles[P[p].role]).join(" · ")}</div><p class="why">${esc(r.why)}</p></div>${listenBtn(recQueries(w, r), `${P[r.p[0]].ko} · ${w.ko}`, "이 연주 찾기")}</div>`).join("")}</div>`
          : `<p class="muted">이 작품은 아직 정리된 추천 음반이 없습니다. 아래 버튼으로 Apple Music에서 여러 연주를 찾아 비교해 보세요.</p>`}
        <h3 class="sub">감상 메모</h3>
        <textarea class="memo" data-memo="${w.id}" placeholder="들으면서 떠오른 생각, 마음에 든 연주, 다시 듣고 싶은 부분…">${esc(notes[w.id] || "")}</textarea><div class="saved" data-saved></div>
      </div>
      <aside>
        <dl class="facts">
          <div><dt>작곡가</dt><dd><a href="#/composers/${c.id}">${c.ko}</a><small>${yrs(c)}</small></dd></div>
          <div><dt>작곡 시기</dt><dd>${esc(w.year)}</dd></div>
          <div><dt>시대</dt><dd>${eraTag(era)}</dd></div>
          <div><dt>장르·형식</dt><dd>${w.genre.length ? w.genre.map((g) => `<a href="#/genres/${g}">${G[g].ko}</a>`).join(", ") : "피아노 소품"}</dd></div>
          <div><dt>조성</dt><dd>${k ? `<a href="#/theory/key">${k.ko}</a><small>${k.en}${w.keyNote ? " · " + esc(w.keyNote) : ""}</small>` : esc(w.keyNote || "—")}</dd></div>
          ${w.meter ? `<div><dt>박자</dt><dd><a href="#/theory/time-signature">${w.meter}</a></dd></div>` : ""}
          <div><dt>편성</dt><dd>${esc(w.instr)}</dd></div>
          <div><dt>작품 번호</dt><dd>${w.cat.length ? "" : `없음<small>${esc(C[w.composer].short)}에게는 표준 작품 목록이 없어 제목과 작곡 연도로 구별합니다. <a href="#/catalog">작품 번호 사전</a></small>`}${w.cat.map((x) => `<span class="mono">${esc(x.t)}</span><small>${readCat(x)} — <a href="#/catalog/${x.s}">${CAT[x.s].abbr} 설명</a></small>`).join("")}</dd></div>
        </dl>
        ${terms.length ? `<div class="side-box" style="margin-top:16px"><h4>관련 용어</h4><div class="chips">${terms.map((t) => `<button type="button" class="chip term" data-term="${t}" style="text-decoration:none">${T[t].term}</button>`).join("")}</div></div>` : ""}
        ${w.related.length ? `<div class="side-box"><h4>관련 작품</h4><ul>${w.related.map((r) => `<li><a href="#/works/${r}">${esc(W[r].ko)}</a><br><span class="small muted">${C[W[r].composer].short} · <span class="mono">${esc(catText(W[r]))}</span></span></li>`).join("")}</ul></div>` : ""}
        <div class="side-box"><h4>${c.short}의 다른 작품</h4><ul>${OA.works.filter((x) => x.composer === c.id && x.id !== w.id).map((x) => `<li><a href="#/works/${x.id}">${esc(x.ko)}</a></li>`).join("")}</ul></div>
      </aside></div></div>`,
      mount(root) {
        const ta = $("[data-memo]", root); let t;
        ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { const n = store.get("notes", {}); if (ta.value.trim()) n[w.id] = ta.value; else delete n[w.id]; store.set("notes", n); $("[data-saved]", root).textContent = "이 브라우저에 저장됨"; }, 400); });
      }
    };
  }

  /* --- Catalogue --- */
  const HOB = { I: "교향곡", III: "현악 4중주", XV: "피아노 3중주", XVI: "건반 소나타", XXI: "오라토리오", XXII: "미사" };
  function decodeSegs(raw) {
    const s = raw.trim(); let m, segs = [], text = "", sys = null;
    const seg = (a, b, isSys) => segs.push(`<div class="seg${isSys ? " sys" : ""}"><span class="s">${esc(a)}</span><span class="l">${b}</span></div>`);
    if ((m = s.match(/^(?:op(?:us)?\.?)\s*(posth\.?)?\s*(\d+)?([a-z](?![a-z]))?\s*(?:(?:no|nr|n°|#)\.?\s*|\/\s*)?(\d+)?/i)) && /^op/i.test(s)) {
      sys = "op"; seg("Op.", "작품번호 (Opus)", true);
      if (m[1]) seg("posth.", "사후 출판");
      if (m[2]) seg(m[2] + (m[3] || ""), `${m[2]}번 작품${m[3] ? ` (${m[3]}판)` : ""}`);
      if (m[4]) { seg("No.", "곡 번호"); seg(m[4], `묶음 안의 ${m[4]}번째 곡`); }
      text = `작품번호 ${m[2] || "?"}${m[4] ? `로 묶인 작품집의 ${m[4]}번째 곡` : ""}${m[1] ? " (작곡가 사후 출판)" : ""}. Op. 번호는 여러 작곡가가 쓰므로 작곡가 이름과 함께 읽어야 특정 곡을 가리킵니다.`;
    } else if ((m = s.match(/^k(?:v|öchel)?\.?\s*(\d+[a-z]?)(?:\s*\(?\s*(\d+[a-z]+)\s*\)?)?/i))) {
      sys = "k"; seg(/^kv/i.test(s) ? "KV" : "K.", "쾨헬 목록 · 모차르트", true); seg(m[1], `${m[1]}번`); if (m[2]) seg(`(${m[2]})`, "개정판 번호");
      text = `모차르트 작품 목록(쾨헬) ${m[1]}번. 쾨헬 번호는 대략적인 작곡 연대순이라, 숫자가 클수록 후기 작품입니다(모차르트는 K. 626 〈레퀴엠〉에서 생을 마쳤습니다).`;
    } else if ((m = s.match(/^bwv\s*(\d+)/i))) {
      sys = "bwv"; seg("BWV", "바흐 작품 목록", true); seg(m[1], `${m[1]}번`);
      const n = +m[1]; const area = n <= 224 ? "칸타타" : n <= 524 ? "모테트·수난곡·미사 등 성악" : n <= 771 ? "오르간 작품" : n <= 994 ? "건반 작품" : n <= 1040 ? "실내악·독주곡" : n <= 1080 ? "관현악·협주곡·대위법 작품" : "기타·추가 작품";
      text = `바흐 작품 목록 ${m[1]}번. BWV는 장르별로 묶여 있어 번호대로 대략 어떤 종류인지 알 수 있습니다 — ${m[1]}번대는 대체로 ‘${area}’ 영역.`;
    } else if ((m = s.match(/^d\.?\s*(\d+)/i))) {
      sys = "d"; seg("D.", "도이치 목록 · 슈베르트", true); seg(m[1], `${m[1]}번`);
      text = `슈베르트 작품 목록(도이치) ${m[1]}번. 대략적인 작곡 연대순입니다. 출판된 작품은 Op. 번호가 함께 붙기도 합니다.`;
    } else if ((m = s.match(/^hob\.?\s*([ivxl]+[a-z]?)\s*[:.]?\s*(\d+)?/i))) {
      sys = "hob"; const g = m[1].toUpperCase(); seg("Hob.", "호보켄 목록 · 하이든", true); seg(g, HOB[g] ? `${HOB[g]} 그룹` : "장르 그룹 (로마 숫자)"); if (m[2]) seg(m[2], `${m[2]}번`);
      text = `하이든 작품 목록(호보켄). 로마 숫자 ${g}는 장르${HOB[g] ? `(‘${HOB[g]}’)` : ""}를, 그 뒤 숫자는 그 장르 안의 번호를 뜻합니다.`;
    } else if ((m = s.match(/^woo\s*(\d+)/i))) {
      sys = "woo"; seg("WoO", "Werk ohne Opuszahl", true); seg(m[1], `${m[1]}번`);
      text = `정식 Op. 번호가 없는 작품 목록의 ${m[1]}번. 작품의 가치와는 무관한, 분류를 위한 번호입니다.`;
    } else if ((m = s.match(/^rv\s*(\d+)/i))) {
      sys = "rv"; seg("RV", "리옴 목록 · 비발디", true); seg(m[1], `${m[1]}번`);
      text = `비발디 작품 목록(리옴) ${m[1]}번.`;
    } else if ((m = s.match(/^(?:s|lw)\.?\s*(\d+)(?:\s*\/\s*(\d+))?/i))) {
      sys = "s"; seg(/^lw/i.test(s) ? "LW" : "S.", "리스트 작품 목록", true); seg(m[1], `${m[1]}번`); if (m[2]) seg("/" + m[2], `그중 ${m[2]}번째 곡`);
      text = `리스트 작품 목록 ${m[1]}번${m[2] ? `의 ${m[2]}번째 곡` : ""}.`;
    } else if ((m = s.match(/^l\.?\s*(\d+)/i))) {
      sys = "l"; seg("L.", "레쥐르 목록 · 드뷔시", true); seg(m[1], `${m[1]}번`);
      text = `드뷔시 작품 목록(레쥐르) ${m[1]}번. 1977년판과 2003년판 번호가 다르니 자료의 기준을 확인하세요.`;
    } else if ((m = s.match(/^m\.?\s*(\d+)/i))) {
      sys = "m"; seg("M.", "마르나 목록 · 라벨", true); seg(m[1], `${m[1]}번`);
      text = `라벨 작품 목록(마르나) ${m[1]}번. 라벨은 Op. 번호를 쓰지 않아 자료에 따라 이 번호 없이 제목만 표기하기도 합니다.`;
    } else if ((m = s.match(/^hwv\s*(\d+)/i))) {
      sys = "hwv"; seg("HWV", "헨델 작품 목록", true); seg(m[1], `${m[1]}번`); text = `헨델 작품 목록 ${m[1]}번.`;
    }
    const q = compact(s);
    const matches = q.length > 1 ? OA.works.filter((w) => w.cat.some((c) => { const cc = compact(c.t); return cc === q || cc.startsWith(q) && /\D/.test(cc[q.length] || "x") || (c.s === "k" && compact(c.t).replace(/^k/, "kv") === q); })) : [];
    return { segs: segs.join(""), text, sys, matches };
  }
  V.catalog = (id) => ({
    title: "작품 번호 사전",
    html: `<div class="wrap">${pageHead([[null, "작품 번호"]], "Catalogue Numbers", "작품 번호 사전", "Op., K., D., BWV … 작품 제목 뒤에 붙는 알파벳과 숫자는 수많은 작품 가운데 하나를 정확히 가리키는 ‘주소’입니다. 작곡가마다 체계가 다르니 하나의 규칙으로 일반화하지 마세요.")}
      <section class="block"><div class="decoder">
        <div class="eyebrow plain" style="margin-bottom:12px">작품 번호 해독기</div>
        <label class="bigsearch">${I.search}<input type="text" data-dec value="Op. 27 No. 2" placeholder="예: Op. 9 No. 2, K. 525, D. 960, BWV 1007, Hob. I:94" aria-label="작품 번호 입력" autocomplete="off" spellcheck="false"></label>
        <div class="chips" style="margin-top:12px">${["Op. 9 No. 2", "K. 331 (300i)", "D. 899", "BWV 1007", "Hob. I:94", "WoO 59", "RV 269", "S. 541/3", "L. 75", "M. 81"].map((x) => `<button class="chip mono" data-ex="${x}">${x}</button>`).join("")}</div>
        <div class="decoded" data-segs></div><div class="decode-out" data-out></div>
      </div></section>
      <section class="block"><div class="block-head"><h2>약어 사전</h2></div>
        ${OA.catalogs.map((c) => `<article class="cat-sys" id="cat-${c.id}"><div><div class="ab">${c.abbr}</div><div class="rd">읽는 법: ${c.read}</div></div>
          <div><h3>${c.origin}</h3><div class="who">${rich(c.who)}</div><p>${rich(c.desc)}</p><div class="ex">예: ${rich(c.example)}</div></div></article>`).join("")}
      </section>
      <section class="block"><div class="block-head"><h2>꼭 알아둘 보충 개념</h2></div><ul class="points">${OA.catalogNotes.map((n) => `<li>${rich(n)}</li>`).join("")}</ul></section>
      <section class="block"><div class="block-head"><h2>읽기 연습</h2></div><ul class="points examples">
        ${["chopin-nocturne-op9-2", "mozart-eine-kleine", "schubert-d960", "bach-cello-suite-1", "beethoven-fur-elise", "schubert-impromptus-d899"].map((id) => { const w = W[id], c = C[w.composer]; return `<li><span class="mono">${c.latin}: ${esc(w.en)}, ${esc(catText(w).replace(" · ", " / "))}</span><br>→ <a class="lk" href="#/works/${id}">${c.short}의 ${esc(w.ko)}</a>, ${w.cat.map(readCat).join(" / ")}</li>`; }).join("")}
      </ul></section></div>`,
    mount(root) {
      const inp = $("[data-dec]", root);
      const draw = () => {
        const r = decodeSegs(inp.value);
        $("[data-segs]", root).innerHTML = r.segs || "";
        $("[data-out]", root).innerHTML = (r.text ? `<p>${r.text} ${r.sys && CAT[r.sys] ? `<a class="lk" href="#/catalog/${r.sys}" data-jump="${r.sys}">${CAT[r.sys].abbr} 설명 ↓</a>` : ""}</p>` : inp.value.trim() ? `<p class="muted">알아볼 수 있는 작품 번호 형식이 아닙니다. Op. / K. / D. / BWV / Hob. / WoO / RV / S. / L. / M. / HWV 로 시작해 보세요.</p>` : "") +
          (r.matches.length ? `<div class="wlist" style="margin-top:12px">${r.matches.map(wrow).join("")}</div>` : r.text ? `<p class="small muted">이 사이트에 정리된 작품 중 일치하는 번호는 없습니다.</p>` : "");
      };
      inp.addEventListener("input", draw);
      root.addEventListener("click", (e) => { const b = e.target.closest("[data-ex]"); if (b) { inp.value = b.dataset.ex; draw(); } });
      draw();
      if (id && $("#cat-" + id, root)) setTimeout(() => $("#cat-" + id)?.scrollIntoView({ block: "start" }), 30);
    }
  });

  /* --- Recordings & performers --- */
  V.recordings = () => {
    const cmp = OA.works.filter((w) => w.recs.length >= 3);
    const roles = [...new Set(OA.performers.map((p) => p.role))];
    return {
      title: "명연주 · 명반",
      html: `<div class="wrap">${pageHead([[null, "명연주 · 명반"]], "Recordings", "같은 악보, 다른 연주", "클래식에서는 같은 곡이라도 연주자와 지휘자에 따라 템포, 음색, 구조의 해석이 크게 달라집니다. 유명세만이 아니라 해석의 개성, 녹음 품질, 역사적 영향력, 비평적 평가를 근거로 골랐습니다.")}
      <section class="block"><div class="block-head"><h2>비교 감상</h2><span class="count">${cmp.length}개 작품</span></div>
        <p class="small muted">한 곡의 같은 부분을 서로 다른 연주로 이어 들어 보세요. 첫 30초만 비교해도 차이가 들립니다. ‘이 연주 찾기’는 Apple Music 카탈로그에서 해당 연주자의 녹음을 검색합니다(정확한 음반은 결과 목록에서 확인하세요).</p>
        ${cmp.map((w) => `<div style="margin:28px 0 8px" data-era="${workEra(w)}"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--rule);padding-bottom:8px;margin-bottom:12px"><a href="#/works/${w.id}" style="text-decoration:none"><span class="era-tag" style="margin-right:8px">${C[w.composer].short}</span><b style="font-family:var(--f-serif);font-size:19px">${esc(w.ko)}</b> <span class="mono small muted">${esc(catText(w))}</span></a></div>
          <div class="grid ${w.recs.length >= 4 ? "g4" : "g3"}">${w.recs.map((r) => `<div class="card" style="padding:16px"><span class="idx">${esc(r.label)}${r.year ? " · " + esc(r.year) : ""}</span><h3 style="font-size:17px">${r.p.map((p) => `<a href="#/performers/${p}" style="text-decoration:none">${P[p].ko}</a>`).join(" · ")}</h3><p style="margin:6px 0 12px">${esc(r.why)}</p>${listenBtn(recQueries(w, r), `${P[r.p[0]].ko} · ${w.ko}`, "이 연주 찾기")}</div>`).join("")}</div></div>`).join("")}
      </section>
      <section class="block"><div class="block-head"><h2>연주자 사전</h2><span class="count">${OA.performers.length}</span></div>
        <div class="filters" style="padding-top:0"><div class="chips">${["all", ...roles].map((r) => `<button class="chip${r === "all" ? " on" : ""}" data-role="${r}">${r === "all" ? "전체" : OA.roles[r]}</button>`).join("")}</div></div>
        <div class="grid g3" data-plist></div></section></div>`,
      mount(root) {
        let role = "all";
        const draw = () => { $("[data-plist]", root).innerHTML = OA.performers.filter((p) => role === "all" || p.role === role).map((p) => { const n = OA.works.filter((w) => w.recs.some((r) => r.p.includes(p.id))).length; return `<a class="card" href="#/performers/${p.id}"><span class="idx">${OA.roles[p.role]} · ${p.years}</span><h3 style="font-size:18px">${p.ko}</h3><div class="en">${p.en}</div><p>${p.bio}</p><div class="card-foot"><span class="small muted">${esc(p.from)}</span><span class="tag">${n}개 작품</span></div></a>`; }).join(""); };
        root.addEventListener("click", (e) => { const b = e.target.closest("[data-role]"); if (!b) return; role = b.dataset.role; $$("[data-role]", root).forEach((x) => x.classList.toggle("on", x === b)); draw(); });
        draw();
      }
    };
  };
  V.performers = (id) => {
    const p = P[id]; if (!p) return V.notfound();
    const items = OA.works.flatMap((w) => w.recs.filter((r) => r.p.includes(p.id)).map((r) => ({ w, r })));
    return {
      title: p.ko,
      html: `<div class="wrap">${pageHead([["#/recordings", "명연주 · 명반"], [null, p.ko]], `${OA.roles[p.role]} · ${p.years}`, p.ko, p.bio, `<div class="work-en" style="margin-top:10px">${p.en} · ${esc(p.from)}</div>`)}
      <section class="block"><div class="block-head"><h2>이 사이트의 추천 녹음</h2><span class="count">${items.length}</span></div>
      <div class="recs">${items.map(({ w, r }) => `<div class="rec" data-era="${workEra(w)}"><div><div class="who"><a href="#/works/${w.id}">${esc(w.ko)}</a></div><div class="meta">${C[w.composer].short} · ${esc(catText(w))} · ${esc(r.label)}${r.year ? " · " + esc(r.year) : ""}${r.p.length > 1 ? " · 함께: " + r.p.filter((x) => x !== p.id).map((x) => P[x].ko).join(", ") : ""}</div><p class="why">${esc(r.why)}</p></div>${listenBtn(recQueries(w, r), `${p.ko} · ${w.ko}`, "이 연주 찾기")}</div>`).join("")}</div>
      ${p.composer ? `<p style="margin-top:20px">작곡가로서의 페이지: <a class="lk" href="#/composers/${p.composer}">${C[p.composer].ko}</a></p>` : ""}</section></div>`
    };
  };

  /* --- Glossary --- */
  V.glossary = (id) => ({
    title: "용어 사전",
    html: `<div class="wrap">${pageHead([[null, "용어 사전"]], "Glossary", "용어 사전", "악보와 음반에서 자주 보이는 이탈리아어 표현, 형식 용어, 악보 기호, 작품 번호 용어를 모았습니다. 본문에서 점선 밑줄이 있는 단어를 누르면 짧은 뜻이 나타납니다.")}
      <div class="filters"><div class="fg" style="flex:1;min-width:200px"><span class="fl">검색</span><input type="search" data-gq placeholder="Allegro, 소나타 형식, D.C. …" style="width:100%"></div>
        <div class="fg"><span class="fl">분류</span><div class="chips">${[{ id: "all", ko: "전체" }, ...OA.termCats].map((c) => `<button class="chip${c.id === "all" ? " on" : ""}" data-gc="${c.id}">${c.ko}</button>`).join("")}</div></div></div>
      <div class="count" data-count></div><div class="gl" data-gl></div></div>`,
    mount(root) {
      let cat = "all", q = "";
      const draw = () => {
        const qq = compact(q);
        const list = OA.glossary.filter((t) => (cat === "all" || t.cat === cat) && (!qq || [t.term, t.ko, t.def].some((s) => compact(s).includes(qq))));
        $("[data-count]", root).textContent = `${list.length}개 용어`;
        $("[data-gl]", root).innerHTML = list.map((t) => `<div class="gl-item" id="term-${t.id}"><h3>${esc(t.term)}<small>${esc(t.ko)} · ${OA.termCats.find((c) => c.id === t.cat).ko}</small></h3><p>${rich(t.def)}</p>${t.ex ? `<div class="ex">예: ${rich(t.ex)}</div>` : ""}${t.link ? `<div class="ex">${rich(`[[${t.link}|자세히 보기 →]]`)}</div>` : ""}</div>`).join("") || `<div class="empty">찾는 용어가 없습니다.</div>`;
      };
      $("[data-gq]", root).oninput = (e) => { q = e.target.value; draw(); };
      root.addEventListener("click", (e) => { const b = e.target.closest("[data-gc]"); if (!b) return; cat = b.dataset.gc; $$("[data-gc]", root).forEach((x) => x.classList.toggle("on", x === b)); draw(); });
      draw();
      if (id && $("#term-" + id, root)) setTimeout(() => $("#term-" + id)?.scrollIntoView({ block: "center" }), 30);
    }
  });

  /* --- Quiz --- */
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  function mcq(correct, pool, n = 4) { const opts = shuffle([correct, ...pick(pool.filter((x) => x !== correct), n - 1)]); return { opts, ans: opts.indexOf(correct) }; }
  const QUIZ_CATS = {
    catalog: { ko: "작품 번호 해석", desc: "K., D., BWV, Op.가 가리키는 작곡가와 작품" },
    era: { ko: "시대와 작곡가", desc: "작곡가는 어느 시대에 속할까?" },
    genre: { ko: "장르 구별", desc: "설명을 읽고 장르 맞히기" },
    theory: { ko: "용어와 이론", desc: "빠르기말, 조성 이름, 형식 용어" }
  };
  const Q = {
    catalog: [
      () => { const sys = pick(["k", "d", "bwv", "rv", "s", "l", "woo", "m"], 1)[0]; const map = { k: "mozart", d: "schubert", bwv: "bach", rv: "vivaldi", s: "liszt", l: "debussy", woo: "beethoven", m: "ravel" }; const right = C[map[sys]].ko; const { opts, ans } = mcq(right, OA.composers.map((c) => c.ko)); return { text: `작품 번호 <span class="mono">${CAT[sys].abbr}</span>는 주로 어느 작곡가의 작품 목록에 쓰일까요?`, opts, ans, why: `${CAT[sys].abbr} — ${CAT[sys].origin}. ${rich(CAT[sys].desc)}`, link: `#/catalog/${sys}` }; },
      () => { const w = pick(OA.works.filter((w) => w.cat[0] && w.cat[0].s !== "op"), 1)[0]; const { opts, ans } = mcq(C[w.composer].ko, OA.composers.map((c) => c.ko)); return { text: `<span class="mono">${esc(w.cat[0].t)}</span> — 이 번호가 붙은 작품의 작곡가는?`, opts, ans, why: `${esc(w.cat[0].t)}는 ${C[w.composer].short}의 〈${esc(w.ko)}〉입니다. ${readCat(w.cat[0])}.`, link: `#/works/${w.id}` }; },
      () => { const w = pick(OA.works.filter((w) => w.cat[0] && w.cat[0].s === "op" && /No\./.test(w.cat[0].t)), 1)[0]; const m = w.cat[0].t.match(/Op\. (\d+) No\. (\d+)/); const right = `작품번호 ${m[1]}로 묶인 곡들 중 ${m[2]}번째 곡`; const opts0 = [right, `${m[2]}번째로 작곡된 작품 ${m[1]}개 중 하나`, `작곡가의 ${m[1]}번째 작품의 ${m[2]}악장`, `${m[1]}년에 출판된 ${m[2]}번째 작품`]; const opts = shuffle(opts0); return { text: `${C[w.composer].short}의 〈${esc(w.ko)}〉에 붙은 <span class="mono">${w.cat[0].t}</span>의 뜻으로 가장 알맞은 것은?`, opts, ans: opts.indexOf(right), why: `Op. 번호는 주로 출판과 관련된 작품번호이고, No.는 그 묶음 안의 곡 번호입니다. 작곡 순서나 악장 번호가 아닙니다.`, link: "#/catalog/op" }; },
      () => { const right = "Opus 번호가 없는 작품을 분류하는 표기"; const opts = shuffle([right, "작곡가가 가치가 낮다고 본 습작", "작곡가 사후에 발견된 위작", "오페라 작품만 따로 모은 번호"]); return { text: `베토벤 〈엘리제를 위하여〉의 <span class="mono">WoO 59</span>에서 WoO가 뜻하는 것은?`, opts, ans: opts.indexOf(right), why: "Werk ohne Opuszahl — ‘작품번호 없는 작품’. 가치와는 무관합니다.", link: "#/catalog/woo" }; }
    ],
    era: [
      () => { const c = pick(OA.composers, 1)[0]; const { opts, ans } = mcq(E[c.era].ko, OA.eras.map((e) => e.ko)); return { text: `${esc(c.ko)} (${yrs(c)})는 보통 어느 시대의 작곡가로 분류될까요?`, opts, ans, why: `${c.short}: ${esc(c.tagline)}${c.note ? " " + esc(c.note) : ""}`, link: `#/composers/${c.id}` }; },
      () => { const e = pick(OA.eras.filter((e) => e.composers.length), 1)[0]; const right = C[pick(e.composers, 1)[0]].ko; const others = OA.composers.filter((c) => c.era !== e.id).map((c) => c.ko); const opts = shuffle([right, ...pick(others, 3)]); return { text: `다음 중 <b>${e.ko}</b>(${e.range}) 시대에 속하는 작곡가는?`, opts, ans: opts.indexOf(right), why: esc(e.lede), link: `#/eras/${e.id}` }; },
      () => { const e = pick(OA.eras, 1)[0]; const { opts, ans } = mcq(e.ko, OA.eras.map((x) => x.ko)); return { text: `‘${esc(e.lede)}’ — 어느 시대에 대한 설명일까요?`, opts, ans, why: `${e.ko} (${e.range})`, link: `#/eras/${e.id}` }; }
    ],
    genre: [
      () => { const g = pick(OA.genres, 1)[0]; const { opts, ans } = mcq(g.ko, OA.genres.map((x) => x.ko)); return { text: `‘${esc(g.short)}’ — 어떤 장르(형식)에 대한 설명일까요?`, opts, ans, why: rich(g.features[0]), link: `#/genres/${g.id}` }; },
      () => { const w = pick(OA.works.filter((w) => w.genre.length), 1)[0]; const g = G[w.genre[0]]; const { opts, ans } = mcq(g.ko, OA.genres.filter((x) => x.id === g.id || !w.genre.includes(x.id)).map((x) => x.ko)); return { text: `${C[w.composer].short}의 〈${esc(w.ko)}〉는 어떤 장르에 속할까요?`, opts, ans, why: `${esc(g.ko)}: ${esc(g.short)}`, link: `#/works/${w.id}` }; }
    ],
    theory: [
      () => { const t = pick(OA.glossary.filter((t) => ["tempo", "dyn", "expr"].includes(t.cat)), 1)[0]; const pool = OA.glossary.filter((x) => x.cat === t.cat).map((x) => x.term); const { opts, ans } = mcq(t.term, pool); return { text: `‘${esc(t.def)}’ — 이 뜻의 악보 표기는?`, opts, ans, why: `${esc(t.term)} (${esc(t.ko)})`, link: `#/glossary/${t.id}` }; },
      () => { const ks = [...new Set(OA.works.map((w) => w.key).filter(Boolean))]; const k = pick(ks, 1)[0]; const { opts, ans } = mcq(keyInfo(k).ko, ks.map((x) => keyInfo(x).ko)); return { text: `<span class="mono">${keyInfo(k).en}</span>을(를) 한국어로 부르면?`, opts, ans, why: "C 다, D 라, E 마, F 바, G 사, A 가, B 나. ♭은 ‘내림’, ♯은 ‘올림’.", link: "#/theory/key" }; },
      () => { const t = pick(OA.glossary.filter((t) => t.cat === "form" || t.cat === "tex"), 1)[0]; const pool = OA.glossary.filter((x) => x.cat === "form" || x.cat === "tex").map((x) => x.term); const { opts, ans } = mcq(t.term, pool); return { text: `‘${esc(t.def)}’ — 어떤 용어일까요?`, opts, ans, why: `${esc(t.term)} (${esc(t.ko)})`, link: `#/glossary/${t.id}` }; },
      () => { const right = "4분음표를 한 박으로, 한 마디에 3박"; const opts = shuffle([right, "3분음표를 한 박으로, 한 마디에 4박", "한 마디에 3/4초씩", "4마디마다 3번 강세"]); return { text: `박자표 <span class="mono">3/4</span>의 뜻은?`, opts, ans: opts.indexOf(right), why: "아래 숫자는 한 박의 음표 단위(4 = 4분음표), 위 숫자는 한 마디의 박 수입니다. 왈츠가 대표적입니다.", link: "#/theory/time-signature" }; },
      () => { const right = "3음 — 으뜸음에서 장3도인지 단3도인지"; const opts = shuffle([right, "5음 — 완전5도인지 증5도인지", "곡의 빠르기", "조표에 붙은 ♯과 ♭의 개수"]); return { text: `같은 으뜸음의 장3화음과 단3화음을 가르는 결정적 차이는?`, opts, ans: opts.indexOf(right), why: "C 장3화음(도-미-솔)과 C 단3화음(도-미♭-솔)은 3음만 다릅니다.", link: "#/theory/major-minor" }; }
    ]
  };
  V.quiz = (cat) => {
    const stats = store.get("quiz", {});
    if (!cat) return {
      title: "퀴즈",
      html: `<div class="wrap">${pageHead([[null, "퀴즈"]], "Quiz", "확인 퀴즈", "한 판에 10문제. 문제는 사이트의 작품·작곡가·용어 데이터에서 매번 새로 만들어집니다. 점수는 이 브라우저에 기록됩니다.")}
        <div class="grid g2 qstart">${[["mix", "섞어서 풀기", "네 가지 영역에서 골고루"], ...Object.entries(QUIZ_CATS).map(([k, v]) => [k, v.ko, v.desc])].map(([k, ko, d]) => { const s = stats[k]; return `<a class="card" href="#/quiz/${k}"><span class="idx">${k === "mix" ? "MIX" : k.toUpperCase()}</span><h3>${ko}</h3><p>${d}</p>${s ? `<div class="card-foot"><span class="small muted">최고 ${s.best}/10 · 누적 정답률 ${Math.round((s.right / s.total) * 100)}%</span></div><div class="meter"><i style="width:${(s.right / s.total) * 100}%"></i></div>` : `<div class="card-foot"><span class="small muted">아직 기록 없음</span></div>`}</a>`; }).join("")}</div></div>`
    };
    const cats = cat === "mix" ? Object.keys(Q) : Q[cat] ? [cat] : Object.keys(Q);
    const qs = []; let guard = 0;
    while (qs.length < 10 && guard++ < 200) { const c = cats[qs.length % cats.length]; const q = pick(Q[c], 1)[0](); if (!qs.some((x) => x.text === q.text)) qs.push({ ...q, cat: c }); }
    return {
      title: "퀴즈",
      html: `<div class="wrap">${pageHead([["#/quiz", "퀴즈"], [null, cat === "mix" ? "섞어서 풀기" : QUIZ_CATS[cat]?.ko || "퀴즈"]], "Quiz", cat === "mix" ? "섞어서 풀기" : QUIZ_CATS[cat]?.ko || "퀴즈", "")}<div class="quiz" data-quiz></div></div>`,
      mount(root) {
        let i = 0, score = 0; const host = $("[data-quiz]", root);
        const show = () => {
          if (i >= qs.length) return finish();
          const q = qs[i];
          host.innerHTML = `<div class="qcard"><div class="qmeta"><span>${i + 1} / ${qs.length} · ${QUIZ_CATS[q.cat].ko}</span><span>점수 ${score}</span></div><div class="qbar"><i style="width:${(i / qs.length) * 100}%"></i></div>
            <div class="qtext">${q.text}</div><div class="opts">${q.opts.map((o, j) => `<button class="opt" data-o="${j}"><span class="k">${"ABCD"[j]}</span><span>${o}</span></button>`).join("")}</div><div data-fb></div></div>`;
          host.querySelector(".opts").onclick = (e) => {
            const b = e.target.closest("[data-o]"); if (!b) return;
            const ok = +b.dataset.o === q.ans; if (ok) score++;
            const s = store.get("quiz", {}); s[q.cat] = s[q.cat] || { total: 0, right: 0, best: 0 }; s[q.cat].total++; if (ok) s[q.cat].right++; store.set("quiz", s);
            $$(".opt", host).forEach((o, j) => { o.disabled = true; if (j === q.ans) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
            $("[data-fb]", host).innerHTML = `<div class="feedback"><b>${ok ? "정답입니다." : "아쉬워요. 정답: " + q.opts[q.ans]}</b>${q.why} ${q.link ? `<a class="lk" href="${q.link}">더 알아보기</a>` : ""}</div><div class="actions" style="margin-top:14px"><button class="btn" data-next>${i + 1 < qs.length ? "다음 문제 →" : "결과 보기"}</button></div>`;
            $("[data-next]", host).onclick = () => { i++; show(); }; $("[data-next]", host).focus();
          };
        };
        const finish = () => {
          const s = store.get("quiz", {}); const k = cat in QUIZ_CATS || cat === "mix" ? cat : "mix";
          s[k] = s[k] || { total: 0, right: 0, best: 0 };
          if (k === "mix") { s.mix.total += qs.length; s.mix.right += score; }
          s[k].best = Math.max(s[k].best || 0, score); store.set("quiz", s);
          host.innerHTML = `<div class="qcard" style="text-align:center"><div class="eyebrow plain" style="justify-content:center">결과</div><div class="stat" style="font-size:88px;margin:14px 0">${score}<span class="muted" style="font-size:40px">/${qs.length}</span></div>
            <p class="muted">${score >= 9 ? "훌륭해요! 클래식 지도가 머릿속에 그려지고 있네요." : score >= 6 ? "좋아요. 틀린 문제의 ‘더 알아보기’를 따라가 보세요." : "처음엔 다 낯설어요. 관련 페이지를 둘러본 뒤 다시 도전해 보세요."}</p>
            <div class="actions" style="justify-content:center;margin-top:18px"><a class="btn" href="#/quiz/${cat}?r=${Date.now()}">한 판 더</a><a class="btn ghost" href="#/quiz">다른 영역</a></div></div>`;
        };
        show();
      }
    };
  };

  /* --- Library (me) --- */
  V.me = () => {
    const favs = store.get("favs", []).filter((id) => W[id]), done = store.get("done", []).filter((id) => W[id]), notes = store.get("notes", {});
    const qs = store.get("quiz", {}); const qt = Object.entries(qs).filter(([k]) => k !== "mix").map(([, v]) => v).reduce((a, s) => [a[0] + s.right, a[1] + s.total], [0, 0]);
    const pathAll = OA.path.reduce((a, s) => a + pathPct(s), 0) / OA.path.length;
    return {
      title: "내 서재",
      html: `<div class="wrap">${pageHead([[null, "내 서재"]], "My Library", "내 서재", "즐겨찾기, 감상 기록, 메모, 학습 진도는 이 브라우저에만 저장됩니다. 다른 기기와 공유되지 않습니다.")}
      <div class="kpis"><div class="kpi"><div class="stat">${done.length}<span class="muted" style="font-size:22px">/${OA.works.length}</span></div><span>감상 완료한 작품</span></div><div class="kpi"><div class="stat">${favs.length}</div><span>즐겨찾기</span></div><div class="kpi"><div class="stat">${Math.round(pathAll)}%</div><span>학습 경로 진도</span></div><div class="kpi"><div class="stat">${qt[1] ? Math.round((qt[0] / qt[1]) * 100) + "%" : "—"}</div><span>퀴즈 정답률 (${qt[1]}문항)</span></div></div>
      <section class="block" style="margin-top:48px"><div class="block-head"><h2>학습 경로</h2></div><div class="path">${OA.path.map((s) => { const p = pathPct(s); return `<a class="step" href="${s.route}"><span class="prog" style="width:${p}%"></span><b>${s.ko}</b><span>${s.desc}</span><div class="pct">${p}%</div></a>`; }).join("")}</div></section>
      <section class="block"><div class="block-head"><h2>즐겨찾기</h2><span class="count">${favs.length}</span></div>${favs.length ? `<div class="wlist">${favs.map((id) => wrow(W[id])).join("")}</div>` : `<p class="muted">작품 페이지에서 ☆ 즐겨찾기를 눌러 보세요.</p>`}</section>
      <section class="block"><div class="block-head"><h2>감상 완료</h2><span class="count">${done.length}</span></div>${done.length ? `<div class="wlist">${done.map((id) => wrow(W[id])).join("")}</div>` : `<p class="muted">아직 감상 완료로 표시한 작품이 없습니다.</p>`}</section>
      <section class="block"><div class="block-head"><h2>감상 메모</h2><span class="count">${Object.keys(notes).length}</span></div>${Object.keys(notes).length ? Object.entries(notes).filter(([id]) => W[id]).map(([id, t]) => `<div class="note" data-era="${workEra(W[id])}"><a class="lk" href="#/works/${id}"><b>${esc(W[id].ko)}</b></a> <span class="small muted">${C[W[id].composer].short}</span><br>${esc(t).replace(/\n/g, "<br>")}</div>`).join("") : `<p class="muted">작품 페이지 아래 메모 칸에 적은 내용이 여기에 모입니다.</p>`}</section>
      <p><button class="btn ghost sm" data-reset>기록 모두 지우기</button></p></div>`,
      mount(root) { $("[data-reset]", root).onclick = () => { if (confirm("즐겨찾기, 감상 기록, 메모, 퀴즈 기록을 모두 지울까요?")) { ["favs", "done", "notes", "quiz", "visited"].forEach((k) => store.set(k, k === "notes" || k === "quiz" ? {} : [])); render(); } }; }
    };
  };

  V.notfound = () => ({ title: "찾을 수 없음", html: `<div class="wrap">${pageHead([], "404", "페이지를 찾을 수 없습니다", "주소가 바뀌었거나 아직 준비되지 않은 항목입니다.", `<p style="margin-top:20px"><a class="btn" href="#/">홈으로</a></p>`)}</div>` });

  /* ---------- Search ---------- */
  let INDEX = null;
  function buildIndex() {
    const add = [];
    OA.works.forEach((w) => { const c = C[w.composer]; add.push({ g: "작품", l: w.ko, s: `${c.short} · ${w.en}`, r: catText(w), h: `#/works/${w.id}`, cat: w.cat.flatMap((x) => [x.t, x.s === "k" ? x.t.replace("K.", "KV") : null]).filter(Boolean), k: [w.ko, w.en, w.nick, c.short + w.ko, c.latin + w.en], weak: [c.short, c.latin, c.ko] }); });
    OA.composers.forEach((c) => add.push({ g: "작곡가", l: c.ko, s: `${c.en} · ${yrs(c)}`, r: E[c.era].ko, h: `#/composers/${c.id}`, k: [c.ko, c.short, c.en, c.latin] }));
    OA.catalogs.forEach((c) => add.push({ g: "작품 번호", l: c.abbr, s: c.origin, r: c.read.split(" / ")[0], h: `#/catalog/${c.id}`, k: [c.abbr, c.origin, c.read], cat: [c.abbr] }));
    OA.genres.forEach((g) => add.push({ g: "장르·형식", l: g.ko, s: g.en, r: "", h: `#/genres/${g.id}`, k: [g.ko, g.en] }));
    OA.eras.forEach((e) => add.push({ g: "시대", l: e.ko, s: e.en, r: e.range, h: `#/eras/${e.id}`, k: [e.ko, e.en] }));
    OA.theory.forEach((t) => add.push({ g: "음악 이론", l: t.ko, s: t.en, r: "", h: `#/theory/${t.id}`, k: [t.ko, t.en] }));
    OA.performers.forEach((p) => add.push({ g: "연주자", l: p.ko, s: p.en, r: OA.roles[p.role], h: `#/performers/${p.id}`, k: [p.ko, p.en] }));
    OA.glossary.forEach((t) => add.push({ g: "용어", l: t.term, s: t.ko, r: "", h: `#/glossary/${t.id}`, k: [t.term, t.ko] }));
    add.forEach((e) => { e.kc = e.k.filter(Boolean).map(compact); e.cc = (e.cat || []).map(compact); e.wc = (e.weak || []).map(compact); });
    return add;
  }
  function doSearch(q) {
    INDEX = INDEX || buildIndex();
    const qc = compact(q); if (!qc) return [];
    const res = [];
    for (const e of INDEX) {
      let s = 0;
      for (const c of e.cc) { if (c === qc) s = Math.max(s, 120); else if (c.startsWith(qc) && !/\d/.test(c[qc.length] || "")) s = Math.max(s, 90); else if (c.startsWith(qc)) s = Math.max(s, 60); }
      for (const k of e.kc) { if (k === qc) s = Math.max(s, 100); else if (k.startsWith(qc)) s = Math.max(s, 70); else if (k.includes(qc)) s = Math.max(s, 40); }
      for (const k of e.wc) if (k.includes(qc)) s = Math.max(s, 30);
      if (s) res.push({ ...e, score: s });
    }
    return res.sort((a, b) => b.score - a.score).slice(0, 40);
  }
  function openSearch(initial = "") {
    closeSearch();
    const ov = document.createElement("div"); ov.className = "search-ov"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "검색");
    ov.innerHTML = `<div class="search-box"><div class="search-in">${I.search}<input type="text" placeholder="작곡가, 작품, 장르, 용어, Op. 9 No. 2 …" aria-label="검색어" autocomplete="off" spellcheck="false"><span class="kbd">esc</span></div><div class="sres" role="listbox"></div>
      <div class="shint"><span><span class="kbd">↑↓</span> 이동</span><span><span class="kbd">↵</span> 열기</span><span>작품 번호는 띄어쓰기·마침표 없이도 찾을 수 있어요 (예: op9no2, k525)</span></div></div>`;
    document.body.appendChild(ov);
    const inp = $("input", ov), box = $(".sres", ov); let sel = 0, items = [];
    const draw = () => {
      items = doSearch(inp.value); sel = 0;
      if (!inp.value.trim()) { box.innerHTML = `<div class="sgroup">추천 검색</div>${["Op. 9 No. 2", "K. 525", "BWV 1007", "쇼팽", "교향곡", "낭만주의", "소나타 형식", "Allegro"].map((x) => `<a class="sitem" href="#" data-fill="${x}"><b>${x}</b></a>`).join("")}`; return; }
      if (!items.length) { box.innerHTML = `<div class="sgroup">결과 없음</div><div class="sitem"><span class="muted small">‘${esc(inp.value)}’과(와) 일치하는 항목이 없습니다. Apple Music에서 바로 찾아볼까요?</span>${listenBtn([inp.value], inp.value, "Apple Music 검색")}</div>`; return; }
      const groups = [...new Set(items.map((x) => x.g))]; let n = 0;
      box.innerHTML = groups.map((g) => `<div class="sgroup">${g}</div>${items.filter((x) => x.g === g).map((x) => `<a class="sitem${n === 0 ? " sel" : ""}" data-n="${n++}" href="${x.h}"><span><b>${esc(x.l)}</b><span class="sub">${esc(x.s)}</span></span><span class="r">${esc(x.r)}</span></a>`).join("")}`).join("");
      items = $$(".sitem[data-n]", box);
    };
    inp.addEventListener("input", draw);
    inp.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); if (!items.length) return; items[sel]?.classList.remove("sel"); sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; items[sel].classList.add("sel"); items[sel].scrollIntoView({ block: "nearest" }); }
      if (e.key === "Enter" && items[sel]?.href) { e.preventDefault(); location.hash = items[sel].getAttribute("href"); closeSearch(); }
    });
    ov.addEventListener("click", (e) => {
      if (e.target === ov) return closeSearch();
      const f = e.target.closest("[data-fill]"); if (f) { e.preventDefault(); inp.value = f.dataset.fill; draw(); inp.focus(); return; }
      if (e.target.closest("a.sitem[href^='#/']")) closeSearch();
    });
    inp.value = initial; draw(); inp.focus();
  }
  function closeSearch() { $(".search-ov")?.remove(); }

  /* ---------- Tooltip ---------- */
  let tipEl = null, tipFor = null, tipTimer = null;
  function showTip(btn) {
    const t = T[btn.dataset.term]; if (!t) return;
    hideTip(true); tipFor = btn;
    tipEl = document.createElement("div"); tipEl.className = "tip"; tipEl.setAttribute("role", "tooltip");
    tipEl.innerHTML = `<b>${esc(t.term)}<span class="tip-ko">${esc(t.ko)}</span></b>${rich(t.def)}${t.ex ? `<span class="tip-ex">예: ${rich(t.ex)}</span>` : ""}<a class="tip-more" href="#/glossary/${t.id}">용어 사전에서 보기 →</a>`;
    document.body.appendChild(tipEl);
    const r = btn.getBoundingClientRect(), tw = tipEl.offsetWidth, th = tipEl.offsetHeight;
    let left = r.left + window.scrollX + r.width / 2 - tw / 2; left = Math.max(10 + window.scrollX, Math.min(left, window.scrollX + document.documentElement.clientWidth - tw - 10));
    let top = r.bottom + window.scrollY + 8; if (r.bottom + th + 16 > window.innerHeight) top = r.top + window.scrollY - th - 8;
    tipEl.style.left = left + "px"; tipEl.style.top = top + "px";
    tipEl.addEventListener("mouseenter", () => clearTimeout(tipTimer)); tipEl.addEventListener("mouseleave", () => hideTip());
  }
  function hideTip(now) { clearTimeout(tipTimer); const go = () => { tipEl?.remove(); tipEl = null; tipFor = null; }; now ? go() : (tipTimer = setTimeout(go, 160)); }

  /* ---------- Router ---------- */
  const NAV = [["map", "구조"], ["theory", "이론"], ["genres", "장르·형식"], ["eras", "시대"], ["composers", "작곡가"], ["works", "작품"], ["catalog", "작품번호"], ["recordings", "명반"], ["glossary", "용어"], ["quiz", "퀴즈"]];
  function parse() {
    const h = location.hash.replace(/^#\/?/, "").split("?")[0];
    const [a = "", b = ""] = h.split("/").map(decodeURIComponent);
    return { a, b };
  }
  function render() {
    const { a, b } = parse();
    const main = $("#main");
    $$(".demo", main).forEach((d) => d._cleanup && d._cleanup());
    hideTip(true);
    const viewFn = a === "" ? V.home : V[a];
    let view;
    try { view = viewFn ? viewFn(b || undefined) : V.notfound(); } catch (err) { console.error(err); view = V.notfound(); }
    main.innerHTML = `<div class="fade-in">${view.html}</div>`;
    document.title = (a ? view.title + " · " : "") + "Opus Atlas — 클래식 음악 학습 아카이브";
    if (view.mount) view.mount(main);
    $$(".nav a").forEach((n) => n.classList.toggle("on", n.dataset.r === a || (a === "performers" && n.dataset.r === "recordings")));
    $("#drawer").hidden = true; $("[data-menu]").setAttribute("aria-expanded", "false");
    if (!/^#\/catalog\/\w|^#\/glossary\/\w/.test(location.hash)) window.scrollTo(0, 0);
    const v = store.get("visited", []); const key = b ? `${a}/${b}` : a; if (a && !v.includes(key)) { v.push(key); store.set("visited", v); }
  }

  /* ---------- Shell ---------- */
  function shell() {
    document.body.insertAdjacentHTML("afterbegin", `
      <a class="sr" href="#main">본문으로 건너뛰기</a>
      <header class="top"><div class="wrap top-in">
        <a class="brand" href="#/"><span class="brand-mark">Opus <b>Atlas</b></span><span class="brand-sub">클래식 아카이브</span></a>
        <nav class="nav" aria-label="주 메뉴">${NAV.map(([r, t]) => `<a href="#/${r}" data-r="${r}">${t}</a>`).join("")}</nav>
        <div class="tools">
          <button class="icon-btn search-btn" data-open-search aria-label="검색">${I.search}<span class="label">검색</span><span class="kbd">/</span></button>
          <a class="icon-btn" href="#/me" aria-label="내 서재" title="내 서재">${I.shelf}</a>
          <button class="icon-btn" data-theme-btn aria-label="화면 테마 전환" title="라이트/다크">${I.moon}</button>
          <button class="icon-btn menu-btn" data-menu aria-label="메뉴 열기" aria-expanded="false">${I.menu}</button>
        </div></div></header>
      <nav class="drawer" id="drawer" hidden aria-label="모바일 메뉴">${NAV.map(([r, t]) => `<a href="#/${r}">${t}<span>${{ map: "Overview", theory: "Theory", genres: "Genres", eras: "History", composers: "Composers", works: "Works", catalog: "Catalogue", recordings: "Recordings", glossary: "Glossary", quiz: "Quiz" }[r]}</span></a>`).join("")}<a href="#/me">내 서재<span>Library</span></a></nav>
      <main id="main" tabindex="-1"></main>
      <footer class="foot"><div class="wrap foot-in"><div><span class="brand-mark">Opus <b>Atlas</b></span><p>클래식 음악의 시대, 작곡가, 장르, 음악 이론, 작품 번호, 명연주를 하나의 연결된 지식 지도로 제공하는 초보자 친화적인 학습 아카이브.</p></div>
        <div style="max-width:420px"><p>음원은 Apple Music 공식 임베드 플레이어와 카탈로그 검색으로 연결하며, 이 사이트는 음원을 저장하거나 업로드하지 않습니다. Apple Music은 Apple Inc.의 상표입니다.</p><p>작품 번호·연도·음반 정보는 공개 자료를 바탕으로 정리했으며, 판본과 재발매에 따라 다를 수 있습니다.</p></div></div></footer>`);
    const applyTheme = (t) => { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; const dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; $("[data-theme-btn]").innerHTML = dark ? I.sun : I.moon; };
    applyTheme(store.get("theme", null));
    $("[data-theme-btn]").onclick = () => { const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); const nt = cur === "dark" ? "light" : "dark"; store.set("theme", nt); applyTheme(nt); };
    $("[data-menu]").onclick = (e) => { const d = $("#drawer"); d.hidden = !d.hidden; e.currentTarget.setAttribute("aria-expanded", String(!d.hidden)); };
  }

  document.addEventListener("click", (e) => {
    const l = e.target.closest("[data-listen]");
    if (l) { e.preventDefault(); let q; try { q = JSON.parse(l.dataset.listen); } catch (err) { q = [l.dataset.listen]; } OA.music.open(q, l.dataset.label); return; }
    const s = e.target.closest("[data-open-search]"); if (s) { e.preventDefault(); openSearch(); return; }
    const qb = e.target.closest("[data-q]"); if (qb) { openSearch(qb.dataset.q); return; }
    const t = e.target.closest(".term"); if (t) { e.preventDefault(); if (tipFor !== t) showTip(t); else if (!matchMedia("(hover: hover)").matches) hideTip(true); return; }
    if (tipEl && !e.target.closest(".tip")) hideTip(true);
    const f = e.target.closest("[data-fav]"); if (f) { const on = toggle("favs", f.dataset.fav); f.classList.toggle("on", on); f.innerHTML = `${on ? I.starF : I.star}<span>${on ? "즐겨찾기됨" : "즐겨찾기"}</span>`; return; }
    const d = e.target.closest("[data-done]"); if (d) { const on = toggle("done", d.dataset.done); d.classList.toggle("on", on); d.innerHTML = `${I.check}<span>${on ? "감상 완료" : "감상 완료로 표시"}</span>`; return; }
  });
  document.addEventListener("mouseover", (e) => { const t = e.target.closest?.(".term"); if (t && matchMedia("(hover: hover)").matches && tipFor !== t) showTip(t); });
  document.addEventListener("mouseout", (e) => { const t = e.target.closest?.(".term"); if (t && !e.relatedTarget?.closest?.(".tip")) hideTip(); });
  document.addEventListener("focusin", (e) => { if (e.target.classList?.contains("term")) showTip(e.target); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeSearch(); hideTip(true); }
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
    if (!typing && (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"))) { e.preventDefault(); openSearch(); }
  });

  shell();
  window.addEventListener("hashchange", render);
  render();
  OA.music.init();
  OA.app = { doSearch, decodeSegs, keyInfo };
})();
