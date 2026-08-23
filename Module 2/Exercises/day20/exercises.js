'use strict';

// 1. Fetch USD to ETB Rate
async function getEtbRate() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.rates.ETB;
    } catch (err) {
        console.error('Rate fetch failed:', err.message);
        return null;
    }
}

// 2. Rewrite .then chain to async/await
async function renderRate() {
    try {
        const rate = await getEtbRate();
        console.log(`Ex 1 & 2: 1 USD = ${rate} ETB`);
    } catch (err) {
        console.error('Render error:', err.message);
    }
}
renderRate();

// 3. Error Verification: Network Error vs 404 HTTP Error
async function testErrors() {
    // Network Error (bad domain)
    try {
        await fetch('https://invalid-non-existent-domain-123.com');
    } catch (err) {
        console.log('Ex 3 (Network Failure caught by catch block):', err.message);
    }

    // 404 HTTP Error (valid network request, invalid endpoint)
    try {
        const res = await fetch('https://restcountries.com/v3.1/name/thiscountrydoesnotexistxyz');
        if (!res.ok) {
            console.log(`Ex 3 (404 Handled via !res.ok check): HTTP Status ${res.status}`);
        }
    } catch (err) {
        console.error('Unexpected failure:', err.message);
    }
}
testErrors();

// 4. Parallel Requests with Promise.all
async function fetchParallel() {
    try {
        const [kenyaRes, ethiopiaRes] = await Promise.all([
            fetch('https://restcountries.com/v3.1/name/kenya'),
            fetch('https://restcountries.com/v3.1/name/ethiopia')
        ]);
        if (!kenyaRes.ok || !ethiopiaRes.ok) throw new Error('Failed parallel request');
        const [kenya] = await kenyaRes.json();
        const [ethiopia] = await ethiopiaRes.json();
        console.log(`Ex 4 (Parallel): Kenya Capital: ${kenya.capital[0]} | Ethiopia Capital: ${ethiopia.capital[0]}`);
    } catch (err) {
        console.error('Parallel fetch error:', err.message);
    }
}
fetchParallel();

// 5. Loading, Data, and Error State Demo
const statusDisplay = document.querySelector('#status-display');
async function runStateDemo() {
    statusDisplay.textContent = 'Loading...';
    try {
        const res = await fetch('https://restcountries.com/v3.1/name/ethiopia');
        if (!res.ok) throw new Error('Data unavailable');
        const [data] = await res.json();
        statusDisplay.textContent = `Success: Loaded ${data.name.common}`;
    } catch (err) {
        statusDisplay.textContent = `Error: ${err.message}`;
    }
}
runStateDemo();