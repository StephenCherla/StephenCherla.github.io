(function () {
  const root = document.documentElement;
  const key = "theme";
  const stored = localStorage.getItem(key);
  if (stored === "dark") root.classList.add("dark");

  function setTheme(next) {
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(key, next);
    const btn = document.querySelector("[data-theme-toggle]");
    if (btn) btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
  }

  window.toggleTheme = function () {
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  // Mobile menu
  window.toggleMenu = function () {
    const panel = document.querySelector("[data-mobile-menu]");
    if (!panel) return;
    panel.classList.toggle("hidden");
  };

  // Init aria state
  document.addEventListener("DOMContentLoaded", () => {
    const isDark = root.classList.contains("dark");
    const btn = document.querySelector("[data-theme-toggle]");
    if (btn) btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();

    // Projects accordion (projects.html)
    const cards = Array.from(document.querySelectorAll("[data-project-card]"));
    if (cards.length) {
      const setExpanded = (target) => {
        cards.forEach((c) => {
          const isOn = c === target;
          c.classList.toggle("is-expanded", isOn);
          const btn = c.querySelector("[data-project-toggle]");
          if (btn) btn.setAttribute("aria-expanded", isOn ? "true" : "false");
        });
      };

      cards.forEach((card) => {
        const btn = card.querySelector("[data-project-toggle]");
        if (!btn) return;
        btn.addEventListener("click", () => setExpanded(card));
        btn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(card);
          }
        });
      });

      // Default: expand the first card
      setExpanded(cards[0]);
    }
  });
})();
