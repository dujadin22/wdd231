document.addEventListener("DOMContentLoaded", () => {
    // Instantiate parsing engine targeted at active window location link string
    const urlParams = new URLSearchParams(window.location.search);
    const targetDisplayContainer = document.getElementById("receipt-display-grid");

    if (!targetDisplayContainer) return;

    // Helper sanitization extraction routine map
    function getParamValue(keyName) {
        return urlParams.get(keyName) ? decodeURIComponent(urlParams.get(keyName).replace(/\+/g, ' ')) : "Not Provided";
    }

    // Extract designated project criteria properties
    const dataPayload = {
        "First Name": getParamValue("firstName"),
        "Last Name": getParamValue("lastName"),
        "Business Email": getParamValue("email"),
        "Mobile Number": getParamValue("phone"),
        "Corporate Entity Name": getParamValue("orgName"),
        "Selected Tier Option": getParamValue("membershipLevel").toUpperCase(),
        "Submission Timestamp": getParamValue("timestamp")
    };

    // Construct highly legible structured key-value display fields
    let htmlOutputMarkup = `<div class="receipt-table">`;
    
    for (const [key, val] of Object.entries(dataPayload)) {
        htmlOutputMarkup += `
            <div class="receipt-row">
                <span class="receipt-label"><strong>${key}:</strong></span>
                <span class="receipt-value">${val}</span>
            </div>
        `;
    }
    
    htmlOutputMarkup += `</div>`;
    
    // Mount to live view container architecture
    targetDisplayContainer.innerHTML = htmlOutputMarkup;
});