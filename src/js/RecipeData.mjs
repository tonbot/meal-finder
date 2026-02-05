export default class RecipeData {
    constructor() {
        this.apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        this.baseUrl = "https://api.spoonacular.com/recipes";
    }

    async getRecipes(query = "", diet = "", cuisine = "") {
        let url = `${this.baseUrl}/complexSearch?apiKey=${this.apiKey}&addRecipeInformation=true&number=12`;
        
        if (query) url += `&query=${encodeURIComponent(query)}`;
        if (diet) url += `&diet=${diet}`;
        if (cuisine) url += `&cuisine=${cuisine}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch recipes");
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Error fetching recipes:", error);
            return [];
        }
    }

    async getRecipesByIngredients(ingredients) {
        const url = `${this.baseUrl}/findByIngredients?apiKey=${this.apiKey}&ingredients=${encodeURIComponent(ingredients)}&number=12`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch recipes by ingredients");
            return await response.json();
        } catch (error) {
            console.error("Error fetching recipes by ingredients:", error);
            return [];
        }
    }

    async getRecipeDetails(id) {
        const url = `${this.baseUrl}/${id}/information?apiKey=${this.apiKey}&includeNutrition=true`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch recipe details");
            return await response.json();
        } catch (error) {
            console.error("Error fetching recipe details:", error);
            return null;
        }
    }

    async getRecipeNutrition(id) {
        const url = `${this.baseUrl}/${id}/nutritionWidget.json?apiKey=${this.apiKey}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch nutrition data");
            return await response.json();
        } catch (error) {
            console.error("Error fetching nutrition data:", error);
            return null;
        }
    }

    async getRecipeAutocomplete(query) {
        if (!query || query.length < 3) return [];
        const url = `${this.baseUrl}/autocomplete?apiKey=${this.apiKey}&query=${encodeURIComponent(query)}&number=5`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch suggestions");
            return await response.json();
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            return [];
        }
    }
}

