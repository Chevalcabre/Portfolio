document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");

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
    const heroTitle = document.querySelector(".hero-title");
    heroTitle.style.width = heroTitle.scrollWidth + "px";
    
    // Effet visuel sympa lors du submit formulaire
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form form");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const btn = document.querySelector(".btn-send");
        btn.textContent = "Envoyé ! 🎉";
        btn.style.background = "#4caf50";

        setTimeout(() => {
            btn.textContent = "Envoyer";
            btn.style.background = "linear-gradient(135deg, #915eff, #6a3fcf)";
            contactForm.reset();
        }, 2500);
    });
});

});
