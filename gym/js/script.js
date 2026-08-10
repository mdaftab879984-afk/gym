// ============================================================
// IRONFORGE GYM — FRONTEND-ONLY CONFIGURATION
// No backend is required for the buttons/forms in this version.
// Change only the values in GYM to customize a client.
// ============================================================
const GYM = {
  name: "IRONFORGE",
  phone: "+919876543210",          // digits only for WhatsApp/tel
  displayPhone: "+91 98765 43210",
  email: "hello@ironforgefitness.com",
  address: "Main Road, Ranchi, Jharkhand"
};

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Client details ----------
  document.querySelectorAll("[data-gym-name]").forEach(el => el.textContent = GYM.name);
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = GYM.displayPhone);
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = GYM.email);
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = GYM.address);
  document.querySelectorAll("[data-whatsapp]").forEach(el => {
    el.href = `https://wa.me/${GYM.phone}`;
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Navbar ----------
  const header = document.getElementById("siteHeader");
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 25);
  updateHeader();
  window.addEventListener("scroll", updateHeader, {passive:true});

  // ---------- Mobile menu ----------
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  hamburger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("open")));

  // ---------- Hero/gallery videos ----------
  // If the client has not added the MP4 yet, the image poster remains visible.
  document.querySelectorAll("video").forEach(video => {
    video.addEventListener("error", () => {
      video.style.display = "none";
    });
  });

  // ---------- Modal ----------
  const modal = document.getElementById("leadModal");
  const modalPlan = document.getElementById("modalPlan");
  const modalIntro = document.getElementById("modalIntro");

  function openModal(plan = "") {
    if (plan) {
      modalPlan.value = plan === "Transform" ? "Transform — ₹5,999/month" :
                        plan === "Elite" ? "Elite — ₹2,999/month" :
                        "Starter — ₹1,499/month";
      modalIntro.textContent = `You're interested in the ${plan} membership. Send your details and we'll contact you on WhatsApp.`;
    } else {
      modalPlan.value = "";
      modalIntro.textContent = "Tell us a little about yourself and we'll connect with you on WhatsApp.";
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.classList.add("modal-open");
    setTimeout(() => modal.querySelector("input")?.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden","true");
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // ---------- Buttons ----------
  document.querySelectorAll('[data-action="join"]').forEach(btn => btn.addEventListener("click", () => openModal()));
  document.querySelectorAll('[data-action="call"]').forEach(btn => btn.addEventListener("click", () => {
    window.location.href = `tel:${GYM.phone}`;
  }));
  document.querySelectorAll('[data-action="choose"]').forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.program)));
  document.querySelectorAll('[data-action="plan"]').forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.plan)));

  // ---------- Lead form → WhatsApp ----------
  document.getElementById("leadForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const phone = form.get("phone").trim();
    const goal = form.get("goal");
    const plan = form.get("plan") || "Not selected";

    const text =
      `Hello ${GYM.name}!%0A%0A` +
      `I would like to enquire about joining the gym.%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Goal: ${encodeURIComponent(goal)}%0A` +
      `Plan: ${encodeURIComponent(plan)}`;

    window.open(`https://wa.me/${GYM.phone}?text=${text}`, "_blank", "noopener");
    e.currentTarget.reset();
    closeModal();
  });

  // ---------- Back to top ----------
  document.getElementById("backTop").addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

  // ---------- Reveal animations ----------
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});