// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pixxen  Financial Advisor js start
// Financial Advisor Cards reveal JS
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".funeral-card-reveal");
  if (!cards.length) return;

  // ---- tweak these ----
  const STAGGER = 220; // ms between cards revealed together
  const DURATION = 1300; // ms for each card's reveal
  // ---------------------

  // arm the cards (so they stay visible if JS fails)
  cards.forEach((card) => {
    card.style.setProperty("--duration", `${DURATION}ms`);
    card.classList.add("is-ready");
  });
  void document.body.offsetHeight; // force reflow so the first transition plays

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        // reveal in DOM order (left to right, top to bottom)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )
        .forEach((entry, i) => {
          const card = entry.target;
          card.style.setProperty("--delay", `${i * STAGGER}ms`);
          card.classList.add("is-revealed");

          card.addEventListener("transitionend", (e) => {
            if (e.propertyName === "transform") card.classList.add("is-done");
          });

          observer.unobserve(card);
        });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  cards.forEach((card) => observer.observe(card));
});

// Financial advisor counter JS
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll(".funeral-counter-item");

  counters.forEach((counter) => {
    const rawVal =
      counter.getAttribute("data-value") || counter.textContent.trim();

    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";

    const cleanVal = rawVal.replace(/[^\d.]/g, "");
    const chars = cleanVal.split("");
    const isSingleDigit = cleanVal.replace(".", "").length === 1;

    counter.innerHTML = "";

    if (prefix) {
      const pSpan = document.createElement("span");
      pSpan.innerHTML = prefix;
      counter.appendChild(pSpan);
    }

    chars.forEach((char, index) => {
      if (char === ".") {
        const dot = document.createElement("span");
        dot.textContent = ".";
        counter.appendChild(dot);
        return;
      }

      const col = document.createElement("span");
      col.className = "funeral-counter-digit-col";

      const list = document.createElement("span");
      list.className = "funeral-counter-digit-list";

      const finalNum = parseInt(char, 10);

      // Standardize the roll: 0 through 9, ending with the specific finalNum
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, finalNum];

      numbers.forEach((num) => {
        const numSpan = document.createElement("span");
        numSpan.textContent = num;
        list.appendChild(numSpan);
      });

      col.appendChild(list);
      counter.appendChild(col);

      // Ensure first digit (index 0) starts cleanly from top
      let startY = 0;

      if (index === 0) {
        startY = 0;
      } else if (!isSingleDigit && index % 2 !== 0) {
        startY = 100;
      } else {
        startY = -100;
      }

      ScrollTrigger.create({
        trigger: counter,
        start: "top bottom",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            list,
            {
              yPercent: startY,
            },
            {
              yPercent: -((numbers.length - 1) * (100 / numbers.length)),
              duration: 2.8,
              ease: "expo.out",
              delay: index * 0.1,
            },
          );
        },
      });
    });

    if (suffix) {
      const sSpan = document.createElement("span");
      sSpan.innerHTML = suffix;
      counter.appendChild(sSpan);
    }
  });
});

// Funeral Cards reveal JS
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".funeral-card-reveal");
  if (!cards.length) return;

  // ---- tweak these ----
  const STAGGER = 220; // ms between cards revealed together
  const DURATION = 1300; // ms for each card's reveal
  // ---------------------

  // arm the cards (so they stay visible if JS fails)
  cards.forEach((card) => {
    card.style.setProperty("--duration", `${DURATION}ms`);
    card.classList.add("is-ready");
  });
  void document.body.offsetHeight; // force reflow so the first transition plays

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        // reveal in DOM order (left to right, top to bottom)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )
        .forEach((entry, i) => {
          const card = entry.target;
          card.style.setProperty("--delay", `${i * STAGGER}ms`);
          card.classList.add("is-revealed");

          card.addEventListener("transitionend", (e) => {
            if (e.propertyName === "transform") card.classList.add("is-done");
          });

          observer.unobserve(card);
        });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  cards.forEach((card) => observer.observe(card));
});

