import { loadHeaderFooter, qs } from "./utils.mjs";
import Favorites from "./Favorites.mjs";

loadHeaderFooter();

const listElement = qs("#favorites-list");
const favorites = new Favorites(listElement);

favorites.init();
