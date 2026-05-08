// Output the current year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Output the last modified date
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;