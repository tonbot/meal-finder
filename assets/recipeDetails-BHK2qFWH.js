import{q as l,g as r,u as d,l as c,a as v}from"./utils-CcggRpJ1.js";import{R as m}from"./RecipeData-zuwZFmIs.js";class p{constructor(s,a){this.recipeId=s,this.dataSource=a,this.container=l("#recipe-details-container")}async init(){if(!this.recipeId){this.container.innerHTML='<p class="error-message">No recipe selected.</p>';return}const s=await this.dataSource.getRecipeDetails(this.recipeId);s?this.renderRecipe(s):this.container.innerHTML='<p class="error-message">Could not load recipe details.</p>'}renderRecipe(s){var o;const a=(r("favorites")||[]).some(e=>e.id===s.id),i=a?"saved":"",t=a?"❤️ Saved":"♡ Save to Favorites",n=`
            <div class="recipe-header">
                <img src="${s.image}" alt="${s.title}">
                <div class="recipe-title-overlay">
                    <h1>${s.title}</h1>
                    <div class="recipe-meta-badges">
                        ${s.vegetarian?'<span class="badge">Vegetarian</span>':""}
                        ${s.vegan?'<span class="badge">Vegan</span>':""}
                        ${s.glutenFree?'<span class="badge">Gluten Free</span>':""}
                    </div>
                </div>
            </div>

            <div class="recipe-info-bar">
                <div class="info-item">
                    <span class="info-label">READY IN</span>
                    <span>${s.readyInMinutes} mins</span>
                </div>
                <div class="info-item">
                    <span class="info-label">SERVINGS</span>
                    <span>${s.servings}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">HEALTH SCORE</span>
                    <span>${s.healthScore}%</span>
                </div>
                <div class="info-item">
                    <button id="add-favorite-details" class="favorite-btn ${i}" 
                        data-id="${s.id}" data-title="${s.title}" data-image="${s.image}">
                        ${t}
                    </button>
                </div>
            </div>

            <div class="recipe-body">
                <div class="ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        ${s.extendedIngredients.map(e=>`<li>${e.original}</li>`).join("")}
                    </ul>

                    <div class="nutrition-summary" style="margin-top: 2rem;">
                        <h4>Nutrition per Serving</h4>
                        <ul>
                            ${s.nutrition.nutrients.slice(0,5).map(e=>`<li>${e.name}: ${Math.round(e.amount)}${e.unit}</li>`).join("")}
                        </ul>
                    </div>
                </div>

                <div class="instructions">
                    <h4>Steps</h4>
                    <ol>
                        ${((o=s.analyzedInstructions[0])==null?void 0:o.steps.map(e=>`<li>${e.step}</li>`).join(""))||`<li>${s.instructions||"Refer to original source for instructions."}</li>`}
                    </ol>
                    <p style="margin-top: 2rem; font-size: 0.9rem;">
                        Source: <a href="${s.sourceUrl}" target="_blank" style="color: var(--primary-color)">${s.sourceName}</a>
                    </p>
                </div>
            </div>
        `;this.container.innerHTML=n,this.addDetailsFavoriteListener(s)}addDetailsFavoriteListener(s){const a=l("#add-favorite-details");a.addEventListener("click",()=>{let i=r("favorites")||[];const t=i.findIndex(n=>n.id===s.id);t===-1?(i.push({id:s.id,title:s.title,image:s.image}),a.classList.add("saved"),a.textContent="❤️ Saved"):(i.splice(t,1),a.classList.remove("saved"),a.textContent="♡ Save to Favorites"),localStorage.setItem("favorites",JSON.stringify(i)),d()})}}c();const u=v("recipe"),g=new m,f=new p(u,g);f.init();
