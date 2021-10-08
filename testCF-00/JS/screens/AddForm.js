import BaseComponent from "../components/BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";
import {appendTo, modalClose } from "../models/utils.js";
import { auth, db} from "../firebase.js";
import { getUserById } from "../models/users.js";
export default class AddForm extends BaseComponent {
  // truyền dữ liệu thông qua props
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        categories: "",
        time: "",
        desc: "",
      },
      messageError: {
        name: "",
        categories: "",
        time: "",
        desc: "",
      },
    };
  }

  /**
   * Xử lý sự kiện onchange của input
   */
  handleInputChange = (fieldName, filedValue) => {
    let tmpState = this.state;
    if (filedValue.trim() == "") {
      tmpState.messageError[fieldName] = `Invalid ${fieldName}`;
    } else {
      tmpState.messageError[fieldName] = "";
      tmpState.data[fieldName] = filedValue.trim();
    }

    this.setState(tmpState);
  };

  // ==========================  ==========================
  render() {
    let $container = document.querySelector("#modalAdd");

    let _nameDish = new InputWrapper({
      id: "dish-name",
      placeholder: "Enter dish name...",
      label: "Dish Name",
      type: "text",
      autocomplete: "on",
      error: this.state.messageError.name,
      value: this.state.data.name,
      onblur: (event) => {
        this.handleInputChange("name", event.target.value);
      },
    });
    let _categories = new InputWrapper({
      id: "dish-categories",
      label: "Categories",
      placeholder: "Enter categories separated by (,)",
      type: "text",
      autocomplete: "on",
      error: this.state.messageError.categories,
      value: this.state.data.categories,
      onblur: (event) => {
        this.handleInputChange("categories", event.target.value);
      },
    });
    let _time = new InputWrapper({
      id: "dish-time",
      label: "Time length",
      placeholder: "Enter time length to complete recipe...",
      type: "number",
      autocomplete: "on",
      error: this.state.messageError.time,
      value: this.state.data.time,
      onblur: (event) => {
        this.handleInputChange("time", event.target.value);
      },
    });
    let _desc = new InputWrapper({
      id: "desc",
      label: "Describe",
      placeholder: "Enter Dish Describe...",
      type: "text",
      autocomplete: "on",
      error: this.state.messageError.desc,
      value: this.state.data.desc,
      onblur: (event) => {
        this.handleInputChange("desc", event.target.value);
      },
    });

    let $caption = document.createElement("h1");
    $caption.innerHTML = "Find all types of Yummy dishes here.";
    $caption.classList.add("form-caption", "caption");

    let $title = document.createElement("h2");
    $title.innerHTML = "Create Your Dish";
    $title.classList.add("form-title");
    let $btn = document.createElement("button");
    $btn.innerHTML = "Add Dish";
    $btn.classList.add("form-btn", "btn", "btn-primary");

    let isPassed = true;

    for (const key in this.state.data) {
      if (!this.state.data[key]) {
        isPassed = false;
      }
    }

    for (const key in this.state.messageError) {
      if (this.state.messageError[key]) {
        isPassed = false;
      }
    }
    let $form = document.createElement("form");
    $form.classList.add("form-fill");
    if (isPassed) {
      $btn.disabled = false;
    } else {
      $btn.disabled = true;
      $btn.classList.remove("btn-primary");
      $btn.classList.add("btn-lock");
      $btn.style.cursor = "default";
    }
    $form.onsubmit = async (event) => {
      event.preventDefault();
      let userData = await getUserById(auth.currentUser.uid);
      await db.collection("dishes").add({
        name: this.state.data.name,
        categories: this.state.data.categories.split(","),
        createAt: new Date().toLocaleDateString("vi-VI"),
        desc: this.state.data.desc,
        authorName: userData.name,
        authorImage: userData.image,
      });
      alert(`Added Successfully ${this.state.data.name}`);
      $container.innerHTML = "";
      window.location.reload();
      return;
    };
    appendTo($form, _nameDish, _categories, _desc);

    $form.append($btn, $title);

    let $wrap = document.createElement("div");
    $wrap.classList.add("form");
    let $btnClose = document.createElement("i");
    $btnClose.classList.add("far", "fa-times-circle", "modal-close");
    modalClose($container);
    $wrap.append($caption, $form, $btnClose);
    let $modal = document.createElement("div");
    $modal.classList.add("modal");
    $modal.append($wrap);

    $container.innerHTML = "";
    $container.append($modal);
    return $container;
  }
}