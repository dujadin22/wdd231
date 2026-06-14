/**
 * Equator & Elevation - Asynchronous Data Fetching Engine
 * Author: Michael Felix
 * Course: WDD 231 Portfolio Project
 */

import { openModal } from './utils.js';

/**
 * Fetches single-origin coffee datasets from the local JSON repository target,
 * handles custom data filtering logic, and dynamically renders elements.
 * @param {string} filterValue - The processing method value ('all', 'Washed', 'Natural')
 */
export async function fetchAndDisplayCoffees(filterValue = 'all') {
    // FIXED: Now targets the class name defined in your discover.html
    const gridContainer = document.querySelector('.coffee-grid');
    
    // Safety guard clause
    if (!gridContainer) return;

    try {
        const response = await fetch('data/coffees.json');
        
        if (!response.ok) {
            throw new Error(`HTTP network vector breakdown! Status: ${response.status}`);
        }
        
        const coffeeBeans = await response.json();
        console.log("Data successfully fetched:", coffeeBeans); // Add this line!
        
        // FIXED: Filtering now matches the 'processingMethod' property in your JSON 
        // to align with the options in your filter dropdown
        const finalizedList = filterValue === 'all' 
            ? coffeeBeans 
            : coffeeBeans.filter(coffee => coffee.processingMethod === filterValue);

        // Wipe loading/stale states
        gridContainer.innerHTML = '';

        if (finalizedList.length === 0) {
            gridContainer.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted); font-family: var(--font-body);">
                    No records found matching this processing method.
                </p>
            `;
            return;
        }

        // Iterator: Generate cards
        finalizedList.forEach(coffee => {
            const architecturalCard = document.createElement('article');
            architecturalCard.className = 'directory-card';
            
            architecturalCard.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${coffee.image || 'images/featured-coffee.webp'}" 
                         alt="Sample of ${coffee.name}" 
                         loading="lazy">
                </div>
                <div class="card-details-box">
                    <span>📍 ${coffee.originCountry}</span>
                    <h3>${coffee.name}</h3>
                    <ul>
                        <li><strong>Processing:</strong> ${coffee.processingMethod}</li>
                        <li><strong>Elevation:</strong> ${coffee.elevation} MASL</li>
                    </ul>
                    <button class="view-details-btn submit-btn" data-id="${coffee.id}">
                        View Flavor Profile
                    </button>
                </div>
            `;
            
            architecturalCard.querySelector('.view-details-btn').addEventListener('click', () => {
                openModal(coffee);
            });

            gridContainer.appendChild(architecturalCard);
        });

    } catch (networkFetchError) {
        console.error('Fetch error:', networkFetchError);
        gridContainer.innerHTML = `<p style="text-align: center; padding: 2rem;">Unable to map inventory. Check data path.</p>`;
    }
}