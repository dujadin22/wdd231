/**
 * Equator & Elevation - Shared Utilities & Component Modals
 * Author: Michael Felix
 * Course: WDD 231 Portfolio
 */

/**
 * Dynamically constructs an accessible modal window overlay, injects 
 * localized coffee bean profile parameters, and tracks session metrics.
 * @param {Object} coffee - The structured coffee data item vector object
 */
export function openModal(coffee) {
    if (!coffee) return;

    // 1. Establish state tracking inside localStorage as a return-user metric hook
    try {
        localStorage.setItem('lastViewedCoffee', coffee.name);
        localStorage.setItem('lastViewedTime', new Date().toLocaleDateString());
    } catch (e) {
        console.warn('[Storage Error] Unable to cache viewing metrics locally:', e);
    }

    // 2. Structural Component Assembly
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', 'modal-title');

    // 3. Inject High-End Minimalist Layout Matrix
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="close-modal-btn" id="modalCloseTrigger" aria-label="Close Profile Modal">&times;</button>
            <div class="modal-header">
                <span class="modal-badge">${coffee.originCountry}</span>
                <h2 id="modal-title">${coffee.name}</h2>
            </div>
            <div class="modal-body-content">
                <div class="metric-row">
                    <div>
                        <span class="metric-label">Processing Method</span>
                        <span class="metric-value">${coffee.processingMethod}</span>
                    </div>
                    <div>
                        <span class="metric-label">Harvesting Altitude</span>
                        <span class="metric-value">${coffee.elevation} MASL</span>
                    </div>
                </div>
                <div class="profile-description-block">
                    <h3>Sensory Profile &amp; Metrics</h3>
                    <p>${coffee.description || 'Detailed micro-lot profile vectors currently undergoing validation analysis.'}</p>
                </div>
            </div>
        </div>
    `;

    // 4. Define Teardown Lifecycle Method
    const handleEscapeKey = (event) => {
        if (event.key === 'Escape') initiateModalTeardown();
    };

    const initiateModalTeardown = () => {
        modalOverlay.classList.add('fade-out');
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Wait exactly 250ms for the CSS keyframe opacity transition to clear
        setTimeout(() => {
            modalOverlay.remove();
            document.body.style.overflow = ''; // Restore layout scroll mechanics
        }, 250);
    };

    // 5. Append Node Element directly to the DOM Framework Base
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden'; // Lock background scrolling safely

    // 6. Bind Component Interaction Events
    const closeButton = modalOverlay.querySelector('#modalCloseTrigger');
    closeButton.addEventListener('click', initiateModalTeardown);

    // Close modal if user clicks outside the content window
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            initiateModalTeardown();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', handleEscapeKey);

    // Shift focus to the exit element for accessibility
    closeButton.focus();
}