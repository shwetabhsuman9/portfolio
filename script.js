(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /*  Basic content injection from CONFIG                                */
  /* ------------------------------------------------------------------ */
  function renderStaticContent() {
    document.title = `${CONFIG.name} — ${CONFIG.title}`;
    $("#logoInitials").textContent = CONFIG.initials;
    $("#heroName").textContent = CONFIG.name;
    $("#heroSummary").textContent = CONFIG.summary.replace(/\s+/g, " ").trim();
    $("#aboutText").textContent = CONFIG.summary.replace(/\s+/g, " ").trim();
    $("#statusText").textContent = CONFIG.status;
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${CONFIG.name}. Built with vanilla HTML/CSS/JS.`;

    $("#resumeLink").href = CONFIG.resumeFile;

    $("#emailText").textContent = CONFIG.email;
    $("#linkedinLink").href = CONFIG.linkedin;
    $("#linkedinText").textContent = CONFIG.linkedin.replace(/^https?:\/\//, "");
    $("#githubLinkContact").href = CONFIG.github;
    $("#githubText").textContent = CONFIG.github.replace(/^https?:\/\//, "");

    if (!CONFIG.phone) {
      // phone intentionally hidden — nothing to render
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Stats / spec sheet                                                  */
  /* ------------------------------------------------------------------ */
  function renderStats() {
    const el = $("#statsList");
    el.innerHTML = CONFIG.stats.map(s => `
      <div>
        <span class="spec-value">${escapeHTML(s.value)}</span>
        <span class="spec-label">${escapeHTML(s.label)}</span>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------ */
  /*  Experience timeline                                                 */
  /* ------------------------------------------------------------------ */
  function renderTimeline() {
    const el = $("#timeline");
    el.innerHTML = CONFIG.experience.map(job => `
      <div class="tl-item" data-reveal>
        <span class="tl-date mono">${escapeHTML(job.start)} — ${escapeHTML(job.end)}</span>
        <div class="tl-role">${escapeHTML(job.role)}</div>
        <div class="tl-company">${escapeHTML(job.company)} · ${escapeHTML(job.location)}</div>
        <ul class="tl-points">
          ${job.points.map(p => `<li>${escapeHTML(p)}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------ */
  /*  Skills                                                              */
  /* ------------------------------------------------------------------ */
  function renderSkills() {
    const el = $("#skillsGrid");
    el.innerHTML = CONFIG.skills.map(group => `
      <div class="skill-card" data-reveal>
        <div class="skill-cat">${escapeHTML(group.category.toUpperCase())}</div>
        <div class="skill-tags">
          ${group.items.map(i => `<span class="tag">${escapeHTML(i)}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------ */
  /*  Flagship project (manual, proprietary)                             */
  /* ------------------------------------------------------------------ */
  function renderFlagship() {
    const p = CONFIG.flagshipProject;
    if (!p) return;
    $("#flagshipCard").innerHTML = `
      <div class="pc-top">
        <div class="pc-name">${escapeHTML(p.name)}</div>
        <span class="pc-badge">${escapeHTML(p.badge)}</span>
      </div>
      <div class="pc-role mono">${escapeHTML(p.role)}</div>
      <p class="pc-desc">${escapeHTML(p.description)}</p>
      <div class="pc-tags">${p.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("")}</div>
    `;
  }

  /* ------------------------------------------------------------------ */
  /*  GitHub projects — live fetch, falls back to CONFIG.fallbackProjects */
  /* ------------------------------------------------------------------ */
  const LANG_COLORS = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Java: "#b07219",
    HTML: "#e34c26", CSS: "#563d7c", Python: "#3572A5",
    "C++": "#f34b7d", Shell: "#89e051", Vue: "#41b883"
  };

  async function loadProjects() {
    const statusEl = $("#projectsStatus");
    const gridEl = $("#projectsGrid");
    const username = CONFIG.githubUsername;

    if (!username) {
      statusEl.textContent = "";
      renderProjectCards(CONFIG.fallbackProjects || []);
      return;
    }

    try {
      const res = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      const repos = await res.json();

      const filtered = repos
        .filter(r => !r.fork && !r.archived)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, CONFIG.githubProjectCount || 6);

      if (filtered.length === 0) {
        statusEl.textContent = "$ no public repositories found — add one on GitHub and refresh";
        renderProjectCards(CONFIG.fallbackProjects || []);
        return;
      }

      statusEl.innerHTML = `$ live from <a href="https://github.com/${username}" target="_blank" rel="noopener" style="color:var(--accent-2)">github.com/${username}</a> — ${filtered.length} repositories`;
      renderProjectCards(filtered.map(r => ({
        name: r.name,
        description: r.description || "No description yet.",
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        updated: r.pushed_at
      })));
    } catch (err) {
      console.warn("GitHub fetch failed, using fallback projects:", err);
      statusEl.textContent = "$ showing saved projects — live GitHub data unavailable right now";
      renderProjectCards(CONFIG.fallbackProjects || []);
    }
  }

  function renderProjectCards(list) {
    const gridEl = $("#projectsGrid");
    if (!list.length) {
      gridEl.innerHTML = `<p class="muted small">No projects listed yet.</p>`;
      return;
    }
    gridEl.innerHTML = list.map(p => {
      const dateStr = p.updated
        ? new Date(p.updated).toLocaleDateString(undefined, { year: "numeric", month: "short" })
        : "";
      const langDot = p.language
        ? `<span class="lang-dot" style="background:${LANG_COLORS[p.language] || "#8CA0B8"}"></span>${escapeHTML(p.language)}`
        : "";
      const tags = p.tags ? p.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("") : "";
      return `
        <a class="repo-card" href="${p.url}" target="_blank" rel="noopener" data-reveal>
          <div class="repo-top">
            <span class="repo-name">${escapeHTML(p.name)}</span>
            <span class="repo-arrow" aria-hidden="true">↗</span>
          </div>
          <p class="repo-desc">${escapeHTML(p.description)}</p>
          ${tags ? `<div class="pc-tags">${tags}</div>` : ""}
          <div class="repo-meta">
            ${langDot ? `<span>${langDot}</span>` : ""}
            ${typeof p.stars === "number" ? `<span>★ ${p.stars}</span>` : ""}
            ${dateStr ? `<span>${dateStr}</span>` : ""}
          </div>
        </a>
      `;
    }).join("");
    observeReveals();
  }

  /* ------------------------------------------------------------------ */
  /*  Education / certs / honors                                         */
  /* ------------------------------------------------------------------ */
  function renderEducation() {
    $("#eduGrid").innerHTML = CONFIG.education.map(e => `
      <div class="edu-card" data-reveal>
        <div class="edu-period mono">${escapeHTML(e.period)}</div>
        <div class="edu-degree">${escapeHTML(e.degree)}</div>
        <div class="edu-school">${escapeHTML(e.school)}</div>
        ${e.detail ? `<div class="edu-detail">${escapeHTML(e.detail)}</div>` : ""}
      </div>
    `).join("");

    $("#certList").innerHTML = (CONFIG.certifications || []).map(c => `<li>${escapeHTML(c)}</li>`).join("");
    $("#honorList").innerHTML = (CONFIG.honors || []).map(h => `<li>${escapeHTML(h)}</li>`).join("");
  }

  /* ------------------------------------------------------------------ */
  /*  Hero typing effect                                                  */
  /* ------------------------------------------------------------------ */
  function startTyping() {
    const el = $("#typedRole");
    const roles = CONFIG.roles && CONFIG.roles.length ? CONFIG.roles : [CONFIG.title];

    if (prefersReducedMotion) {
      el.textContent = roles[0];
      return;
    }

    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ------------------------------------------------------------------ */
  /*  Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  let revealObserver;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$("[data-reveal]").forEach(el => el.classList.add("in-view"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    }
    $$("[data-reveal]:not(.in-view)").forEach(el => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------ */
  /*  Mobile nav                                                          */
  /* ------------------------------------------------------------------ */
  function initNav() {
    const toggle = $("#navToggle");
    const nav = $("#nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("#nav a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ------------------------------------------------------------------ */
  /*  Copy email                                                          */
  /* ------------------------------------------------------------------ */
  function initCopyEmail() {
    const btn = $("#copyEmailBtn");
    const hint = $("#copyHint");
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.email);
        hint.textContent = "copied!";
      } catch {
        hint.textContent = CONFIG.email;
      }
      hint.style.opacity = "1";
      setTimeout(() => { hint.textContent = "click to copy"; hint.style.opacity = ""; }, 1800);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Utils                                                               */
  /* ------------------------------------------------------------------ */
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ------------------------------------------------------------------ */
  /*  Init                                                                */
  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    renderStaticContent();
    renderStats();
    renderTimeline();
    renderSkills();
    renderFlagship();
    renderEducation();
    initNav();
    initCopyEmail();
    startTyping();
    observeReveals();
    loadProjects();
  });
})();
