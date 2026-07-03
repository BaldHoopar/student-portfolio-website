document.addEventListener("DOMContentLoaded", function() {
    // 1. Get the current page filename from the URL address bar
    // e.g., if the URL is "portfolio/projects.html", currentPath becomes "projects.html"
    const currentPath = window.location.pathname.split("/").pop();

    // 2. Select all anchor links inside your navigation menu
    const navLinks = document.querySelectorAll(".nav-links li a");

    navLinks.forEach(link => {
        // 3. Strip any old hardcoded active classes first
        link.classList.remove("active");

        // 4. Get the filename this specific link points to (e.g., "projects.html")
        const linkAttribute = link.getAttribute("href");

        // 5. If it matches our current page, add the dynamic cyber border box!
        if (currentPath === linkAttribute) {
            link.classList.add("active");
        } 
        // Fallback: If we are just at the root directory with no filename, default to index.html
        else if (currentPath === "" && linkAttribute === "index.html") {
            link.classList.add("active");
        }
    });
});
// Dynamic Navigation Switch Initialization
const initMobileMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) {
        console.warn("Navigation components missing from DOM context structure.");
        return;
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents bubbling issues
        
        // Toggle layout classes
        navLinks.classList.toggle('active');
        
        // Dynamically alter font icons
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            icon.className = 'fa-solid fa-bars';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close down layout trays if background views are targeted
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if(icon) icon.className = 'fa-solid fa-bars';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
};

// Execute across active states
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}