/* Apple Music integration.
   1) Search: iTunes Search API (no key; JSONP so it works on any static host).
   2) Playback: official Apple Music embed player (embed.music.apple.com). Signed-in Apple Music
      subscribers hear full tracks in the embed; everyone else gets the 30-second preview.
   3) Optional: MusicKit JS v3 for full in-page playback when a developer token is set in js/config.js. */
(function () {
  const CFG = Object.assign({ storefront: "kr", musicKitDeveloperToken: "", appName: "Opus Atlas" }, window.OA_CONFIG || {});
  const cc = CFG.storefront.toLowerCase();
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = {
    note: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 3.2a1 1 0 0 0-.8-.2l-9 2A1 1 0 0 0 9 6v9.3A3.5 3.5 0 1 0 11 18.5V10.8l7-1.6v4.1a3.5 3.5 0 1 0 2 3.2V4a1 1 0 0 0-.4-.8Z"/></svg>',
    min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
  };

  let el, state = { q: "", label: "", results: [], cur: null, mini: false, mk: null, mkAuthorized: false };

  function amSearchUrl(q) { return `https://music.apple.com/${cc}/search?term=${encodeURIComponent(q)}`; }

  function jsonp(url, timeout = 9000) {
    return new Promise((resolve, reject) => {
      const cb = "__oa_cb_" + Math.random().toString(36).slice(2);
      const s = document.createElement("script");
      const t = setTimeout(() => { cleanup(); reject(new Error("timeout")); }, timeout);
      function cleanup() { clearTimeout(t); delete window[cb]; s.remove(); }
      window[cb] = (data) => { cleanup(); resolve(data); };
      s.onerror = () => { cleanup(); reject(new Error("network")); };
      s.src = url + (url.includes("?") ? "&" : "?") + "callback=" + cb;
      document.head.appendChild(s);
    });
  }

  async function search(q) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&country=${cc}&media=music&entity=song&limit=15`;
    const data = await jsonp(url);
    return (data.results || []).filter((r) => r.kind === "song" && r.trackViewUrl);
  }

  function embedUrl(t) {
    // trackViewUrl: https://music.apple.com/kr/album/<slug>/<collectionId>?i=<trackId>&uo=4
    try {
      const u = new URL(t.trackViewUrl);
      u.host = "embed.music.apple.com";
      u.searchParams.delete("uo");
      return u.toString();
    } catch (e) {
      return `https://embed.music.apple.com/${cc}/album/${t.collectionId}?i=${t.trackId}`;
    }
  }

  function fmt(ms) { if (!ms) return ""; const s = Math.round(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  function build() {
    el = document.createElement("aside");
    el.className = "player";
    el.id = "player";
    el.setAttribute("aria-label", "Apple Music 플레이어");
    el.hidden = true;
    el.innerHTML = `
      <div class="ph">
        <span class="am">${icon.note} Apple Music</span>
        <span class="ctx" data-ctx></span>
        <button class="icon-btn" data-p="toggle" aria-label="접기/펼치기" title="접기/펼치기">${icon.min}</button>
        <button class="icon-btn" data-p="close" aria-label="플레이어 닫기" title="닫기">${icon.x}</button>
      </div>
      <div class="pbody">
        <div class="presults" data-results></div>
        <div class="pembed" data-embed></div>
      </div>
      <div class="pfoot">
        <span data-mknote></span>
        <a data-open target="_blank" rel="noopener">Apple Music에서 검색 결과 열기 ↗</a>
      </div>`;
    document.body.appendChild(el);
    el.addEventListener("click", onClick);
    updateMkNote();
  }

  function onClick(e) {
    const b = e.target.closest("[data-p]");
    if (b) {
      const a = b.dataset.p;
      if (a === "close") close();
      if (a === "toggle") setMini(!state.mini);
      if (a === "mk-login") mkLogin();
      if (a === "mk-toggle") mkToggle();
      return;
    }
    const tr = e.target.closest("[data-ti]");
    if (tr) play(state.results[+tr.dataset.ti]);
  }

  function setMini(v) {
    state.mini = v;
    el.classList.toggle("mini", v);
    el.querySelector('[data-p="toggle"]').innerHTML = v ? icon.max : icon.min;
    document.body.classList.toggle("has-player", !el.hidden);
  }

  function close() {
    el.hidden = true;
    el.querySelector("[data-embed]").innerHTML = "";
    if (state.mk) try { state.mk.stop(); } catch (e) {}
    document.body.classList.remove("has-player");
  }

  function renderResults() {
    const box = el.querySelector("[data-results]");
    if (!state.results.length) {
      box.innerHTML = `<div class="pstate">‘${esc(state.q)}’에 대한 결과가 없습니다. <a href="${amSearchUrl(state.q)}" target="_blank" rel="noopener">Apple Music에서 직접 검색 ↗</a></div>`;
      return;
    }
    box.innerHTML = state.results.map((t, i) => `
      <button class="ptrack${state.cur && state.cur.trackId === t.trackId ? " on" : ""}" data-ti="${i}">
        <img src="${esc((t.artworkUrl100 || "").replace("100x100", "120x120"))}" alt="" loading="lazy">
        <span><b>${esc(t.trackName)}</b><span>${esc(t.artistName)} · ${esc(t.collectionName)}</span></span>
        <span class="dur">${fmt(t.trackTimeMillis)}</span>
      </button>`).join("");
  }

  async function open(qs, label) {
    if (!el) build();
    qs = (Array.isArray(qs) ? qs : [qs]).filter(Boolean);
    const q = qs[0];
    state.q = q; state.label = label || q; state.results = []; state.cur = null;
    el.hidden = false;
    setMini(false);
    el.querySelector("[data-ctx]").textContent = state.label;
    el.querySelector("[data-open]").href = amSearchUrl(q);
    el.querySelector("[data-results]").innerHTML = `<div class="pstate">Apple Music 카탈로그에서 찾는 중…</div>`;
    el.querySelector("[data-embed]").innerHTML = "";
    try {
      for (const query of qs) {
        state.results = await search(query);
        if (state.results.length) { state.q = query; el.querySelector("[data-open]").href = amSearchUrl(query); break; }
      }
      renderResults();
      if (state.results[0]) play(state.results[0]);
    } catch (err) {
      el.querySelector("[data-results]").innerHTML = `<div class="pstate">검색에 실패했습니다(네트워크 또는 차단). <a href="${amSearchUrl(q)}" target="_blank" rel="noopener">Apple Music에서 ‘${esc(q)}’ 검색 ↗</a></div>`;
    }
  }

  function play(t) {
    if (!t) return;
    state.cur = t;
    renderResults();
    el.querySelector("[data-ctx]").textContent = `${state.label} — ${t.trackName}`;
    if (state.mk && state.mkAuthorized) return mkPlay(t);
    el.querySelector("[data-embed]").innerHTML =
      `<iframe title="Apple Music 플레이어: ${esc(t.trackName)}" allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="${esc(embedUrl(t))}"></iframe>`;
  }

  /* ---------- MusicKit (optional) ---------- */
  function updateMkNote() {
    const n = el && el.querySelector("[data-mknote]");
    if (!n) return;
    if (!CFG.musicKitDeveloperToken) {
      n.innerHTML = "구독자는 브라우저에서 Apple Music에 로그인하면 전체 곡, 그 외에는 미리듣기가 재생됩니다.";
    } else if (!state.mkAuthorized) {
      n.innerHTML = `<button class="icon-btn" data-p="mk-login" style="height:26px;font-size:12px">Apple Music 계정 연결 (전체 재생)</button>`;
    } else {
      n.textContent = "Apple Music 계정 연결됨 · 전체 곡 재생";
    }
  }

  function loadMusicKit() {
    return new Promise((resolve, reject) => {
      if (window.MusicKit) return resolve(window.MusicKit);
      document.addEventListener("musickitloaded", () => resolve(window.MusicKit), { once: true });
      const s = document.createElement("script");
      s.src = "https://js-cdn.music.apple.com/musickit/v3/musickit.js";
      s.async = true;
      s.dataset.webComponents = "";
      s.onerror = () => reject(new Error("MusicKit load failed"));
      document.head.appendChild(s);
    });
  }

  async function mkInit() {
    if (!CFG.musicKitDeveloperToken || state.mk) return state.mk;
    const MK = await loadMusicKit();
    await MK.configure({ developerToken: CFG.musicKitDeveloperToken, app: { name: CFG.appName, build: "1.0.0" }, storefrontId: cc });
    state.mk = MK.getInstance();
    state.mkAuthorized = !!state.mk.isAuthorized;
    state.mk.addEventListener("playbackTimeDidChange", mkProgress);
    state.mk.addEventListener("playbackStateDidChange", mkProgress);
    updateMkNote();
    return state.mk;
  }

  async function mkLogin() {
    try {
      await mkInit();
      await state.mk.authorize();
      state.mkAuthorized = true;
      updateMkNote();
      if (state.cur) mkPlay(state.cur);
    } catch (e) {
      el.querySelector("[data-mknote]").textContent = "Apple Music 계정 연결에 실패했습니다. 임베드 플레이어로 계속 재생합니다.";
    }
  }

  async function mkPlay(t) {
    const box = el.querySelector("[data-embed]");
    box.innerHTML = `<div class="mk-bar">
      <img src="${esc((t.artworkUrl100 || "").replace("100x100", "200x200"))}" alt="">
      <div class="t"><b>${esc(t.trackName)}</b><span>${esc(t.artistName)}</span><progress max="1" value="0" data-mkprog></progress></div>
      <button class="icon-btn" data-p="mk-toggle" aria-label="재생/일시정지" data-mkbtn>${icon.pause}</button></div>`;
    try {
      await state.mk.setQueue({ song: String(t.trackId), startPlaying: true });
    } catch (e) {
      state.mkAuthorized = false;
      updateMkNote();
      play(t);
    }
  }

  function mkToggle() {
    if (!state.mk) return;
    const playing = state.mk.playbackState === 2; // MusicKit.PlaybackStates.playing
    playing ? state.mk.pause() : state.mk.play();
  }

  function mkProgress() {
    if (!el || !state.mk) return;
    const p = el.querySelector("[data-mkprog]");
    if (p && state.mk.currentPlaybackDuration) p.value = state.mk.currentPlaybackTime / state.mk.currentPlaybackDuration;
    const b = el.querySelector("[data-mkbtn]");
    if (b) b.innerHTML = state.mk.playbackState === 2 ? icon.pause : icon.play;
  }

  window.OA = window.OA || {};
  OA.music = { open, search, embedUrl, searchUrl: amSearchUrl, init: () => { if (CFG.musicKitDeveloperToken) mkInit().catch(() => {}); } };
})();
