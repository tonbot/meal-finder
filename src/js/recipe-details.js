import { loadHeaderFooter, getParam } from "./utils.mjs";
import RecipeData from "./RecipeData.mjs";
import RecipeDetails from "./RecipeDetails.mjs";

loadHeaderFooter();

const recipeId = getParam("recipe");
const dataSource = new RecipeData();

const recipeDetails = new RecipeDetails(recipeId, dataSource);
recipeDetails.init();
