import BaseComponent from "../components/BaseComponent.js";
import DishDetail from "../components/DishDetail.js";
import { appendTo } from "../models/utils.js";
import { auth, db } from "../firebase.js";

export default class DishShow extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    db.collection("dishes")
      .doc(this.props.id)
      .onSnapshot((doc) => {
        // console.log(doc.data());
        let $dashboard = document.querySelector("#dashboard");
        let $container = document.querySelector("#dishShow");
        $container.classList.add("wrapper");

        let $detailSection = document.createElement("section");
        $detailSection.classList.add("detail");

        let $detailContainer = document.createElement("div");
        $detailContainer.classList.add("container");

        // DishPlay
        // Detail
        // let story1 = await getStoryById(this.props.id);

        let _dishDetail = new DishDetail({
          id: this.props.id,
          dish: doc.data(),
        });
        appendTo($detailContainer, _dishDetail);

        $detailSection.append($detailContainer);
        $dashboard.innerHTML = "";
        $container.innerHTML = "";
        $container.append($detailSection);
        return $container;
      });
  }
}
