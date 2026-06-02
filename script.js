// Front-end interaction guide.
// Update phone, email, and brochure download URL from siteConfig below.
// The rest of the file powers navigation, modal forms, lightbox, and mobile sliders.

// Shared contact details and lead routing settings.
const siteConfig = {
  phone: "9999870220",
  leadEmail: "lead@royalresidencies.com",
  brochureUrl: "https://www.maxestate361gurugram.com/brochure.pdf"
};

// Frequently used DOM references grouped here so future edits are easy to trace.
const body = document.body;
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(siteNav.querySelectorAll('a[href^="#"]'));
const navButtons = Array.from(siteNav.querySelectorAll("button"));
const leadModal = document.getElementById("leadModal");
const modalTitle = document.getElementById("modalTitle");
const modalEnquiryType = document.getElementById("modalEnquiryType");
const modalSubmitButton = document.getElementById("modalSubmitButton");
const modalCallLink = document.getElementById("modalCallLink");
const modalCallText = document.getElementById("modalCallText");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const toggleOverview = document.getElementById("toggleOverview");
const moreCopy = document.getElementById("moreCopy");
const lightboxButtons = Array.from(document.querySelectorAll(".js-lightbox"));
let activeLightboxItems = [];
let activeLightboxIndex = -1;

// Keep the remaining contact entry points synced from one place.
function setContactLinks() {
  if (modalCallLink) {
    modalCallLink.href = `tel:${siteConfig.phone}`;
  }
  if (modalCallText) {
    modalCallText.textContent = siteConfig.phone;
  }
}

// Adjust the modal CTA label based on the trigger type.
function getModalSubmitLabel(title, enquiry) {
  const content = `${title} ${enquiry}`.toLowerCase();

  if (content.includes("visit") || content.includes("tour")) {
    return "Start Tour";
  }

  if (content.includes("brochure") || content.includes("download")) {
    return "Download Now";
  }

  if (content.includes("price") || content.includes("cost") || content.includes("quote")) {
    return "Get Price";
  }

  return "Submit Now";
}

// Mobile navigation controls.
function toggleNav() {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("is-open");
}

function closeNav() {
  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
}

function setActiveNavLink(activeLink) {
  navLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initSectionNav() {
  const navGroups = [
    { href: "#home", sectionIds: ["home", "overview"] },
    { href: "#pricing", sectionIds: ["pricing"] },
    { href: "#sitefloorplan", sectionIds: ["sitefloorplan", "sitefloorplan2"] },
    { href: "#amenities", sectionIds: ["amenities"] },
    { href: "#gallery", sectionIds: ["gallery"] },
    { href: "#address_section", sectionIds: ["address_section"] },
    { href: "#sitevisit", sectionIds: ["sitevisit", "developer"] }
  ]
    .map(({ href, sectionIds }) => ({
      link: siteNav.querySelector(`a[href="${href}"]`),
      sections: sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
    }))
    .filter(({ link, sections }) => link && sections.length > 0);

  if (!navGroups.length) {
    return;
  }

  const getHeaderOffset = () => document.querySelector(".site-header")?.offsetHeight || 0;

  const syncActiveLink = () => {
    const scrollLine = window.scrollY + getHeaderOffset() + 1;
    let activeGroup = navGroups[0];

    navGroups.forEach((group) => {
      if (scrollLine >= group.sections[0].offsetTop) {
        activeGroup = group;
      }
    });

    setActiveNavLink(activeGroup.link);
  };

  let frameId = 0;
  const requestSync = () => {
    if (frameId) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      frameId = 0;
      syncActiveLink();
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveNavLink(link);
    });
  });

  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
  window.addEventListener("load", requestSync);
  requestSync();
}

