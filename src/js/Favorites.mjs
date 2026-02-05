import { qs, getLocalStorage, renderListWithTemplate, updateFavoritesCount, setLocalStorage } from "./utils.mjs";
import { recipeCardTemplate } from "./RecipeList.mjs";

export default class Favorites {
    constructor(listElement) {
        this.listElement = listElement;
    }

    init() {
        const favorites = getLocalStorage("favorites") || [];
        this.renderFavorites(favorites);
    }

    renderFavorites(favorites) {
        if (!favorites || favorites.length === 0) {
            this.listElement.innerHTML = '<p class="empty-message">You haven\'t saved any recipes yet.</p>';
            return;
        }

        renderListWithTemplate(recipeCardTemplate, this.listElement, favorites, "afterbegin", true);
        this.addRemoveListeners();
    }

    addRemoveListeners() {
        const buttons = this.listElement.querySelectorAll(".favorite-btn");
        buttons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(btn.dataset.id);
                this.removeFavorite(id);
                // Refresh the list
                this.init();
            });
        });
    }

    removeFavorite(id) {
        let favorites = getLocalStorage("favorites") || [];
        favorites = favorites.filter(fav => fav.id !== id);
        setLocalStorage("favorites", favorites);
        updateFavoritesCount();
    }
}
