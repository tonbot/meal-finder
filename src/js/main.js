import { loadHeaderFooter, qs } from "./utils.mjs";
import RecipeData from "./RecipeData.mjs";
import RecipeList from "./RecipeList.mjs";
import SearchFilter from "./SearchFilter.mjs";

loadHeaderFooter();

const recipeData = new RecipeData();
const recipeListElement = qs("#recipe-list");
const recipeList = new RecipeList(recipeData, recipeListElement);

const searchFilter = new SearchFilter(recipeData, recipeList);

recipeList.init();
searchFilter.init();
