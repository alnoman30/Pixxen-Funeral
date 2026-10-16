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

// Pixxen  Funeral js start
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

// funeral-serving-slider
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".funeral-serving-slider").forEach(function (root) {
    const section = root.closest("section");
    const prev = section.querySelector(".funeral-serving-prev");
    const next = section.querySelector(".funeral-serving-next");

    if (!prev || !next) {
      console.warn("Client slider navigation buttons not found.");
      return;
    }

    const splide = new Splide(root, {
      type: "loop",
      perPage: 4.5,
      perMove: 1,
      gap: "1.5rem",
      arrows: false,
      pagination: false,
      drag: true,

      // Autoplay settings
      autoplay: true,
      interval: 3000,
      speed: 1500,
      pauseOnHover: true,
      pauseOnFocus: true,
      resetProgress: false,

      breakpoints: {
        1279: { perPage: 3.5 },
        1023: { perPage: 2.5 },
        767: { perPage: 2.5 },
        639: {
          gap: "1rem",
          perPage: 1.5,
        },
      },
    });

    // Previous button
    prev.addEventListener("click", function (e) {
      e.preventDefault();
      splide.go("<");
    });

    // Next button
    next.addEventListener("click", function (e) {
      e.preventDefault();
      splide.go(">");
    });

    const lastLeft = new WeakMap();

    function updateOpacity() {
      const viewportWidth = document.documentElement.clientWidth;
      const tolerance = 4;
      const slides = root.querySelectorAll(".splide__slide");

      // Detect a teleport: a card suddenly moving more than its own width
      let jumped = false;

      slides.forEach(function (slide) {
        const r = slide.getBoundingClientRect();
        const before = lastLeft.get(slide);

        if (
          before !== undefined &&
          r.width > 0 &&
          Math.abs(r.left - before) > r.width
        ) {
          jumped = true;
        }

        lastLeft.set(slide, r.left);
      });

      if (jumped) {
        root.classList.add("is-jumping");
      }

      slides.forEach(function (slide) {
        const r = slide.getBoundingClientRect();

        const inside =
          r.width > 0 &&
          r.left >= -tolerance &&
          r.right <= viewportWidth + tolerance;

        slide.classList.toggle("is-fully-visible", inside);
      });

      if (jumped) {
        void root.offsetWidth;

        requestAnimationFrame(function () {
          root.classList.remove("is-jumping");
        });
      }
    }

    let rafId = null;

    function trackMovement() {
      cancelAnimationFrame(rafId);

      const end = performance.now() + (splide.options.speed || 2000) + 150;

      (function loop() {
        updateOpacity();

        if (performance.now() < end) {
          rafId = requestAnimationFrame(loop);
        }
      })();
    }

    function settle() {
      updateOpacity();

      requestAnimationFrame(updateOpacity);
      setTimeout(updateOpacity, 150);
      setTimeout(updateOpacity, 500);
    }

    // Splide events
    splide.on("mounted resized refresh", settle);
    splide.on("move", trackMovement);
    splide.on("dragging scrolling moved dragged", updateOpacity);

    // Initialize slider
    splide.mount();

    // Recalculate visibility on page load and resize
    window.addEventListener("load", settle);
    window.addEventListener("resize", updateOpacity);
  });
});

// Funeral headign reveal
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headings = document.querySelectorAll(".funeral-heading-reveal");
  if (!headings.length) return;

  // ---- tweak these ----
  const FROM_Y = 100; // % of line height words start below their line
  const BLUR = 12; // starting blur in px
  const DURATION = 1.2;
  const STAGGER = 0.05;
  const START = "top 85%";
  // ---------------------

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const setup = () => {
    headings.forEach((heading) => {
      if (reduceMotion) {
        gsap.set(heading, { visibility: "visible", opacity: 1 });
        return;
      }

      let played = false;
      let tween = null;

      SplitText.create(heading, {
        type: "lines,words",
        mask: "lines", // each line clips its words so they rise from behind it
        linesClass: "split-line",
        wordsClass: "split-word",
        autoSplit: true, // re-splits automatically on resize / font load: no reload needed
        onSplit(self) {
          gsap.set(heading, { visibility: "visible", opacity: 1 });

          // already revealed (e.g. window resized afterwards): keep the final state
          if (played) return;

          tween = gsap.from(self.words, {
            yPercent: FROM_Y,
            opacity: 0,
            filter: `blur(${BLUR}px)`,
            duration: DURATION,
            ease: "power4.out",
            stagger: STAGGER,
            paused: true,
            onComplete: () => {
              played = true;
              gsap.set(self.words, { clearProps: "filter,willChange" });
            },
          });

          // returning the tween lets SplitText rebuild it on resize
          // and keep it at the same progress, so a mid-animation resize is safe
          return tween;
        },
      });

      // one ScrollTrigger per heading (created once, outside onSplit)
      ScrollTrigger.create({
        trigger: heading,
        start: START,
        once: true,
        onEnter: () => tween && tween.play(),
      });
    });
  };

  // wait for fonts so the first split measures the real line breaks
  (document.fonts && document.fonts.ready
    ? document.fonts.ready
    : Promise.resolve()
  ).then(setup);
});

