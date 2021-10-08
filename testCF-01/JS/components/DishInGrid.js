import DishShow from "../screens/DishShow.js";
import BaseComponent from "./BaseComponent.js";
import { auth, db } from "../firebase.js";
export default class DishInGrid extends BaseComponent {
  render() {
    let $dishItem = document.createElement("li");
    $dishItem.classList.add("dish-item");
    $dishItem.dataset.id = this.props.dish.id;
    let $dishTime = document.createElement("span");
    $dishTime.classList.add("dish-time");
    $dishTime.innerHTML = `${this.props.dish.time} mins`;
    let $dishImage = document.createElement("div");
    $dishImage.classList.add("dish-image");

    $dishImage.innerHTML = `<img src="${this.props.dish.image}" alt="" />`;
    $dishImage.addEventListener("click", (e) => {
      this.handleOnclick(this.props.dish);
    });
    let $dishContent = document.createElement("div");
    $dishContent.classList.add("dish-content");
    $dishContent.innerHTML = `
    <h3 class="dish-title">${this.props.dish.name}</h3>
    <div class="dish-view">
    <i class="far fa-clock"></i><span class="dish-date">${this.props.dish.createAt}</span>
    </div>
    <div class="dish-author">
      <img src="${this.props.dish.authorImage}" alt="" class="dish-author-image" />
      <span class="dish-by">${this.props.dish.authorName}</span>
    </div>
    `;
    $dishItem.append($dishTime, $dishImage, $dishContent);
    return $dishItem;
  }
  async handleOnclick(item) {
    let $show = document.getElementById("dishShow");
    $show.innerHTML = "";
    // console.log(item);
    new DishShow({ id: item.id }).render();
  }
}
