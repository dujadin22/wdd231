const url = "data/members.json";
const cards = document.querySelector("#member-container");
const gridbutton = document.querySelector("#grid-btn");
const listbutton = document.querySelector("#list-btn");

// 1. Fetch the JSON data
async function getMemberData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("HTTP-Error: " + response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 2. Build the member cards
const displayMembers = (members) => {
    cards.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        let card = document.createElement("section");
        
        // Define membership level names
        const levelName = member.membershipLevel === 3 ? "Gold" : member.membershipLevel === 2 ? "Silver" : "Member";

        // IMPORTANT: src="${member.image}" (No "images/" prefix) 
        // because we are using external placeholder URLs.
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="100">
            <h3>${member.name}</h3>
            <p class="tagline"><em>${member.tagline || ''}</em></p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            <span class="membership-badge tier-${member.membershipLevel}">${levelName}</span>
        `;
        cards.appendChild(card);
    });
};

// 3. Toggle View Logic
gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    gridbutton.classList.add("active");
    listbutton.classList.remove("active");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    listbutton.classList.add("active");
    gridbutton.classList.remove("active");
});

getMemberData();