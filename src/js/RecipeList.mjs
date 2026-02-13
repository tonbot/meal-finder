import { renderListWithTemplate, getLocalStorage, setLocalStorage, updateFavoritesCount } from "./utils.mjs";

export function recipeCardTemplate(recipe) {
    const isSaved = (getLocalStorage("favorites") || []).some(fav => fav.id === recipe.id);
    const saveClass = isSaved ? "saved" : "";
    const saveText = isSaved ? "❤️ Saved" : "♡ Save to Favorites";

    const baseUrl = import.meta.env.BASE_URL || "/";
    const detailLink = (baseUrl + `recipe-details/index.html?recipe=${recipe.id}`).replace(/\/+/g, "/");

    return `
    <li class="recipe-card">
        <a href="${detailLink}">
            <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.readyInMinutes || '?'} mins</span>
                    <span>🥗 ${recipe.servings || '?'} servings</span>
                </div>
            </div>
        </a>
        <div style="padding: 0 1.5rem 1.5rem;">
            <button class="favorite-btn ${saveClass}" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}">
                ${saveText}
            </button>
        </div>
    </li>
    `;
}

export default class RecipeList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const recipes = await this.dataSource.getRecipes();
        this.renderRecipes(recipes);
    }

    renderRecipes(recipes) {
        if (!recipes || recipes.length === 0) {
            this.listElement.innerHTML = '<p class="error-message">No recipes found. Try a different search.</p>';
            return;
        }
        renderListWithTemplate(recipeCardTemplate, this.listElement, recipes, "afterbegin", true);
        this.addFavoriteListeners();
    }

    addFavoriteListeners() {
        const buttons = this.listElement.querySelectorAll(".favorite-btn");
        buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const id = parseInt(btn.dataset.id);
                const title = btn.dataset.title;
                const image = btn.dataset.image;
                this.toggleFavorite({ id, title, image }, btn);
            });
        });
    }

    toggleFavorite(recipe, btn) {
        let favorites = getLocalStorage("favorites") || [];
        const index = favorites.findIndex(fav => fav.id === recipe.id);

        if (index === -1) {
            favorites.push(recipe);
            btn.classList.add("saved");
            btn.textContent = "❤️ Saved";
        } else {
            favorites.splice(index, 1);
            btn.classList.remove("saved");
            btn.textContent = "♡ Save to Favorites";
        }

        setLocalStorage("favorites", favorites);
        updateFavoritesCount();
    }
}
