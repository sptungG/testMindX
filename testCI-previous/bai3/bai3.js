let item_container = document.getElementById('gallery');
let categorySelect = document.getElementById('category-select');

let category = 'all';
let filteredRecipes = recipes;

function showRecipes(){
    // let itemContainers = document.getElementsByClassName('content-item');
    item_container.innerHTML ='';
for (let idx = 1; idx < filteredRecipes.length; idx++) {
    item_container.insertAdjacentHTML('beforeend',
     `  <div class="column" id="${filteredRecipes[idx].id}" onClick="showDetailItem(this.id);">
             <div class="item-content">
             <img src="${filteredRecipes[idx].img}">
             <span class="item-desc">${filteredRecipes[idx].name}</span>
             </div>  
        </div>`);       
    } 
}
showRecipes();
// 
function filterRecipes() {
    filteredRecipes = recipes;
    if(category != 'all') {
        filteredRecipes = recipes.filter((recipe) => recipe.category == category);
    }
    showRecipes();
}
// 
function showThisItem(clicked_id) {
    showDetailItem(clicked_id);
}
function showDetailItem(itemID) {
    // // scroll form back to the top
    // $('#form').animate({
    //     scrollTop: 0
    // },100);
    let recipeCategory = document.getElementsByClassName('more-detail-category');
    let thisRecipe = recipes.filter((recipe) => Number(recipe.id) == itemID);
    document.getElementsByClassName('more-detail-title')[0].innerHTML = thisRecipe[0].name;
    let thisRecipeCategory;
    switch(thisRecipe[0].category) {
        case 'asia':
            thisRecipeCategory = 'Món Á';
            break;
        case 'foreign':
            thisRecipeCategory = 'Món ngoại';
            break;
        case 'viet':
            thisRecipeCategory = 'Món Việt';
            break;   
    }
    let allCategory = `<span><i class="fa fa-map-o"></i>. ${thisRecipeCategory}</span>`
    recipeCategory[0].innerHTML = allCategory;
    document.getElementById('more-detail-img-big').src = thisRecipe[0].img;
    document.getElementsByClassName('more-detail-desc')[0].innerHTML = `<p>${thisRecipe[0].description}</p>`;
    document.getElementById("myBlog").style.display = "block";
}
function closeForm() {
    document.getElementById("myBlog").style.display = "none";
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("category-select");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){

    category = this.value;
    filterRecipes();
    
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}