import BaseComponent from "../components/BaseComponent.js";
import DishInGrid from "../components/DishInGrid.js";
import { appendTo } from "../models/utils.js";
import { auth, db } from "../firebase.js";
export default class DashBoard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    let $container = document.querySelector("#dashboard");
    $container.classList.add("wrapper");

    let $dishSection = document.createElement("main");
    $dishSection.classList.add("container");

    let $dishHeader = document.createElement("div");
    $dishHeader.classList.add("main-header");
    let $dishHeaderTitle = document.createElement("h2");
    $dishHeaderTitle.classList.add("main-header-title", "title");
    $dishHeaderTitle.innerHTML = "Dishes Collection";
    $dishHeader.append($dishHeaderTitle);
    let $dishList = document.createElement("ul");
    $dishList.className = "dish-list";
    db.collection("dishes")
      .onSnapshot((snapshot) => {
        $dishList.innerHTML = "";
        snapshot.docs.forEach((doc) => {
          let dish = {
            id: doc.id,
            ...doc.data(),
          };
          let _dish = new DishInGrid({ dish: dish });
          appendTo($dishList, _dish);
        });
      });

    $dishSection.append($dishHeader, $dishList);
    $container.innerHTML = "";
    $container.append($dishSection);
    return $container;
  }
}
