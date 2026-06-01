const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const siteHeader = document.querySelector(".site-header");
const pageLoader = document.querySelector(".page-loader");
const leadForm = document.querySelector("#lead-form");
const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioOpenButtons = document.querySelectorAll(".portfolio-open");
const lightbox = document.querySelector("#portfolio-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxCategory = document.querySelector("#lightbox-category");
const lightboxClose = document.querySelector(".lightbox-close");
const faqItems = document.querySelectorAll(".faq-item");

const phoneNumber = "919999999999";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("is-loading");

const revealSelectors = [
  ".hero-content",
  ".trust-strip div",
  ".section-heading",
  ".service-card",
  ".process-card",
  ".conversion-banner",
  ".portfolio-item",
  ".portfolio-highlights",
  ".why-content",
  ".why-list article",
  ".testimonial-card",
  ".faq-item",
  ".faq-cta",
  ".contact-copy",
  ".lead-form",
  ".map-placeholder",
];

document.querySelectorAll(revealSelectors.join(",")).forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 60}ms`);
});

const hideLoader = () => {
  window.setTimeout(() => {
    pageLoader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 320);
};

window.addEventListener("DOMContentLoaded", hideLoader, { once: true });
window.addEventListener("load", hideLoader, { once: true });
window.setTimeout(hideLoader, 1800);

if (!reducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

let ticking = false;

const updateScrollEffects = () => {
  const scrollY = window.scrollY;
  const cappedScroll = Math.min(scrollY, 900);

  siteHeader?.classList.toggle("is-scrolled", scrollY > 16);
  document.documentElement.style.setProperty("--parallax-y", `${cappedScroll}px`);
  document.documentElement.style.setProperty("--parallax-slow", `${cappedScroll * 0.06}px`);
  document.documentElement.style.setProperty("--parallax-fast", `${cappedScroll * 0.18}px`);
  document.documentElement.style.setProperty("--parallax-reverse", `${cappedScroll * -0.08}px`);
  ticking = false;
};

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  },
  { passive: true }
);

updateScrollEffects();

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(leadForm);
  const name = formData.get("name") || "";
  const phone = formData.get("phone") || "";
  const service = formData.get("service") || "";
  const message = formData.get("message") || "";

  const whatsappMessage = [
    "Hi PrintCraft Studio, I need a printing quote.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener");
});

if (hero && heroVisual && !reducedMotion) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;

    heroVisual.style.setProperty("--hero-x", `${x}px`);
    heroVisual.style.setProperty("--hero-y", `${y}px`);
  });

  hero.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--hero-x", "0px");
    heroVisual.style.setProperty("--hero-y", "0px");
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => filterButton.classList.remove("is-active"));
    button.classList.add("is-active");

    portfolioItems.forEach((item) => {
      const shouldShow = activeFilter === "all" || item.dataset.category === activeFilter;
      item.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const closeLightbox = () => {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

portfolioOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCategory) {
      return;
    }

    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.querySelector("img")?.alt || "";
    lightboxTitle.textContent = button.dataset.title || "Portfolio Project";
    lightboxCategory.textContent = button.dataset.categoryLabel || "Portfolio";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});
