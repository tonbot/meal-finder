// wrapper for querySelector
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
    const el = qs(selector);
    if (el) {
        el.addEventListener("touchend", (event) => {
            event.preventDefault();
            callback(event);
        });
        el.addEventListener("click", callback);
    }
}

// load HTML template
export async function loadTemplate(path) {
    const res = await fetch(path);
    if (res.ok) {
        const template = await res.text();
        return template;
    } else {
        throw new Error("Could not load template");
    }
}

// render with template
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

// load Header and Footer
export async function loadHeaderFooter() {
    try {
        const headerTemplate = await loadTemplate("/public/partials/header.html");
        const footerTemplate = await loadTemplate("/public/partials/footer.html");
        
        const headerElement = document.querySelector("#main-header");
        const footerElement = document.querySelector("#main-footer");

        renderWithTemplate(headerTemplate, headerElement);
        renderWithTemplate(footerTemplate, footerElement);
        
        // Update year in footer
        const yearEl = document.querySelector("#year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        
        // Update favorites count
        updateFavoritesCount();
    } catch (err) {
        console.error("Error loading header/footer:", err);
    }
}

// get URL parameters
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

// render list with template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    if (clear) {
        parentElement.innerHTML = "";
    }
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// update favorites badge
export function updateFavoritesCount() {
    const favorites = getLocalStorage("favorites") || [];
    const badge = document.querySelector("#favorites-count");
    if (badge) {
        badge.textContent = favorites.length;
    }
}