// Funeral hero js
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const heroSection = document.querySelector(".funeral-hero-section");
  if (!heroSection) return;

  const title = heroSection.querySelector(".funeral-hero-title");
  const desc = heroSection.querySelector(".funeral-hero-desc");
  const buttons = heroSection.querySelectorAll(
    ".funeral-hero-buttons .funeral-btn-cta",
  );
  const priceBox = heroSection.querySelector(".funeral-hero-pricebox");
  const divider = heroSection.querySelector(".funeral-divider-line");
  const checklistItems = heroSection.querySelectorAll(
    ".funeral-hero-checklist li",
  );
  const heroImg = heroSection.querySelector(".funeral-hero-img");

  // Reveal hidden elements for GSAP initialization
  gsap.set(
    [title, desc, ".funeral-hero-buttons", priceBox, checklistItems, heroImg],
    {
      opacity: 1,
      visibility: "visible",
    },
  );

  // Split title text
  const splitTitle = new SplitText(title, {
    type: "words, lines",
    wordsClass: "split-word",
    linesClass: "split-line",
  });

  // Set initial hidden states
  gsap.set(splitTitle.words, {
    yPercent: 100,
    opacity: 0,
    filter: "blur(10px)",
  });

  gsap.set(heroImg, {
    scale: 0.9,
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  });

  gsap.set(desc, {
    y: 30,
    opacity: 0,
    filter: "blur(6px)",
  });

  gsap.set(buttons, {
    y: 20,
    opacity: 0,
    scale: 0.95,
  });

  gsap.set(divider, { scaleX: 0 });
  gsap.set(priceBox.children, { y: 20, opacity: 0 });
  gsap.set(checklistItems, { x: -20, opacity: 0 });

  // Hero Timeline Sequence
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  heroTl
    // 1. Title Words Reveal
    .to(splitTitle.words, {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.04,
    })
    // 2. Hero Image Reveal (Starts AT THE EXACT SAME TIME as title reveal using "<")
    .to(
      heroImg,
      {
        scale: 1,
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
      },
      "<", // <--- Synchronizes directly with the title animation start
    )
    // 3. Description Fade Up
    .to(
      desc,
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )
    // 4. CTA Buttons Reveal
    .to(
      buttons,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.4)",
        stagger: 0.12,
      },
      "-=0.5",
    )
    // 5. Price Divider Line
    .to(
      divider,
      {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.4",
    )
    // 6. Price box text
    .to(
      priceBox.children,
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      },
      "-=0.3",
    )
    // 7. Checklist
    .to(
      checklistItems,
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        onComplete: () => {
          // Clear performance filters after animation
          gsap.set(splitTitle.words, { clearProps: "filter,willChange" });
          gsap.set([desc, heroImg], { clearProps: "filter,willChange" });

          // Start floating animation on hero image
          gsap.to(heroImg, {
            y: -12,
            duration: 3,
            ease: "sine.easeInOut",
            repeat: -1,
            yoyo: true,
          });
        },
      },
      "-=0.3",
    );
});

// Funeral stats counter js
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

// funeral timeline card
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".funeral-timeline-card");
  const isDesktop = window.matchMedia("(min-width: 1280px)"); // Tailwind xl

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;

        // Stagger only on desktop, where the 4 cards sit in one row
        if (isDesktop.matches) {
          const index = [...card.parentElement.children].indexOf(card);
          card.style.setProperty("--delay", `${index * 0.25}s`);
        } else {
          card.style.setProperty("--delay", "0s");
        }

        card.classList.add("is-visible");
        obs.unobserve(card);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
  );

  cards.forEach((card) => observer.observe(card));
});

// Funeral Faq js
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".funeral-faq-item");

  faqItems.forEach(function (item) {
    const trigger = item.querySelector(".funeral-faq-trigger");
    const content = item.querySelector(".funeral-faq-content");
    const icon = item.querySelector(".funeral-icon-close img");

    trigger.addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      // Close all FAQs
      faqItems.forEach(function (faq) {
        faq.classList.remove("active");

        const faqContent = faq.querySelector(".funeral-faq-content");
        const faqIcon = faq.querySelector(".funeral-icon-close img");

        faqContent.style.maxHeight = "0px";

        if (faqIcon) {
          faqIcon.style.transform = "rotate(0deg)";
        }
      });

      // Open clicked FAQ
      if (!isOpen) {
        item.classList.add("active");

        content.style.maxHeight = content.scrollHeight + "px";

        if (icon) {
          icon.style.transform = "rotate(45deg)";
        }
      }
    });
  });
});
