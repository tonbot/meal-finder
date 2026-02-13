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
        const errorMsg = `Could not load template at ${path}: ${res.status} ${res.statusText}`;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
}

// render with template
export function renderWithTemplate(template, parentElement, data, callback) {
    if (!parentElement) return;
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
        callback(data);
    }
}

// load Header and Footer
export async function loadHeaderFooter() {
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    try {
        const baseUrl = import.meta.env.BASE_URL || "/";
        // Ensure path doesn't have double slashes if baseUrl ends with /
        const headerPath = (baseUrl + "partials/header.html").replace(/\/+/g, "/");
        const footerPath = (baseUrl + "partials/footer.html").replace(/\/+/g, "/");

        const headerTemplate = await loadTemplate(headerPath);
        const footerTemplate = await loadTemplate(footerPath);
        
        renderWithTemplate(headerTemplate, headerElement);
        renderWithTemplate(footerTemplate, footerElement);
        
        // Update links in header/footer to include base path
        const allLinks = [
            ...(headerElement ? headerElement.querySelectorAll("a") : []),
            ...(footerElement ? footerElement.querySelectorAll("a") : [])
        ];
        
        allLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("/")) {
                // If it's an absolute path within the site, prefix it with baseUrl
                // But only if it doesn't already start with the baseUrl
                if (!href.startsWith(baseUrl)) {
                    link.setAttribute("href", (baseUrl + href.substring(1)).replace(/\/+/g, "/"));
                }
            }
        });

        // Update year in footer
        const yearEl = document.querySelector("#year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        
        // Update favorites count
        updateFavoritesCount();
    } catch (err) {
        console.error("Error in loadHeaderFooter:", err);
        if (headerElement && !headerElement.innerHTML) {
            headerElement.innerHTML = `<p style="color:red; padding:1rem; text-align:center;">Error loading header: ${err.message}</p>`;
        }
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
