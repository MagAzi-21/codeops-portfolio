'use strict';

const API_ENDPOINT = 'https://open.er-api.com/v6/latest/ETB';
const STORAGE_KEY = 'birrwatch_state';

const state = {
    base: 'ETB',
    rates: {},
    watchlist: ['USD', 'EUR', 'KES'],
    currency: 'USD'
};

const statusEl = document.querySelector('#status');
const convertForm = document.querySelector('#convert-form');
const amountInput = document.querySelector('#amount');
const currencySelect = document.querySelector('#currency');
const resultEl = document.querySelector('#result');
const watchlistUl = document.querySelector('#watchlist');
const addWatchBtn = document.querySelector('#add-watch-btn');

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        watchlist: state.watchlist,
        currency: state.currency
    }));
}

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.watchlist)) state.watchlist = parsed.watchlist;
            if (parsed.currency) state.currency = parsed.currency;
        }
    } catch {
        state.watchlist = ['USD', 'EUR', 'KES'];
        state.currency = 'USD';
    }
}

async function loadRates() {
    statusEl.textContent = 'Loading live rates...';
    statusEl.className = 'status-msg';

    try {
        const res = await fetch(API_ENDPOINT);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        state.rates = data.rates || {};
        statusEl.textContent = `Rates updated: 1 ETB base`;
        statusEl.className = 'status-msg';
        render();
    } catch (err) {
        statusEl.textContent = 'Could not load live exchange rates.';
        statusEl.className = 'status-msg error';
    }
}

function renderWatchlist() {
    if (state.watchlist.length === 0) {
        watchlistUl.innerHTML = '<li class="empty-state">No currencies in watchlist</li>';
        return;
    }

    watchlistUl.innerHTML = state.watchlist
        .map(code => {
            const rate = state.rates[code];
            const rateFormatted = rate !== undefined ? rate.toFixed(4) : 'N/A';
            return `
                <li data-currency="${code}">
                    <span><strong>1 ETB</strong> = ${rateFormatted} ${code}</span>
                    <button type="button" class="rm-btn">Remove</button>
                </li>
            `;
        })
        .join('');
}

function render() {
    const codes = Object.keys(state.rates);
    if (codes.length > 0) {
        currencySelect.innerHTML = codes
            .map(code => `<option value="${code}">${code}</option>`)
            .join('');
            
        if (codes.includes(state.currency)) {
            currencySelect.value = state.currency;
        } else {
            state.currency = codes[0];
            currencySelect.value = state.currency;
        }
    }

    renderWatchlist();
}

convertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = Number(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultEl.textContent = 'Enter a valid positive amount.';
        resultEl.className = 'result-box error';
        return;
    }

    state.currency = currencySelect.value;
    const rate = state.rates[state.currency];

    if (rate === undefined) {
        resultEl.textContent = 'Rate unavailable for selected currency.';
        resultEl.className = 'result-box error';
        return;
    }

    const converted = (amount * rate).toFixed(2);
    resultEl.textContent = `${amount.toFixed(2)} ETB = ${converted} ${state.currency}`;
    resultEl.className = 'result-box';
    save();
});

addWatchBtn.addEventListener('click', () => {
    const selected = currencySelect.value;
    if (!selected) return;

    if (!state.watchlist.includes(selected)) {
        state.watchlist.push(selected);
        save();
        renderWatchlist();
    }
});

watchlistUl.addEventListener('click', (e) => {
    if (e.target.matches('.rm-btn')) {
        const item = e.target.closest('li');
        const code = item.dataset.currency;
        state.watchlist = state.watchlist.filter(c => c !== code);
        save();
        renderWatchlist();
    }
});

currencySelect.addEventListener('change', () => {
    state.currency = currencySelect.value;
    save();
});

async function init() {
    load();
    await loadRates();
}

init();