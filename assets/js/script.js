document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");
    const heroTitle = document.querySelector(".hero-title");
    const sections = document.querySelectorAll(".section");
    const inputGroups = document.querySelectorAll(".input-group");
    const btnSend = document.querySelector(".btn-send");
    const form = document.getElementById("contact-form");
    const message = document.getElementById("form-message");
    const skillCards = document.querySelectorAll(".skill-card");

    // Ajoute une ombre à la barre de navigation lors du défilement
    window.addEventListener("scroll", function () {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Toggle du menu mobile
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Défilement fluide vers les sections ciblées
    navLinksItems.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });

                // Ferme le menu mobile après un clic
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    });

    // Animation de révélation des sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const revealItems = section.querySelectorAll(".reveal-item");

            if (entry.isIntersecting) {
                section.classList.add("reveal-active");

                revealItems.forEach((el, index) => {
                    el.style.animation = "none";
                    el.offsetHeight;
                    el.style.animation = "fancyReveal 0.8s ease forwards";
                    el.style.animationDelay = `${index * 0.2}s`;
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

    // Apparition des champs de formulaire au scroll
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
        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";
        btnSend.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Gestion de la soumission du formulaire
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

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
                message.textContent = "Message envoyé avec succès !";
                message.style.color = "#4caf50";
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

    // Animation des cartes de compétences
    const skillObserver = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.target.offsetTop - b.target.offsetTop);

        visibleEntries.forEach((entry, index) => {
            const card = entry.target;
            card.style.animation = "none";
            card.offsetHeight;
            card.style.animation = `fadeInUp 0.6s ease-in-out forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        });

        entries
            .filter(entry => !entry.isIntersecting)
            .forEach(entry => {
                entry.target.style.opacity = 0;
                entry.target.style.transform = "translateY(20px)";
            });
    }, {
        threshold: 0.2
    });

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });

    // Initialisation des particules en arrière-plan
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 }},
            "color": { "value": "#915eff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 3, "random": false },
            "size": { "value": 7, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 200,
                "color": "#915eff",
                "opacity": 0.4,
                "width": 1.6
            },
            "move": { "enable": true, "speed": 2.5 }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
    
});