// Shared modal open/close helpers.
function openModal(title, enquiry = "General Enquiry") {
  modalTitle.textContent = title;
  modalEnquiryType.value = enquiry;
  modalSubmitButton.textContent = getModalSubmitLabel(title, enquiry);
  leadModal.classList.add("is-open");
  leadModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeModal() {
  leadModal.classList.remove("is-open");
  leadModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

// Image lightbox open/close helpers.
function updateLightboxView(item) {
  const title = item.dataset.title || item.dataset.caption || "Project Image";
  const caption = item.dataset.title ? (item.dataset.caption || "") : "";
  lightboxImage.src = item.dataset.image || "";
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;
  lightboxCaption.textContent = caption;
  lightboxCounter.textContent = `${activeLightboxIndex + 1} / ${activeLightboxItems.length}`;

  const hasNavigation = activeLightboxItems.length > 1;
  lightboxPrev.hidden = !hasNavigation;
  lightboxNext.hidden = !hasNavigation;
}

function openLightbox(item) {
  const groupName = item.dataset.lightboxGroup;
  activeLightboxItems = groupName
    ? lightboxButtons.filter((button) => button.dataset.lightboxGroup === groupName)
    : [item];
  activeLightboxIndex = Math.max(activeLightboxItems.indexOf(item), 0);
  updateLightboxView(activeLightboxItems[activeLightboxIndex]);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function moveLightbox(step) {
  if (activeLightboxItems.length < 2) {
    return;
  }

  activeLightboxIndex =
    (activeLightboxIndex + step + activeLightboxItems.length) % activeLightboxItems.length;
  updateLightboxView(activeLightboxItems[activeLightboxIndex]);
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxTitle.textContent = "";
  lightboxCaption.textContent = "";
  lightboxCounter.textContent = "1 / 1";
  activeLightboxItems = [];
  activeLightboxIndex = -1;
  body.classList.remove("modal-open");
}

// Client-side validation reused by both lead forms.
function validateForm(form) {
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.trim();
  const emailField = form.elements.email;
  const email = emailField.value.trim();

  if (name.length < 2) {
    return "Please enter your full name.";
  }

  if (!/^[0-9]{8,15}$/.test(phone.replace(/\D/g, ""))) {
    return "Please enter a valid phone number.";
  }

  if (emailField.hasAttribute("required") && !email) {
    return "Please enter a valid email address.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
}

// Inline status text for success and error states.
function setFormMessage(form, message, type) {
  const target = form.querySelector(".form-message");
  target.textContent = message;
  target.classList.remove("is-error", "is-success");
  if (type) {
    target.classList.add(type === "error" ? "is-error" : "is-success");
  }
}

// Submit lead data to FormSubmit and keep the UI responsive.
async function submitLead(form) {
  const error = validateForm(form);
  if (error) {
    setFormMessage(form, error, "error");
    return;
  }

  setFormMessage(form, "Submitting your request...", "");
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  const payload = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    phone: `${form.elements.country_code.value} ${form.elements.phone.value.trim()}`,
    enquiry_type: form.elements.enquiry_type.value,
    form_name: form.dataset.formName || "Lead Form",
    page_url: window.location.href,
    submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    _subject: `New lead - ${form.elements.enquiry_type.value}`,
    _template: "table",
    _captcha: "false"
  };

  try {
    if (siteConfig.leadEmail) {
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.leadEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed remote submission.");
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    setFormMessage(form, "Thanks! Our team will contact you shortly.", "success");
    form.reset();

    if (payload.enquiry_type.toLowerCase().includes("brochure") && siteConfig.brochureUrl) {
      window.open(siteConfig.brochureUrl, "_blank", "noopener");
    }
  } catch (err) {
    console.error(err);
    setFormMessage(form, "Submission failed. Please try again in a moment.", "error");
  } finally {
    submitButton.disabled = false;
  }
}

// Bind every lead form once on startup.
function bindForms() {
  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await submitLead(form);
    });
  });
}

// Auto-rotate the hero background images.
function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length < 2) {
    return;
  }

  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("is-active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("is-active");
  }, 4200);
}

// Expand/collapse the long overview copy.
function initOverviewToggle() {
  toggleOverview.addEventListener("click", () => {
    const isHidden = moreCopy.hasAttribute("hidden");
    if (isHidden) {
      moreCopy.removeAttribute("hidden");
      toggleOverview.textContent = "Read less";
    } else {
      moreCopy.setAttribute("hidden", "");
      toggleOverview.textContent = "Read more";
    }
  });
}

// Open and close modal/lightbox triggers from data attributes.
function initModalTriggers() {
  document.querySelectorAll(".js-open-modal").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.title || "Enquire Now", button.dataset.enquiry || "General Enquiry");
    });
  });

  leadModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
      closeModal();
    }
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeLightbox === "true") {
      closeLightbox();
    }
  });
}

