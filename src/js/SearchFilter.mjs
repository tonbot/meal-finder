import { qs } from "./utils.mjs";

export default class SearchFilter {
    constructor(recipeData, recipeList) {
        this.recipeData = recipeData;
        this.recipeList = recipeList;
        this.searchInput = qs("#recipe-search");
        this.searchBtn = qs("#search-btn");
        this.dietFilter = qs("#diet-filter");
        this.cuisineFilter = qs("#cuisine-filter");
        this.ingredientInput = qs("#ingredient-search");
        this.ingredientBtn = qs("#ingredient-search-btn");
        this.resultsTitle = qs("#results-title");
    }

    init() {
        this.searchBtn.addEventListener("click", () => this.handleSearch());
        this.searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.handleSearch();
                this.closeSuggestions();
            }
        });

        // Autocomplete logic
        this.suggestionsDropdown = qs("#suggestions-dropdown");
        this.searchInput.addEventListener("input", () => this.handleAutocomplete());

        // Close suggestions when clicking outside
        document.addEventListener("click", (e) => {
            if (!this.searchInput.contains(e.target) && !this.suggestionsDropdown.contains(e.target)) {
                this.closeSuggestions();
            }
        });

        this.dietFilter.addEventListener("change", () => this.handleSearch());
        this.cuisineFilter.addEventListener("change", () => this.handleSearch());

        this.ingredientBtn.addEventListener("click", () => this.handleIngredientSearch());
    }

    async handleAutocomplete() {
        const query = this.searchInput.value;
        if (query.length < 3) {
            this.closeSuggestions();
            return;
        }

        const suggestions = await this.recipeData.getRecipeAutocomplete(query);
        this.renderSuggestions(suggestions);
    }

    renderSuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) {
            this.closeSuggestions();
            return;
        }

        this.suggestionsDropdown.innerHTML = "";
        suggestions.forEach(suggestion => {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            div.textContent = suggestion.title;
            div.addEventListener("click", () => {
                this.searchInput.value = suggestion.title;
                this.handleSearch();
                this.closeSuggestions();
            });
            this.suggestionsDropdown.appendChild(div);
        });

        this.suggestionsDropdown.classList.add("active");
    }

    closeSuggestions() {
        this.suggestionsDropdown.classList.remove("active");
        this.suggestionsDropdown.innerHTML = "";
    }

    async handleSearch() {
        const query = this.searchInput.value;
        const diet = this.dietFilter.value;
        const cuisine = this.cuisineFilter.value;

        this.recipeList.listElement.innerHTML = '<li class="loading-placeholder">Searching recipes...</li>';
        this.resultsTitle.textContent = query ? `Results for "${query}"` : "Filtered Recipes";

        const recipes = await this.recipeData.getRecipes(query, diet, cuisine);
        this.recipeList.renderRecipes(recipes);
    }

    async handleIngredientSearch() {
        const ingredients = this.ingredientInput.value;
        if (!ingredients) return;

        this.recipeList.listElement.innerHTML = '<li class="loading-placeholder">Finding recipes by ingredients...</li>';
        this.resultsTitle.textContent = `Results with "${ingredients}"`;

        const recipes = await this.recipeData.getRecipesByIngredients(ingredients);
        this.recipeList.renderRecipes(recipes);
    }
}
