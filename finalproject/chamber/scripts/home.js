// Configuration Paths & API Links
const membersUrl = "data/members.json";
// FIXED: Removed the nested "const weatherUrl =" syntax error and line break
const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=6.4541&lon=3.3947&units=metric&appid=83bb8e93f37dc9ccb4c404702bae8e7f";

async function initializeHomePage() {
    // Isolated try-catch blocks prevent one broken API from crashing the other feature
    try {
        await fetchWeatherData();
    } catch (error) {
        console.error("Weather System Error:", error);
        const currentContainer = document.getElementById('weather-current');
        if (currentContainer) {
            currentContainer.innerHTML = `<p style="color: #666; font-style: italic;">Weather data temporarily offline.</p>`;
        }
    }

    try {
        await fetchSpotlightData();
    } catch (error) {
        console.error("Spotlight System Error:", error);
    }
}

/* ==========================================================================
   1. Weather API Integration Logic
   ========================================================================== */
async function fetchWeatherData() {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    // Process current observations (index 0 provides nearest timestamp)
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const iconCode = current.weather[0].icon;

    const currentContainer = document.getElementById('weather-current');
    if (currentContainer) {
        currentContainer.innerHTML = `
            <div class="weather-now">
                <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${desc}" width="70" height="70">
                <div>
                    <p class="current-temp">${temp}°C</p>
                    <p class="current-desc">${desc}</p>
                </div>
            </div>
        `;
    }

    // Extract next 3 days at consistent daily intervals (every 8 steps = 24 hours)
    const forecastContainer = document.getElementById('weather-forecast');
    if (forecastContainer) {
        forecastContainer.innerHTML = "";
        
        const forecastIndices = [8, 16, 24]; 
        forecastIndices.forEach(index => {
            const item = data.list[index];
            if (item) {
                const dateObj = new Date(item.dt_txt);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const dayTemp = Math.round(item.main.temp);
                
                const dayDiv = document.createElement('div');
                dayDiv.className = 'forecast-day';
                dayDiv.innerHTML = `<span>${dayName}</span><strong>${dayTemp}°C</strong>`;
                forecastContainer.appendChild(dayDiv);
            }
        });
    }
}

/* ==========================================================================
   2. Randomized Spotlight Cards Generation
   ========================================================================== */
async function fetchSpotlightData() {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    // Filter strictly for Gold (Level 3) and Silver (Level 2) companies
    const premiumMembers = data.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
    
    // Fisher-Yates Randomization Shuffle
    for (let i = premiumMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [premiumMembers[i], premiumMembers[j]] = [premiumMembers[j], premiumMembers[i]];
    }

    // Extract exactly 2 or 3 items to show
    const selectedSpotlights = premiumMembers.slice(0, 3);
    const wrapper = document.getElementById('spotlight-wrapper');
    
    if (wrapper) {
        wrapper.innerHTML = "";

        selectedSpotlights.forEach(company => {
            const card = document.createElement('section');
            card.className = 'spotlight-card';
            
            card.innerHTML = `
                <div class="spotlight-header">
                    <img src="${company.image}" alt="${company.name} official logo" loading="lazy" width="100" height="60">
                    <h3>${company.name}</h3>
                </div>
                <p class="spotlight-tier">${company.membershipLevel === 3 ? 'Gold Partner' : 'Silver Partner'}</p>
                <p class="spotlight-tagline">"${company.tagline}"</p>
                <hr>
                <div class="spotlight-details">
                    <p><strong>📍 Addr:</strong> ${company.address}</p>
                    <p><strong>📞 Phone:</strong> ${company.phone}</p>
                    <a href="${company.website}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${company.name} digital platform">Visit Website</a>
                </div>
            `;
            wrapper.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", initializeHomePage);