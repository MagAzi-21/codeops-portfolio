'use strict';

const searchForm = document.querySelector('#search-form');
const countryInput = document.querySelector('#country-input');
const statusMessage = document.querySelector('#status-message');
const factsCard = document.querySelector('#facts-card');

function renderFact(container, label, value) {
    const row = document.createElement('div');
    row.className = 'fact-item';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = label;

    const valSpan = document.createElement('span');
    valSpan.textContent = value;

    row.append(labelSpan, valSpan);
    container.append(row);
}

async function showCountry(name) {
    statusMessage.textContent = 'Loading...';
    statusMessage.className = 'status-msg loading';
    factsCard.innerHTML = '';

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
        
        if (!res.ok) {
            throw new Error('Country not found');
        }

        const [country] = await res.json();

        // Parse currencies safely
        const currencies = country.currencies 
            ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ')
            : 'N/A';

        statusMessage.textContent = '';
        statusMessage.className = 'status-msg';

        if (country.flags && country.flags.png) {
            const flag = document.createElement('img');
            flag.src = country.flags.png;
            flag.alt = country.flags.alt || `Flag of ${country.name.common}`;
            flag.className = 'flag-img';
            factsCard.append(flag);
        }

        renderFact(factsCard, 'Country', country.name.common);
        renderFact(factsCard, 'Capital', country.capital ? country.capital[0] : 'N/A');
        renderFact(factsCard, 'Population', country.population.toLocaleString());
        renderFact(factsCard, 'Region', country.region);
        renderFact(factsCard, 'Currencies', currencies);

    } catch (err) {
        statusMessage.textContent = err.message;
        statusMessage.className = 'status-msg error';
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = countryInput.value.trim();
    if (query) {
        showCountry(query);
    }
});

// Default fetch on initial page load
showCountry('ethiopia');