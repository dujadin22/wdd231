// --- Navigation Menu Toggle ---
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#primary-nav');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

// --- Footer Dates ---
document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = `Last Modification: ${document.lastModified}`;

// --- Theme Toggle (Dark Mode) ---
const themeBtn = document.querySelector('#theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});