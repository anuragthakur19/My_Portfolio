// ========== AOS Initialization ==========
AOS.init({
    duration: 1000,
    once: false, // Animate on every scroll (for sections like My Journey)
    mirror: true // Animate on scroll up as well
});

// ========== Mobile Navbar Toggle ==========
document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("hidden");
});

// Close mobile nav when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        const navLinks = document.getElementById("navLinks");
        if (!navLinks.classList.contains("hidden") && window.innerWidth <= 768) {
            navLinks.classList.add("hidden");
        }
    });
});


// ========== ScrollSpy for Navbar Highlight ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function scrollSpy() {
    let scrollY = window.scrollY;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 80; // Adjust offset for fixed navbar

        const sectionId = section.getAttribute("id");
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (correspondingNavLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    link.classList.remove("text-accent-cyan");
                });
                correspondingNavLink.classList.add("active");
                correspondingNavLink.classList.add("text-accent-cyan");
            } else {
                correspondingNavLink.classList.remove("active");
                correspondingNavLink.classList.remove("text-accent-cyan");
            }
        }
    });
}
window.addEventListener("scroll", scrollSpy);
document.addEventListener("DOMContentLoaded", scrollSpy);


// ========== Swiper Tech Stack Carousel ==========
const techSwiper = new Swiper(".tech-swiper", {
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
    grabCursor: false,
    breakpoints: {
        600: {
            slidesPerView: 'auto',
            spaceBetween: 5
        }
    }
});

// ========== Swiper Certificates Carousel ==========
const certSwiper = new Swiper(".cert-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    speed: 2000,
    freeMode: true,
    freeModeMomentum: false,
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    },
});

// ========== Resume Swiper Autoplay on Tab Focus ==========
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        techSwiper.autoplay.start();
        certSwiper.autoplay.start();
    } else {
        techSwiper.autoplay.stop();
        certSwiper.autoplay.stop();
    }
});


// ========== Skill Proficiency Bars Animation ==========
const proficiencySection = document.getElementById('skills-proficiency');
if (proficiencySection) {
    const proficiencyBars = proficiencySection.querySelectorAll('.proficiency-bar');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                proficiencyBars.forEach(bar => {
                    const proficiency = bar.dataset.proficiency;
                    bar.style.width = `${proficiency}%`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(proficiencySection);
}


// ========== Project Filtering ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const allProjectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
            btn.classList.remove('active', 'bg-accent-cyan', 'text-black');
            btn.classList.add('bg-box-dark', 'text-text-light');
        });
        button.classList.add('active', 'bg-accent-cyan', 'text-black');
        button.classList.remove('bg-box-dark', 'text-text-light');

        const filter = button.dataset.filter;

        allProjectCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


// ========== Interactive Contact Bubble ==========
const contactBubble = document.getElementById('contactBubble');

if (contactBubble) {
    contactBubble.addEventListener('click', (event) => {
        event.stopPropagation();
        contactBubble.classList.toggle('expanded');
    });

    document.addEventListener('click', (event) => {
        if (!contactBubble.contains(event.target) && contactBubble.classList.contains('expanded')) {
            contactBubble.classList.remove('expanded');
        }
    });
}


// ========== Theme Toggle ==========
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('dark');
    }
});

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});
