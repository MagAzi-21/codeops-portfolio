'use strict';

// Exercise 1: textContent & classList.toggle
const title = document.querySelector('#main-title');
title.textContent = 'Updated Title via DOM';
title.classList.toggle('highlight');

// Exercise 2: createElement & append
const cityList = document.querySelector('#city-list');
const cities = ['Addis Ababa', 'Hawassa', 'Dire Dawa'];
cities.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    cityList.append(li);
});

// Exercise 3: Event Target & Bubbling
const parentBox = document.querySelector('#parent-box');
const bubbleBtn = document.querySelector('#bubble-btn');

bubbleBtn.addEventListener('click', (e) => {
    console.log('Button clicked, target:', e.target);
});

parentBox.addEventListener('click', () => {
    console.log('Parent box heard bubbled click event');
});

// Exercise 4: Delegated Deletion
const taskList = document.querySelector('#task-list');
taskList.addEventListener('click', (e) => {
    if (e.target.matches('.del-btn')) {
        e.target.closest('li').remove();
    }
});

// Exercise 5: Form preventDefault & Append
const form = document.querySelector('#simple-form');
const itemInput = document.querySelector('#item-input');
const formOutputList = document.querySelector('#form-output-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = itemInput.value.trim();
    if (val) {
        const li = document.createElement('li');
        li.textContent = val;
        formOutputList.append(li);
        itemInput.value = '';
    }
});