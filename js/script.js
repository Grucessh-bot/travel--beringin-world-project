document.addEventListener("DOMContentLoaded", () => {
    // Inject Dynamic Styles for new features
    const style = document.createElement("style");
    style.innerHTML = `
        /* Sticky Navbar */
        .navbar {
            transition: all 0.3s ease;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }
        .navbar.sticky {
            background-color: rgba(255, 255, 255, 0.95) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 10px 5%;
        }
        /* Ensure body has padding to offset fixed navbar if needed */
        body {
            padding-top: 60px;
        }
        
        /* Reveal Animation */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        /* Password Input Wrapper */
        .password-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        .password-wrapper input {
            width: 100%;
            padding-right: 40px !important;
        }
        .toggle-password {
            position: absolute;
            right: 15px;
            cursor: pointer;
            user-select: none;
            font-size: 1.2rem;
        }

        /* Search Bar Styling */
        .search-container {
            text-align: center;
            margin: 20px auto 40px;
            max-width: 600px;
            padding: 0 20px;
        }
        .search-container input {
            padding: 15px 25px;
            width: 100%;
            border: 2px solid #e0e0e0;
            border-radius: 30px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .search-container input:focus {
            border-color: #0056b3;
            box-shadow: 0 6px 12px rgba(0,86,179,0.1);
        }
    `;
    document.head.appendChild(style);

    // 1. Sticky Navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        });
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".card, .paket-card, .destinasi-card");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach((el) => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    // 3. Toggle Password Visibility (Login & Daftar)
    const togglePasswordBtns = document.querySelectorAll(".toggle-password");
    togglePasswordBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const input = this.previousElementSibling;
            if (input && input.type === "password") {
                input.type = "text";
                this.innerHTML = "🙈"; // open eye / monkey
            } else if (input && input.type === "text") {
                input.type = "password";
                this.innerHTML = "👁️"; // closed eye
            }
        });
    });

    // 4. Form Submission Mock
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            if (form.closest(".contact-form")) {
                e.preventDefault();
                alert("✅ Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.");
                form.reset();
            } else {
                // Autentikasi Form (Login/Daftar)
                const action = form.getAttribute("action");
                if (!action || action === "proses_login.php" || action === "proses_daftar.php") {
                    e.preventDefault();
                    if (action === "proses_login.php" || form.closest(".login-container h2")?.innerText === "Login") {
                        alert("✅ Login Berhasil! Selamat datang.");
                    } else {
                        alert("✅ Pendaftaran Berhasil! Silakan masuk.");
                    }
                    window.location.href = "index.html";
                }
            }
        });
    });

    // 5. Search / Filter untuk Destinasi & Paket
    const searchInput = document.getElementById("searchDestinasi");
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const filter = e.target.value.toLowerCase();
            const cards = document.querySelectorAll(".card, .paket-card, .destinasi-card");

            cards.forEach((card) => {
                const titleElement = card.querySelector("h2, h3");
                if (titleElement) {
                    const title = titleElement.innerText.toLowerCase();
                    if (title.includes(filter)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    }

    // 6. Smooth Scroll untuk Link Anchor (seperti di About)
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