// Wire gallery and plan images into the lightbox viewer.
function initLightboxTriggers() {
  lightboxButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(button);
    });
  });

  if (lightboxPrev && lightboxNext) {
    lightboxPrev.addEventListener("click", () => moveLightbox(-1));
    lightboxNext.addEventListener("click", () => moveLightbox(1));
  }
}

// Timed and exit-intent popups should only show once per session.
function initPopupRules() {
  window.setTimeout(() => {
    if (!sessionStorage.getItem("leadPopupShown")) {
      sessionStorage.setItem("leadPopupShown", "true");
      openModal("Register Here And Avail The Best Offers!!", "Timed Popup");
    }
  }, 5000);

  document.addEventListener("mouseout", (event) => {
    if (event.relatedTarget === null && event.clientY <= 0 && !sessionStorage.getItem("exitPopupShown")) {
      sessionStorage.setItem("exitPopupShown", "true");
      openModal("Virtual Site Visit", "Exit Intent Popup");
    }
  });
}

// Escape key closes any open overlay and nav.
function bindKeyEvents() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeLightbox();
      closeNav();
      return;
    }

    if (lightbox.classList.contains("is-open") && event.key === "ArrowLeft") {
      moveLightbox(-1);
      return;
    }

    if (lightbox.classList.contains("is-open") && event.key === "ArrowRight") {
      moveLightbox(1);
    }
  });
}

// Auto-scroll the amenities slider on mobile.
function initAmenitiesSlider() {
  const slider = document.querySelector(".amenities-grid");
  const dotsContainer = document.querySelector(".amenities-dots");
  if (!slider || !dotsContainer) return;

  const isMobileSliderActive = () => window.getComputedStyle(slider).display === "flex";

  let autoScrollInterval;
  const SCROLL_INTERVAL = 3000; // Time between auto-scrolls
  const USER_INTERACTION_PAUSE = 6000; // Pause duration after user interaction
  let slides = [];
  let dots = [];

  const updateActiveDot = () => {
    if (!isMobileSliderActive() || slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth;
    const currentIndex = Math.round(slider.scrollLeft / slideWidth);
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear any existing interval
    if (slides.length <= 1) return;

    autoScrollInterval = setInterval(() => {
      const currentSlideIndex = Math.round(slider.scrollLeft / slides[0].offsetWidth);
      const nextSlide = slides[currentSlideIndex + 1];
      if (nextSlide) {
        nextSlide.scrollIntoView({ behavior: "smooth", inline: "start" });
      } else {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, SCROLL_INTERVAL);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  const setup = () => {
    stopAutoScroll();
    if (!isMobileSliderActive()) {
      dotsContainer.innerHTML = "";
      dots = [];
      return;
    }

    slides = Array.from(slider.querySelectorAll(".amenity-card"));
    if (dots.length !== slides.length) {
      dotsContainer.innerHTML = "";
      dots = [];
      slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Go to amenity ${index + 1}`);
        dot.addEventListener("click", () => {
          slide.scrollIntoView({ behavior: "smooth", inline: "start" });
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }
    updateActiveDot();
  };

  let interactionTimeout;
  const onUserInteraction = () => {
    if (!isMobileSliderActive()) return;
    stopAutoScroll();
    clearTimeout(interactionTimeout);
    interactionTimeout = setTimeout(startAutoScroll, USER_INTERACTION_PAUSE);
  };

  slider.addEventListener("touchstart", onUserInteraction, { passive: true });
  slider.addEventListener("mousedown", onUserInteraction, { passive: true });

  let scrollEndTimer;
  slider.addEventListener("scroll", () => {
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(updateActiveDot, 100);
  }, { passive: true });

  // Use an observer to only auto-scroll when the slider is visible.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      });
    },
    { threshold: 0.1 } // Start when at least 10% is visible
  );

  const manageSlider = () => {
    setup();
    observer.disconnect();
    if (isMobileSliderActive()) {
      observer.observe(slider);
    }
  };

  window.addEventListener("resize", manageSlider);
  manageSlider();
}

// Boot the page interactions.
setContactLinks();
bindForms();
initHeroSlider();
initOverviewToggle();
initModalTriggers();
initLightboxTriggers();
initPopupRules();
bindKeyEvents();
initSectionNav();
initAmenitiesSlider();

navToggle.addEventListener("click", toggleNav);
navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});
navButtons.forEach((button) => {
  button.addEventListener("click", closeNav);
});
