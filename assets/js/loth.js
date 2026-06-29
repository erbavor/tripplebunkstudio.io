/* Lord of the Halo — game-mode category filter */
(() => {
  "use strict";
  const buttons = document.querySelectorAll(".modefilter button");
  const modes = document.querySelectorAll(".modes .mode");
  if (!buttons.length || !modes.length) return;

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      const f = btn.dataset.filter;
      modes.forEach((m) => {
        const show = f === "all" || m.dataset.cat === f;
        m.classList.toggle("hide", !show);
      });
    })
  );
})();
