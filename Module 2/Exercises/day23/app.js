'use strict';

const STORAGE_KEY = 'addiseats_cart';
const MENU_URL = 'data/menu.json';

const state = {
    dishes: [],
    cart: [],
    search: ''
};

const menuEl = document.querySelector('#menu');
const searchEl = document.querySelector('#search');
const cartListEl = document.querySelector('#cart-list');
const cartTotalEl = document.querySelector('#cart-total');

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function load() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            state.cart = JSON.parse(saved);
        }
    } catch {
        state.cart = [];
    }
}

function cartTotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function renderCart() {
    if (state.cart.length === 0) {
        cartListEl.innerHTML = '<li class="empty-state">Your cart is empty</li>';
        cartTotalEl.textContent = '0.00';
        return;
    }

    cartListEl.innerHTML = state.cart
        .map(item => `
            <li class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <small>${item.price} ETB &times; ${item.qty}</small>
                </div>
                <div class="cart-item-actions">
                    <span>${(item.price * item.qty).toFixed(2)} ETB</span>
                    <button type="button" class="btn-rm" aria-label="Remove item">&times;</button>
                </div>
            </li>
        `)
        .join('');

    cartTotalEl.textContent = cartTotal().toFixed(2);
}

function renderMenu() {
    const term = state.search.toLowerCase().trim();
    const filtered = state.dishes.filter(dish =>
        dish.name.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
        menuEl.innerHTML = '<p class="empty-state">No dishes match your search.</p>';
        return;
    }

    menuEl.innerHTML = filtered
        .map(dish => `
            <article class="dish" data-id="${dish.id}">
                <div>
                    <h3>${dish.name}</h3>
                    <p class="price">${dish.price.toFixed(2)} ETB</p>
                </div>
                <button type="button" class="btn-add">Add to Order</button>
            </article>
        `)
        .join('');
}

function render() {
    renderMenu();
    renderCart();
}

async function loadMenu() {
    menuEl.innerHTML = '<p class="empty-state">Loading menu...</p>';
    try {
        const res = await fetch(MENU_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        state.dishes = await res.json();
        render();
    } catch {
        menuEl.innerHTML = '<p class="empty-state">Could not load the menu. Please refresh.</p>';
    }
}

searchEl.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderMenu();
});

menuEl.addEventListener('click', (e) => {
    if (!e.target.matches('.btn-add')) return;
    const dishCard = e.target.closest('.dish');
    const id = Number(dishCard.dataset.id);
    const dish = state.dishes.find(d => d.id === id);

    if (!dish) return;

    const existingLine = state.cart.find(item => item.id === id);
    if (existingLine) {
        existingLine.qty++;
    } else {
        state.cart.push({ ...dish, qty: 1 });
    }

    save();
    renderCart();
});

cartListEl.addEventListener('click', (e) => {
    if (!e.target.matches('.btn-rm')) return;
    const cartItem = e.target.closest('.cart-item');
    const id = Number(cartItem.dataset.id);

    state.cart = state.cart.filter(item => item.id !== id);
    save();
    renderCart();
});

async function init() {
    load();
    await loadMenu();
}

init();