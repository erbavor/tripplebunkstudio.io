/* ===================================================================
   Tripple Bunk Studios — shared behaviour
   Vanilla JS, no dependencies. Loaded by every page with `defer`.
   =================================================================== */
(() => {
  "use strict";

  /* ── Sticky nav state + mobile menu ─────────────────────────────── */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const burger = nav.querySelector(".nav__burger");
    if (burger) {
      burger.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        burger.setAttribute("aria-expanded", String(isOpen));
      });
      nav.querySelectorAll(".nav__links a").forEach((a) =>
        a.addEventListener("click", () => {
          nav.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        })
      );
    }
  }

  /* ── Scroll-reveal ──────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ── Count-up stats ([data-count]) ──────────────────────────────── */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const end = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          io2.unobserve(el);
          if (reduceMotion) { el.textContent = end + suffix; return; }
          const dur = 1200;
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(end * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => io2.observe(el));
  }

  /* ── Lightweight lightbox for galleries ([data-lightbox]) ───────── */
  const shots = document.querySelectorAll("[data-lightbox]");
  if (shots.length) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    box.innerHTML = '<button class="lightbox__close" aria-label="Close image viewer">&times;</button><img alt="">';
    document.body.appendChild(box);
    const img = box.querySelector("img");
    const closeBtn = box.querySelector(".lightbox__close");
    let lastFocused = null;
    const open = (src, alt) => {
      lastFocused = document.activeElement;
      img.src = src;
      img.alt = alt || "";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };
    const close = () => {
      box.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };
    shots.forEach((s) => {
      s.setAttribute("role", "button");
      if (!s.hasAttribute("tabindex")) s.setAttribute("tabindex", "0");
      if (!s.hasAttribute("aria-label")) {
        const a = s.getAttribute("alt") || s.querySelector("img")?.alt;
        s.setAttribute("aria-label", a ? "Enlarge image: " + a : "Enlarge image");
      }
      const activate = () => {
        const full = s.dataset.full || s.getAttribute("src") || s.querySelector("img")?.src;
        const alt = s.getAttribute("alt") || s.querySelector("img")?.alt;
        if (full) open(full, alt);
      };
      s.addEventListener("click", activate);
      s.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          activate();
        }
      });
    });
    box.addEventListener("click", (e) => {
      if (e.target === box || e.target.classList.contains("lightbox__close")) close();
    });
    // keep focus inside the dialog (only the close button is focusable here)
    box.addEventListener("keydown", (e) => {
      if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("open")) close();
    });
  }

  /* ── Stamp current year in footers ──────────────────────────────── */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });


})();
