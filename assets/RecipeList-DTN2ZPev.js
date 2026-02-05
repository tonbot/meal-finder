import{r as o,g as n,s as l,u as c}from"./utils-CVAddTJ3.js";function v(s){const t=(n("favorites")||[]).some(i=>i.id===s.id),e=t?"saved":"",a=t?"❤️ Saved":"♡ Save to Favorites";return`
    <li class="recipe-card">
        <a href="/recipe-details/index.html?recipe=${s.id}">
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
            <button class="favorite-btn ${e}" data-id="${s.id}" data-title="${s.title}" data-image="${s.image}">
                ${a}
            </button>
        </div>
    </li>
    `}class m{constructor(t,e){this.dataSource=t,this.listElement=e}async init(){const t=await this.dataSource.getRecipes();this.renderRecipes(t)}renderRecipes(t){if(!t||t.length===0){this.listElement.innerHTML='<p class="error-message">No recipes found. Try a different search.</p>';return}o(v,this.listElement,t,"afterbegin",!0),this.addFavoriteListeners()}addFavoriteListeners(){this.listElement.querySelectorAll(".favorite-btn").forEach(e=>{e.addEventListener("click",a=>{a.preventDefault();const i=parseInt(e.dataset.id),r=e.dataset.title,d=e.dataset.image;this.toggleFavorite({id:i,title:r,image:d},e)})})}toggleFavorite(t,e){let a=n("favorites")||[];const i=a.findIndex(r=>r.id===t.id);i===-1?(a.push(t),e.classList.add("saved"),e.textContent="❤️ Saved"):(a.splice(i,1),e.classList.remove("saved"),e.textContent="♡ Save to Favorites"),l("favorites",a),c()}}export{m as R,v as r};
