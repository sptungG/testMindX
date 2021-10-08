import BaseComponent from "./BaseComponent.js";
export default class DishDetail extends BaseComponent {
  render() {
    let $detailContainer = document.createElement("div");
    $detailContainer.classList.add("dish-detail");

    let $imageContainer = document.createElement("div");
    $imageContainer.classList.add("detail-image-container");
    $imageContainer.innerHTML = `<img src="${this.props.dish.image}" alt="" class="detail-image" />`;

    let $date = document.createElement("div");
    $date.classList.add("detail-date");
    $date.innerHTML = `<i class="far fa-clock"></i><span class="detail-date-num">${this.props.dish.createAt}</span>`;

    let $dishTime = document.createElement("span");
    $dishTime.classList.add("detail-time");
    $dishTime.innerHTML = `<i class="fas fa-stopwatch"></i><span>${this.props.dish.time} mins</span>`;

    let $detailCategory = document.createElement("ul");
    $detailCategory.classList.add("detail-category");
    this.generateCategories(this.props.dish.categories, $detailCategory);

    let $detailTitleContainer = document.createElement("div");
    $detailTitleContainer.classList.add("detail-title-container");
    let $dishTitle = document.createElement("h2");
    $dishTitle.classList.add("title", "detail-title");
    $dishTitle.innerHTML = `${this.props.dish.name}`;
    $detailTitleContainer.append($dishTitle, $date, $dishTime);

    let $desc = document.createElement("p");
    $desc.classList.add("text", "detail-desc");
    $desc.innerHTML = `${this.props.dish.desc}`;

    let $detailInstruction = document.createElement("ul");
    $detailInstruction.classList.add("detail-instruction");
    this.generateInstruction(this.props.dish.instruction, $detailInstruction);

    let $authorWrapper = document.createElement("div");
    $authorWrapper.classList.add("detail-author-wrapper");
    $authorWrapper.innerHTML = `
    <img src="${this.props.dish.authorImage}" alt="" class="detail-author-image" />
    <span class="detail-author-name">${this.props.dish.authorName}</span>
    `;
    let $dashboard = document.getElementById("dashboard");
    $dashboard.innerHTML = "";
    $detailContainer.append($imageContainer, $detailCategory, $detailTitleContainer, $desc, $detailInstruction, $authorWrapper);
    return $detailContainer;
  }
  generateCategories(categories, list) {
    categories.forEach((category) => {
      let $category = document.createElement("li");
      $category.classList.add("detail-category-item");
      $category.innerHTML = `${category}`;
      list.appendChild($category);
    });
  }
  generateInstruction(instruction, list) {
    instruction.forEach((instruction, index) => {
      let $instruction = document.createElement("li");
      $instruction.classList.add("detail-instruction-item");
      $instruction.innerHTML = `<span>${("0" + (index + 1)).slice(-2)}</span> <p>${instruction}</p>`;
      list.appendChild($instruction);
    });
  }
}
