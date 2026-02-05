import { qs, getLocalStorage, updateFavoritesCount } from "./utils.mjs";

export default class RecipeDetails {
    constructor(recipeId, dataSource) {
        this.recipeId = recipeId;
        this.dataSource = dataSource;
        this.container = qs("#recipe-details-container");
    }

    async init() {
        if (!this.recipeId) {
            this.container.innerHTML = '<p class="error-message">No recipe selected.</p>';
            return;
        }

        const recipe = await this.dataSource.getRecipeDetails(this.recipeId);
        if (recipe) {
            this.renderRecipe(recipe);
        } else {
            this.container.innerHTML = '<p class="error-message">Could not load recipe details.</p>';
        }
    }

    renderRecipe(recipe) {
        const isSaved = (getLocalStorage("favorites") || []).some(fav => fav.id === recipe.id);
        const saveClass = isSaved ? "saved" : "";
        const saveText = isSaved ? "❤️ Saved" : "♡ Save to Favorites";

        const html = `
            <div class="recipe-header">
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="recipe-title-overlay">
                    <h1>${recipe.title}</h1>
                    <div class="recipe-meta-badges">
                        ${recipe.vegetarian ? '<span class="badge">Vegetarian</span>' : ''}
                        ${recipe.vegan ? '<span class="badge">Vegan</span>' : ''}
                        ${recipe.glutenFree ? '<span class="badge">Gluten Free</span>' : ''}
                    </div>
                </div>
            </div>

            <div class="recipe-info-bar">
                <div class="info-item">
                    <span class="info-label">READY IN</span>
                    <span>${recipe.readyInMinutes} mins</span>
                </div>
                <div class="info-item">
                    <span class="info-label">SERVINGS</span>
                    <span>${recipe.servings}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">HEALTH SCORE</span>
                    <span>${recipe.healthScore}%</span>
                </div>
                <div class="info-item">
                    <button id="add-favorite-details" class="favorite-btn ${saveClass}" 
                        data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}">
                        ${saveText}
                    </button>
                </div>
            </div>

            <div class="recipe-body">
                <div class="ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
                    </ul>

                    <div class="nutrition-summary" style="margin-top: 2rem;">
                        <h4>Nutrition per Serving</h4>
                        <ul>
                            ${recipe.nutrition.nutrients.slice(0, 5).map(n => `<li>${n.name}: ${Math.round(n.amount)}${n.unit}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="instructions">
                    <h4>Steps</h4>
                    <ol>
                        ${recipe.analyzedInstructions[0]?.steps.map(step => `<li>${step.step}</li>`).join('') || `<li>${recipe.instructions || "Refer to original source for instructions."}</li>`}
                    </ol>
                    <p style="margin-top: 2rem; font-size: 0.9rem;">
                        Source: <a href="${recipe.sourceUrl}" target="_blank" style="color: var(--primary-color)">${recipe.sourceName}</a>
                    </p>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.addDetailsFavoriteListener(recipe);
    }

    addDetailsFavoriteListener(recipe) {
        const btn = qs("#add-favorite-details");
        btn.addEventListener("click", () => {
            let favorites = getLocalStorage("favorites") || [];
            const index = favorites.findIndex(fav => fav.id === recipe.id);

            if (index === -1) {
                favorites.push({ id: recipe.id, title: recipe.title, image: recipe.image });
                btn.classList.add("saved");
                btn.textContent = "❤️ Saved";
            } else {
                favorites.splice(index, 1);
                btn.classList.remove("saved");
                btn.textContent = "♡ Save to Favorites";
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavoritesCount();
        });
    }
}
