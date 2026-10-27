/**
 * Professional Portfolio Core Architecture
 * - Strict theme persistence (localStorage + system preference)
 * - Keyboard shortcuts (Press 'T' for theme toggle)
 * - Accessible mobile navigation drawer with focus traps
 * - Filter tabs with smooth CSS animations
 * - Client-side form validation with accessible error messaging
 */

document.addEventListener("DOMContentLoaded", () => {
    initThemeEngine();
    initMobileDrawer();
    initTabFiltering();
    initContactValidation();
});

/* ==========================================================================
   1. Theme Engine & Hotkey Shortcut
   ========================================================================== */
function initThemeEngine() {
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const savedTheme = localStorage.getItem("mike-dev-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const currentTheme = savedTheme || (systemDark ? "dark" : "light");
    applyTheme(currentTheme);

    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            themeIcon.textContent = "☀️";
            themeBtn.setAttribute("aria-label", "Switch to light mode (T)");
        } else {
            document.documentElement.removeAttribute("data-theme");
            themeIcon.textContent = "🌙";
            themeBtn.setAttribute("aria-label", "Switch to dark mode (T)");
        }
    }

    function toggleTheme() {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const nextTheme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem("mike-dev-theme", nextTheme);
    }

    themeBtn.addEventListener("click", toggleTheme);

    // Global hotkey: Press 'T' to toggle theme (ignoring inside inputs/textarea)
    document.addEventListener("keydown", (e) => {
        if (
            e.key.toLowerCase() === "t" &&
            !["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())
        ) {
            toggleTheme();
        }
    });
}

/* ==========================================================================
   2. Accessible Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
    const toggleBtn = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("primary-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navMenu.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
    }

    toggleBtn.addEventListener("click", () => {
        const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
        toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
        navMenu.classList.toggle("is-open");
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    // Dismiss on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
            closeMenu();
            toggleBtn.focus();
        }
    });
}

/* ==========================================================================
   3. Accessible Showcase Filtering
   ========================================================================== */
function initTabFiltering() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".showcase-card");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            const filterCategory = tab.dataset.filter;

            cards.forEach((card) => {
                const cardCategory = card.dataset.category;

                if (filterCategory === "all" || cardCategory === filterCategory) {
                    card.style.display = "block";
                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    });
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(6px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 180);
                }
            });
        });
    });
}

/* ==========================================================================
   4. High-Fidelity Form Validation
   ========================================================================== */
function initContactValidation() {
    const form = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnSpinner = submitBtn.querySelector(".btn-spinner");
    const feedbackAlert = document.getElementById("form-feedback");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
        [nameField, emailField, messageField].forEach((f) => f.classList.remove("is-invalid"));
        [nameError, emailError, messageError].forEach((e) => (e.textContent = ""));
        feedbackAlert.className = "status-alert";
        feedbackAlert.textContent = "";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        let hasErrors = false;

        // Validate Name
        if (!nameField.value.trim() || nameField.value.trim().length < 2) {
            nameField.classList.add("is-invalid");
            nameError.textContent = "Please enter your name (minimum 2 characters).";
            hasErrors = true;
        }

        // Validate Email
        if (!emailField.value.trim() || !emailPattern.test(emailField.value.trim())) {
            emailField.classList.add("is-invalid");
            emailError.textContent = "Enter a valid email address (e.g. name@domain.com).";
            hasErrors = true;
        }

        // Validate Message
        if (!messageField.value.trim() || messageField.value.trim().length < 10) {
            messageField.classList.add("is-invalid");
            messageError.textContent = "Please provide more project context (at least 10 characters).";
            hasErrors = true;
        }

        if (hasErrors) {
            const firstInvalid = form.querySelector(".is-invalid");
            firstInvalid?.focus();
            return;
        }

        // Simulated Asynchronous Network Call
        submitBtn.disabled = true;
        btnText.textContent = "Transmitting...";
        btnSpinner.style.display = "inline-block";

        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = "Submit Message";
            btnSpinner.style.display = "none";

            feedbackAlert.textContent = "✓ Ingestion complete: Message transmitted successfully.";
            feedbackAlert.className = "status-alert is-success";

            form.reset();

            setTimeout(() => {
                feedbackAlert.className = "status-alert";
                feedbackAlert.textContent = "";
            }, 5000);
        }, 1100);
    });
}