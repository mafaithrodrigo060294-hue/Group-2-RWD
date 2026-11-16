// Shared navigation behavior: mobile menu and accessible dropdown.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav)
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  document.querySelectorAll(".drop-button").forEach((button) =>
    button.addEventListener("click", () => {
      const parent = button.closest(".dropdown");
      const open = parent.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    }),
  );
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", event => {
            const url = new URL(link.href);

            if (
                url.origin !== location.origin ||
                url.pathname === location.pathname ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey ||
                link.target === "_blank"
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        });
    });
});
