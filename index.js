/* =========================
   STUDYPILOT AI
   Main JavaScript
========================= */


/* -------------------------
   Continue Button
------------------------- */

function continueToApp() {

    // Change this if your main page has another filename
    window.location.href = "main.html";

}


/* -------------------------
   Smooth Section Scroll
------------------------- */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* -------------------------
   Current Year
------------------------- */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* -------------------------
   Back To Top Button
------------------------- */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* -------------------------
   Navbar Scroll Effect
------------------------- */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 30) {

        navbar.style.background =
            "rgba(5, 8, 22, 0.92)";

    } else {

        navbar.style.background =
            "rgba(5, 8, 22, 0.72)";

    }

});


/* -------------------------
   Reveal Animation
------------------------- */

const revealElements = document.querySelectorAll(
    ".step-card, .feature-card, .comparison-card, .trust-card, .cta-card"
);

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    revealObserver.observe(element);

});


/* -------------------------
   Dashboard Progress Animation
------------------------- */

window.addEventListener("load", function () {

    const progress = document.querySelector(".progress-bar span");

    if (progress) {

        progress.style.width = "0%";

        setTimeout(function () {

            progress.style.transition =
                "width 1.5s cubic-bezier(.2,.8,.2,1)";

            progress.style.width = "75%";

        }, 500);

    }

});