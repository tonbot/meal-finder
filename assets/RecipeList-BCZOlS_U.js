import{r as o,g as d,s as l,u as c}from"./utils-D17q7IE_.js";function v(s){const e=(d("favorites")||[]).some(n=>n.id===s.id),t=e?"saved":"",a=e?"❤️ Saved":"♡ Save to Favorites";return`
    <li class="recipe-card">
        <a href="${("/meal-finder/"+`recipe-details/index.html?recipe=${s.id}`).replace(/\/+/g,"/")}">
            <img src="${s.image}" alt="${s.title}" loading="lazy">
            <div class="recipe-card-content">
                <h3>${s.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${s.readyInMinutes||"?"} mins</span>
                    <span>🥗 ${s.servings||"?"} servings</span>
                </div>
            </div>
        </a>
        <div style="padding: 0 1.5rem 1.5rem;">
            <button class="favorite-btn ${t}" data-id="${s.id}" data-title="${s.title}" data-image="${s.image}">
                ${a}
            </button>
        </div>
    </li>
    `}class m{constructor(e,t){this.dataSource=e,this.listElement=t}async init(){const e=await this.dataSource.getRecipes();this.renderRecipes(e)}renderRecipes(e){if(!e||e.length===0){this.listElement.innerHTML='<p class="error-message">No recipes found. Try a different search.</p>';return}o(v,this.listElement,e,"afterbegin",!0),this.addFavoriteListeners()}addFavoriteListeners(){this.listElement.querySelectorAll(".favorite-btn").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();const i=parseInt(t.dataset.id),r=t.dataset.title,n=t.dataset.image;this.toggleFavorite({id:i,title:r,image:n},t)})})}toggleFavorite(e,t){let a=d("favorites")||[];const i=a.findIndex(r=>r.id===e.id);i===-1?(a.push(e),t.classList.add("saved"),t.textContent="❤️ Saved"):(a.splice(i,1),t.classList.remove("saved"),t.textContent="♡ Save to Favorites"),l("favorites",a),c()}}export{m as R,v as r};
