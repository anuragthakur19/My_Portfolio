// ========== AOS Initialization ==========
AOS.init({
  duration: 1000,
  once: false, // Animate on every scroll
  mirror: true // Also animate on scroll up
});

// ========== Mobile Navbar Toggle ==========
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

// ========== ScrollSpy for Navbar Highlight ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function scrollSpy() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 80;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}
window.addEventListener("scroll", scrollSpy);

// ========== Swiper Tech Stack Carousel ==========
const swiper = new Swiper(".tech-swiper", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  freeMode: true,
  freeModeMomentum: false,
  allowTouchMove: false,
  grabCursor: true,
});

// ========== Show More / Show Less Projects ==========
document.getElementById("toggleProjectsBtn").addEventListener("click", function () {
  const moreProjects = document.getElementById("moreProjects");
  const isHidden = moreProjects.classList.contains("hidden");

  if (isHidden) {
    moreProjects.classList.remove("hidden");
    this.textContent = "Show Less";
  } else {
    moreProjects.classList.add("hidden");
    this.textContent = "Show More";
  }
});

// ========== Show More / Show Less Certificates ==========
document.getElementById("toggleCertificatesBtn").addEventListener("click", function () {
  const allCerts = document.querySelectorAll("#certificateGrid .cert-card");

  const isExpanded = [...allCerts].filter((card, i) => i >= 3 && !card.classList.contains("hidden")).length > 0;

  if (isExpanded) {
    allCerts.forEach((card, index) => {
      if (index >= 3) card.classList.add("hidden");
    });
    this.textContent = "Show More";
  } else {
    allCerts.forEach(card => card.classList.remove("hidden"));
    this.textContent = "Show Less";
  }
});



// ========== Toast on Contact Form Submit ==========
const contactForm = document.querySelector(".contact-form");
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);

  contactForm.reset();
});

// ========== Certificate Modal View ==========
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certModalImg");
const closeModal = document.getElementById("certClose");

document.querySelectorAll(".view-cert-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const imgSrc = this.getAttribute("data-img");
    modalImg.src = imgSrc;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
