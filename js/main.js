/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EG182 Study Site — main.js
   Navigation, modes, glossary, panels
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ── SECTION NAVIGATION ──────────────────────
function showSection(id, e) {
  if (e) e.preventDefault();
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link[data-section]').forEach(t => t.classList.remove('active'));
  const section = document.getElementById(id);
  if (section) { section.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  const tab = document.querySelector(`.nav-link[data-section="${id}"]`);
  if (tab) tab.classList.add('active');
  // Save state for back-button support
  history.pushState({ section: id }, '', `#${id}`);
}

window.addEventListener('popstate', e => {
  const id = (e.state && e.state.section) || location.hash.slice(1) || 'home';
  const el = document.getElementById(id);
  if (el) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link[data-section]').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const tab = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (tab) tab.classList.add('active');
  }
});

// ── LEARN / REVISE MODE ──────────────────────
function setMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.mode-btn[data-mode="${mode}"]`);
  if (btn) btn.classList.add('active');
  if (mode === 'revise') {
    document.body.classList.add('revise-mode');
  } else {
    document.body.classList.remove('revise-mode');
  }
  localStorage.setItem('eg182-mode', mode);
}

// ── GLOSSARY SEARCH ──────────────────────────
function initGlossarySearch(inputId, countId, noResultsId) {
  const input = document.getElementById(inputId);
  const countEl = document.getElementById(countId);
  const noResultsEl = document.getElementById(noResultsId);
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;
    document.querySelectorAll('.term-item').forEach(item => {
      const show = !q || item.dataset.name.includes(q) || item.dataset.def.includes(q);
      item.classList.toggle('hidden', !show);
      if (show) {
        visible++;
        const nameEl = item.querySelector('.term-name');
        const defEl = item.querySelector('.term-def');
        if (q) {
          nameEl.innerHTML = highlight(nameEl.textContent, q);
          defEl.innerHTML = highlight(defEl.textContent, q);
          item.classList.add('match');
        } else {
          nameEl.innerHTML = nameEl.textContent;
          defEl.innerHTML = defEl.textContent;
          item.classList.remove('match');
        }
      }
    });
    document.querySelectorAll('.glossary-section').forEach(sec => {
      const vis = sec.querySelectorAll('.term-item:not(.hidden)').length;
      sec.classList.toggle('hidden', q && vis === 0);
      if (q && vis > 0) sec.classList.remove('collapsed');
    });
    if (countEl) countEl.textContent = q ? `${visible} term${visible !== 1 ? 's' : ''} found` : '';
    if (noResultsEl) noResultsEl.style.display = (q && visible === 0) ? 'block' : 'none';
  });
}

function highlight(text, q) {
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

// ── GLOSSARY FILTER BUTTONS ──────────────────
function initGlossaryFilters(filterSelector) {
  document.querySelectorAll(filterSelector).forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll(filterSelector).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.gfilter;
      const input = document.querySelector('.search-input');
      if (input) { input.value = ''; }
      const countEl = document.getElementById('search-results-count');
      if (countEl) countEl.textContent = '';
      const noResultsEl = document.querySelector('.no-results-msg');
      if (noResultsEl) noResultsEl.style.display = 'none';

      document.querySelectorAll('.glossary-section').forEach(sec => {
        const show = filter === 'all' || sec.dataset.topic === filter;
        sec.classList.toggle('hidden', !show);
        if (show) sec.classList.remove('collapsed');
      });
      document.querySelectorAll('.term-item').forEach(item => {
        item.classList.remove('hidden', 'match');
        const n = item.querySelector('.term-name');
        const d = item.querySelector('.term-def');
        if (n) n.innerHTML = n.textContent;
        if (d) d.innerHTML = d.textContent;
      });
    });
  });
}

// ── GLOSSARY SECTION TOGGLE ──────────────────
function toggleGlossarySection(header) {
  const sec = header.parentElement;
  sec.classList.toggle('collapsed');
  const arrow = header.querySelector('.g-arrow');
  if (arrow) arrow.style.transform = sec.classList.contains('collapsed') ? 'rotate(-90deg)' : '';
}

// ── BUILD GLOSSARY FROM DATA ─────────────────
function buildGlossary(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof glossaryData === 'undefined') return;

  const colorMap = {
    t1:'#7a7a92', t2:'#f7a84a', t3:'#4af7c0', t4:'#7af76a',
    t5:'#6aabf7', t6:'#c06af7', t7:'#f76c8a', t89:'#f7e24a', t10:'#f76af7'
  };

  Object.entries(glossaryData).forEach(([key, topic]) => {
    const color = colorMap[key] || '#7c6af7';
    const sec = document.createElement('div');
    sec.className = 'glossary-section';
    sec.dataset.topic = key;
    sec.innerHTML = `
      <div class="glossary-header" onclick="toggleGlossarySection(this)">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:9px;height:9px;border-radius:50%;background:${color};flex-shrink:0"></div>
          <span style="font-weight:700;font-size:14px">${topic.name}</span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted)">(${topic.terms.length} terms)</span>
        </div>
        <span class="g-arrow" style="color:var(--muted);transition:transform 0.2s">▾</span>
      </div>
      <div class="glossary-grid">
        ${topic.terms.map(([name,def]) => `
          <div class="term-item" data-name="${name.toLowerCase()}" data-def="${def.toLowerCase()}">
            <div class="term-name" style="color:${color}">${name}</div>
            <div class="term-def">${def}</div>
          </div>`).join('')}
      </div>`;
    container.appendChild(sec);
  });
}

// ── KEYBOARD SHORTCUTS ───────────────────────
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    if (typeof showSection === 'function') showSection('glossary');
    setTimeout(() => {
      const inp = document.querySelector('.search-input');
      if (inp) inp.focus();
    }, 150);
  }
  if (e.key === 'Escape') {
    const inp = document.querySelector('.search-input');
    if (inp && document.activeElement === inp) { inp.value = ''; inp.dispatchEvent(new Event('input')); inp.blur(); }
  }
});

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Restore mode
  const savedMode = localStorage.getItem('eg182-mode') || 'learn';
  setMode(savedMode);

  // Handle hash on load
  const hash = location.hash.slice(1);
  if (hash && document.getElementById(hash)) showSection(hash);

  // Build glossary if container exists
  buildGlossary('glossary-container');

  // Init glossary search
  initGlossarySearch('glossary-search-input', 'search-results-count', '.no-results-msg');
  initGlossaryFilters('[data-gfilter]');
});
