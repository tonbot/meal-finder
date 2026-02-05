# Recipe & Meal Finder

A modern, responsive web application for finding delicious cooking recipes based on ingredients, dietary needs, or cuisines. This project utilizes the Spoonacular API to provide high-quality recipe data, including nutrition information and step-by-step instructions.

## Features

- **Smart search**: Real-time suggestions (autocomplete) as you type. It handles partial matches and misspellings, helping you find exactly what you're looking for (e.g., "Jollof Rice").
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
   Create a `.env` file in the `src/` directory and add your Spoonacular API Key:
   ```
   VITE_SPOONACULAR_API_KEY=your_actual_key_here
   ```
   *Note: Using the `VITE_` prefix allows the environment variable to be accessed securely within the frontend code.*

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

## Deployment

This project is configured for automated deployment to **GitHub Pages** using GitHub Actions.

### Setup Deployment

1. **Commit and Push**: Ensure you have pushed the latest changes (including the `.github/workflows/deploy.yml` file) to your `master` branch.
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select the `gh-pages` branch (this branch is created automatically by the GitHub Action) and the `/ (root)` folder.
   - Click **Save**.
3. **Wait for Action**: The next time you push to `master`, the GitHub Action will automatically build and deploy your site to `https://tonbot.github.io/meal-finder/`.
