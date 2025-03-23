document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");
    const heroTitle = document.querySelector(".hero-title");
    const sections = document.querySelectorAll(".section");
    const inputGroups = document.querySelectorAll(".input-group");
    const btnSend = document.querySelector(".btn-send");

    // Effet d'ombre en scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Toggle du menu mobile
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Défilement fluide au clic sur les liens du menu
    navLinksItems.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Ajustement pour éviter la superposition avec la navbar
                    behavior: "smooth"
                });

                // Ferme le menu burger après un clic (pour l'expérience mobile)
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    });

    // Déclencher l'animation de typing
    heroTitle.style.width = heroTitle.scrollWidth + "px";

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const revealItems = section.querySelectorAll(".reveal-item");

            if (entry.isIntersecting) {
                section.classList.add("reveal-active");

                revealItems.forEach((el, index) => {
                    el.style.animation = "none"; // reset
                    el.offsetHeight; // force reflow
                    el.style.animation = fancyReveal 0.8s ease forwards;
                    el.style.animationDelay = ${index * 0.2}s;
                });

            } else {
                section.classList.remove("reveal-active");

                revealItems.forEach(el => {
                    el.style.animation = "none";
                    el.style.opacity = 0;
                    el.style.transform = "translateY(40px) rotateX(10deg) scale(0.95)";
                });
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Apparition champ par champ au scroll
    const inputObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
            }
        });
    }, {
        threshold: 0.1
    });

    inputGroups.forEach(inputGroup => {
        inputObserver.observe(inputGroup);
    });

    // Effet ripple sur le bouton d’envoi
    btnSend.addEventListener("click", function (e) {
        const rect = btnSend.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.left = ${e.clientX - rect.left}px;
        ripple.style.top = ${e.clientY - rect.top}px;
        btnSend.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            message.style.display = "block";
        } else {
            message.style.display = "block";
            message.textContent = "❌ Une erreur s’est produite. Veuillez réessayer.";
            message.style.color = "#ff4444";
        }
    } catch (error) {
        message.style.display = "block";
        message.textContent = "❌ Erreur réseau. Vérifiez votre connexion.";
        message.style.color = "#ff4444";
    }
});

});