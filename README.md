# Recipe & Meal Finder

A modern, responsive web application for finding delicious cooking recipes based on ingredients, dietary needs, or cuisines. This project utilizes the Spoonacular API to provide high-quality recipe data, including nutrition information and step-by-step instructions.

## Features

- **Recipe Search**: Search thousands of recipes by name or keyword.
- **Ingredient-Based Search**: Enter what's in your pantry to find matching meals.
- **Advanced Filters**: Filter by diet (vegan, keto, vegetarian, etc.) or cuisine (Italian, Mexican, Asian, etc.).
- **Recipe Details**: View full ingredients, instructions, cooking time, and nutrition summary.
- **Favorites**: Save your favorite recipes to access them later (persisted via LocalStorage).
- **Responsive Design**: Optimized for both mobile and desktop screens with a fresh, food-focused aesthetic.

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **JavaScript**: Vanilla ES6 Modules
- **CSS**: Vanilla CSS with Custom Properties (Modern Design System)
- **API**: [Spoonacular Food API](https://spoonacular.com/food-api)
- **Persistence**: LocalStorage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- A Spoonacular API Key (Get a free one at [Spoonacular](https://spoonacular.com/food-api))

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API Key**:
   Create a `.env` file in the root (or use the provided `src/.env.sample` as a template) and add your API Key:
   ```
   VITE_SPOONACULAR_API_KEY=your_actual_key_here
   ```
   *Note: In the current implementation, the API key is placed directly in `RecipeData.mjs`. It is recommended to use environment variables for production.*

3. **Start Development Server**:
   ```bash
   npm run start
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

```
recipe-meal-finder/
├── src/
│   ├── css/
│   │   └── style.css            # Main design system and styles
│   ├── js/
│   │   ├── main.js              # Home page entry
│   │   ├── recipe-details.js    # Details page entry
│   │   ├── favorites.js         # Favorites page entry
│   │   ├── RecipeData.mjs       # API service module
│   │   ├── RecipeList.mjs       # List component
│   │   ├── RecipeDetails.mjs    # Details component
│   │   ├── SearchFilter.mjs     # Search/Filter component
│   │   ├── Favorites.mjs        # Favorites component
│   │   └── utils.mjs            # Reusable utilities
│   ├── public/
│   │   ├── images/              # Static assets
│   │   └── partials/            # Header/Footer templates
│   ├── recipe-details/
│   │   └── index.html           # Recipe details page
│   ├── index.html               # Main entry page
│   └── favorites.html           # Favorites list page
├── vite.config.js               # Vite configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # You are here
```

## Credits

- Data provided by [Spoonacular API](https://spoonacular.com/food-api).
- Design inspired by modern culinary applications.
