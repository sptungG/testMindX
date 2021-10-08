import BaseComponent from "../components/BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";
import { login } from "../models/users.js";
import { validateEmail, appendTo, modalClose } from "../models/utils.js";
import { auth, db} from "../firebase.js";
export default class LoginForm extends BaseComponent {
  // truyền dữ liệu thông qua props
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      messageError: {
        email: "",
        password: "",
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
    }
    if (fieldName == "email" && filedValue) {
      if (!validateEmail(filedValue)) {
        tmpState.messageError[fieldName] = "Email is false";
        tmpState.data[fieldName] = filedValue.trim();
      } else {
        tmpState.data[fieldName] = filedValue.trim();
      }
    }
    if (fieldName == "password") {
      if (filedValue.trim().length < 6) {
        tmpState.messageError[fieldName] = "Password should be minimum 6 characters.";
      }
    }
    tmpState.data[fieldName] = filedValue.trim();

    this.setState(tmpState);
  };

  // ==========================  ==========================
  render() {
    let $container = document.querySelector("#modalLogin");

    let _email = new InputWrapper({
      id: "email-in",
      label: "Email",
      placeholder: "Enter your email...",
      type: "email",
      error: this.state.messageError.email,
      value: this.state.data.email,
      autocomplete: "on",
      onblur: (event) => {
        this.handleInputChange("email", event.target.value);
      },
    });
    let _password = new InputWrapper({
      id: "password-in",
      label: "Password",
      placeholder: "Enter your password...",
      type: "password",
      error: this.state.messageError.password,
      value: this.state.data.password,
      autocomplete: "on",
      onblur: (event) => {
        this.handleInputChange("password", event.target.value);
      },
    });


    let $caption = document.createElement("h1");
    $caption.innerHTML = "Find all types of Yummy dishes here.";
    $caption.classList.add("form-caption", "caption");

    let $title = document.createElement("h2");
    $title.innerHTML = "Sign In your account";
    $title.classList.add("form-title");
    let $btn = document.createElement("button");
    $btn.innerHTML = "Sign In";
    $btn.classList.add("form-btn", "btn", "btn-primary");

    let $modalRegister = document.querySelector("#modalRegister");
    let $p = document.createElement("p");
    $p.innerHTML = "Not have account yet? ";
    let $link = document.createElement("a");
    $link.classList.add("form-link");
    $link.href = "#";
    $link.innerHTML = "Register";
    $link.addEventListener("click", (event) => {
      event.preventDefault();
      $container.style.display = "none";
      $modalRegister.style.display = "block";
    });
    $p.append($link);

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
      await login(this.state.data.email, this.state.data.password);
      return;
    };
    appendTo($form, _email, _password);
    $form.append($btn, $p, $title);

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