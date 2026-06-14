/**
 * Equator & Elevation - Core Main Application Thread
 * Author: Michael Felix
 * Course: WDD 231 Portfolio Project
 */

import { fetchAndDisplayCoffees } from './data-fetch.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. RESPONSIVE MOBILE NAVIGATION ENGINE (Hamburger Menu)
    // ==========================================================================
    const menuToggle = document.querySelector('#menu-toggle');
    const primaryNav = document.querySelector('#primary-nav');

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.setAttribute('aria-label', isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu');
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && primaryNav.classList.contains('open')) {
                primaryNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Toggle Navigation Menu');
            }
        });
    }

    // ==========================================================================
    // 2. STICKY AUTOMATIC WAYFINDING PATTERN
    // ==========================================================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#primary-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // ==========================================================================
    // 3. CONTEXTUAL MODULE RUNTIME INITIALIZATION (Discover Page Catalog)
    // ==========================================================================
    // Target selectors matched to discover.html classes and IDs
    const coffeeGrid = document.querySelector('.coffee-grid');
    const processFilter = document.querySelector('#process-filter');

    if (coffeeGrid) {
        // Initial execution to load all lot records on page arrival
        fetchAndDisplayCoffees('all');

        // Dynamic Filtering: Listens for changes in the dropdown
        if (processFilter) {
            processFilter.addEventListener('change', (event) => {
                fetchAndDisplayCoffees(event.target.value);
            });
        }
    }

    // ==========================================================================
    // 4. RETURNING USER META STORAGE METRICS (Index Portal)
    // ==========================================================================
    try {
        const lastCoffeeViewed = localStorage.getItem('lastViewedCoffee');
        const lastVisitDate = localStorage.getItem('lastViewedTime');
        const welcomeBanner = document.querySelector('#welcome-back-msg');
        
        if (lastCoffeeViewed && lastVisitDate && welcomeBanner) {
            welcomeBanner.textContent = `Welcome back! Continue exploring single-origin assets where you left off. Last reviewed: ${lastCoffeeViewed}.`;
            welcomeBanner.style.display = 'block';
            welcomeBanner.classList.add('welcome-banner-active');
        }
    } catch (storageError) {
        console.warn('[Storage Matrix Guard] Sandbox browser environment blocking storage streams:', storageError);
    }

    // ==========================================================================
    // 5. GLOBAL FOOTER CHRONOLOGY DATA ENGINE
    // ==========================================================================
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});