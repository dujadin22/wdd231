document.addEventListener("DOMContentLoaded", () => {
    // 1. Capture and assign the precise application init timestamp
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Modals Management Loop Infrastructure
    const triggers = document.querySelectorAll(".modal-trigger-btn");
    const closeButtons = document.querySelectorAll(".modal-close-btn");
    const modals = document.querySelectorAll(".benefit-modal");

    triggers.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-target");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.showModal(); // Standard accessible native dialog method
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const openModal = button.closest("dialog");
            if (openModal) {
                openModal.close();
            }
        });
    });

    // Close dialog automatically if user clicks background shade overlay
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
});