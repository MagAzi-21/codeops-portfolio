'use strict';

const STORAGE_KEY = 'signups_data';
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

const form = document.querySelector('#signup-form');
const nameInput = document.querySelector('#full-name');
const phoneInput = document.querySelector('#phone-number');
const errorDisplay = document.querySelector('#error-message');
const successDisplay = document.querySelector('#success-message');
const countDisplay = document.querySelector('#signup-count');

function loadSignups() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveSignups(signups) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));
}

function updateCount() {
    const list = loadSignups();
    countDisplay.textContent = list.length;
}

function validate(name, phone) {
    if (!name || name.length < 2) {
        return 'Please enter a name with at least 2 characters.';
    }
    if (!phone) {
        return 'Phone number is required.';
    }
    if (!PHONE_REGEX.test(phone)) {
        return 'Enter a valid Ethiopian phone number (e.g. 0912345678 or +251912345678).';
    }
    return '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorDisplay.textContent = '';
    successDisplay.textContent = '';

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const error = validate(name, phone);
    if (error) {
        errorDisplay.textContent = error;
        return;
    }

    const signups = loadSignups();
    signups.push({ name, phone, timestamp: new Date().toISOString() });
    saveSignups(signups);

    updateCount();
    form.reset();
    successDisplay.textContent = 'Registration saved successfully.';
});

updateCount();