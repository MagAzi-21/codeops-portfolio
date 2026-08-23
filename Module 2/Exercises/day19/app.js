'use strict';

const form = document.querySelector('#add-form');
const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price');
const list = document.querySelector('#list');
const totalEl = document.querySelector('#total');

function updateTotal() {
    const items = list.querySelectorAll('li');
    let total = 0;
    items.forEach(item => {
        total += Number(item.dataset.price || 0);
    });
    totalEl.textContent = total.toFixed(2);
}

function addItem(name, price) {
    const li = document.createElement('li');
    li.dataset.price = price;

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = `${name} - ${price.toFixed(2)} ETB`;

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'del-btn';
    delBtn.textContent = 'Delete';

    li.append(span, delBtn);
    list.append(li);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || isNaN(price) || price <= 0) return;

    addItem(name, price);
    updateTotal();
    form.reset();
    nameInput.focus();
});

list.addEventListener('click', (e) => {
    if (e.target.matches('.del-btn')) {
        e.target.closest('li').remove();
        updateTotal();
    } else {
        const li = e.target.closest('li');
        if (li) {
            li.classList.toggle('bought');
        }
    }
});