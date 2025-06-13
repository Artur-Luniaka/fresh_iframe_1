// Header and Footer Components
class HeaderFooter {
  static async loadComponents() {
    await this.loadHeader();
    await this.loadFooter();
  }

  static async loadHeader() {
    const header = document.createElement("header");
    header.className = "header";
    header.innerHTML = `
            <nav class="nav">
                <div class="logo">
                    <a href="./">OnlinePlayChallenge.com</a>
                </div>
                <button class="mobile-menu-btn" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="nav-menu">
                    <a href="./" class="nav-link">Break Box</a>
                    <a href="./#how-to-play" class="nav-link">How to Play</a>
                    <a href="./brick-log.html" class="nav-link">Breaking News</a>
                    <a href="./brick-contacts.html" class="nav-link">Contact Box</a>
                    <a href="./collect-disclaimer.html" class="nav-link">Disclaimer Box</a>
                </div>
            </nav>
        `;
    document.body.insertBefore(header, document.body.firstChild);
    this.initMobileMenu();
  }

  static async loadFooter() {
    const footer = document.createElement("footer");
    footer.className = "footer";
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-main">
                        <div class="footer-contact">
                            <p>Email: support@OnlinePlayChallenge.com</p>
                            <p>Phone: +61 999 371 882</p>
                            <p>Location: 10 Spring Street Sydney NSW 2000 Australia</p>
                        </div>
                        <div class="footer-links">
                            <a href="./brick-cookies.html">Cookie Terms</a>
                            <a href="./brick-privacy.html">Privacy Terms</a>
                        </div>
                    </div>
                    <div class="footer-copyright">
                        <p>&copy; ${currentYear} OnlinePlayChallenge.com | All rights reserved.</p>
                    </div>
                </div>
            </div>
        `;
    document.body.appendChild(footer);
  }

  static initMobileMenu() {
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.body;

    // Toggle menu
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      menuBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest(".nav") &&
        navMenu.classList.contains("active")
      ) {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
      });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        menuBtn.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }
}

// JSON Data Loader
class DataLoader {
  static async loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading JSON:", error);
      return null;
    }
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  HeaderFooter.loadComponents();
});
