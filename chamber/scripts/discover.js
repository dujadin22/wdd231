/**
 * W05: Chamber Discover Page Script Module
 * Controls dynamic card injection, localStorage visit tracking, and responsive menu.
 * Author: Michael Felix
 * Course: WDD 231
 */

import { itemsOfInterest } from '../data/discover.mjs';

// Global Millisecond to Day Conversion Constant: 1000ms * 60s * 60m * 24h
const MS_PER_DAY = 86400000;

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigationToggle(); 
    renderDiscoverCards(itemsOfInterest);
    processVisitorTimeline();
    
    // === Automated Footer Grading Requirements ===
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
    }
    // =============================================
});

/**
 * Attaches click event handlers to animate and toggle the mobile navigation dropdown.
 */
function initializeNavigationToggle() {
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    // Fail-safe guard clause if target HTML structures are missing
    if (!menuButton || !navLinks) {
        console.warn("Navigation elements missing in HTML. Verify IDs: 'menuButton' and 'navLinks'.");
        return;
    }

    menuButton.addEventListener("click", () => {
        // Toggle the open and show helper classes
        menuButton.classList.toggle("open");
        navLinks.classList.toggle("show");
        
        // Update accessibility properties for screen readers
        const isOpen = menuButton.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen.toString());
    });
}

/**
 * Iterates through the imported data objects to build and mount 
 * semantic cards into the content grid zone.
 * @param {Array} items - Array of item objects from the data module.
 */
function renderDiscoverCards(items) {
    const container = document.getElementById("cardsContainer");
    if (!container) return; // Guard clause if target structure is missing

    // Wipe any static fallback content out of the injection section
    container.innerHTML = "";

    items.forEach(item => {
        // Create standard layout card component wrap
        const cardElement = document.createElement("div");
        cardElement.className = "discover-card";

        // Read the custom effect string from your data module (defaults to standard styling if omitted)
        const activeEffectClass = item.effect ? item.effect : "standard-view";

        // Inject semantic building blocks directly with the dynamic effect class attached
        cardElement.innerHTML = `
            <h2>${item.name}</h2>
            <figure class="discover-figure">
                <img class="${activeEffectClass}" src="${item.image}" alt="Scenic photograph of ${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address class="discover-address">${item.address}</address>
            <p class="discover-description">${item.description}</p>
            <button type="button" class="discover-btn">Learn More</button>
        `;

        container.appendChild(cardElement);
    });
}

/**
 * Handles evaluation of Date.now() millisecond metrics against 
 * localStorage records to render the correct context-dependent visitor banner text.
 */
function processVisitorTimeline() {
    const banner = document.getElementById("visitorMessage");
    if (!banner) return;

    const currentTimestamp = Date.now();
    const storedTimestamp = localStorage.getItem("lastChamberVisit");
    let computedMessage = "";

    // Execution path conditional evaluation
    if (!storedTimestamp) {
        // Condition 1: Primary entrance tracking
        computedMessage = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDeltaMs = currentTimestamp - parseInt(storedTimestamp, 10);

        if (timeDeltaMs < MS_PER_DAY) {
            // Condition 2: Session execution is inside a 24-hour bracket
            computedMessage = "Back so soon! Awesome!";
        } else {
            // Condition 3: More than 24 hours have elapsed. Calculate whole integer count.
            const totalElapsedDays = Math.floor(timeDeltaMs / MS_PER_DAY);
            
            // Strictly scale syntax depending on whether counts equal unity
            if (totalElapsedDays === 1) {
                computedMessage = "You last visited 1 day ago.";
            } else {
                computedMessage = `You last visited ${totalElapsedDays} days ago.`;
            }
        }
    }

    // Bind text node safe from script-injection holes
    banner.textContent = computedMessage;

    // Overwrite old state with current execution benchmark string
    localStorage.setItem("lastChamberVisit", currentTimestamp.toString());
}