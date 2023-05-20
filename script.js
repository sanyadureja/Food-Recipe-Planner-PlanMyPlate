const appID = "82d77cf0";
const appKey = "c96a34b89d9e89f08c25fe58334defd5";
const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appID}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");
// const loadingElement = document.querySelector("#loading");

btnFind.addEventListener("click", () => loadRecipes(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value;
    if(e.keyCode === 13){
        loadRecipes(inputVal);
    }
});


const setScrollPosition = () => {
    recipeContainer.scrollTo({top:0, behavior:"smooth"});
};

function loadRecipes(type = "paneer") {
    if (!type) {
      recipeContainer.innerHTML = "Please Enter a Valid Ingredient!";
      return;
    }
    const url = baseURL + `&q=${type}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.hits.length === 0) {
          recipeContainer.innerHTML = "No Recipes Found. Please Enter a Valid Ingredient!";
        } else {
          renderRecipies(data.hits);
        }
      })
      .catch((error) => {
        recipeContainer.innerHTML = "Error Loading Recipes";
      })
      .finally(() => setScrollPosition());
  }
loadRecipes();

const getRecipeStepStr = (ingredientLines = []) => {
    let str ="";
    for(var step of ingredientLines){
        str = str + `<li>${step}</li>`;
    }
    return str;
};

const renderRecipies = (recipeList = []) => {
        recipeContainer.innerHTML = "";
    recipeList.forEach((recipeObj) => {
        const{ 
            label: recipeTitle, 
            ingredientLines, 
            image:recipeImage,
        } = recipeObj.recipe;
        const RecipeStepStr = getRecipeStepStr(ingredientLines);
    const htmlStr = ` <div class="recipe">
            <div class="recipe-title">${recipeTitle}</div>
            <div class="recipe-image">
                <img src="${recipeImage}"  />
            </div>
            <div class="recipe-description">
                <ul>
                   ${RecipeStepStr}                                                     
                </ul>
            </div>
        </div>`;
        
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    });
};

