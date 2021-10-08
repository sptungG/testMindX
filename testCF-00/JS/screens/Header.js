import BaseComponent from "../components/BaseComponent.js";
import Collection from "./Collection.js";
import { getUserById } from "../models/users.js";
import { auth, db } from "../firebase.js";
export default class Header extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = "";
  }

  render() {
    let $header = document.querySelector("#header");
    let $container = document.createElement("div");
    $container.classList.add("container");
    let $headerTop = document.createElement("div");
    $headerTop.classList.add("header-top");
    let $headerLogo = document.createElement("a");
    $headerLogo.classList.add("header-logo-link");
    $headerLogo.innerHTML = `<img src="./IMG/logo.png" alt="" class="header-logo" />`;
    $headerLogo.addEventListener("click", async (e) => {
      let $dashboard = document.querySelector("#dashboard");
      let $show = document.querySelector("#dishShow");
      $dashboard.innerHTML = "";
      $show.innerHTML = "";
      new Collection().render();
    });

    // Login
    let $headerLoginWrapper = document.createElement("div");
    $headerLoginWrapper.classList.add("header-login-wrapper");
    let $headerLoginBtn = document.createElement("button");
    $headerLoginBtn.classList.add("btn-login", "btn");
    $headerLoginBtn.innerHTML = "Login";
    let $headerRegisterBtn = document.createElement("button");
    $headerRegisterBtn.classList.add("btn-register", "btn");
    $headerRegisterBtn.innerHTML = "Register";
    let $modalLogin = document.querySelector("#modalLogin");
    let $modalRegister = document.querySelector("#modalRegister");
    $headerLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      $modalLogin.style.display = "block";
      $modalRegister.style.display = "none";
    });
    $headerRegisterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      $modalRegister.style.display = "block";
      $modalLogin.style.display = "none";
    });
    $headerLoginWrapper.append($headerLoginBtn, $headerRegisterBtn);

    // Avatar
    let $headerAvt = document.createElement("div");
    $headerAvt.classList.add("header-avatar", "dropdown");
    $headerAvt.style.display = "none";
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let userData = await getUserById(auth.currentUser.uid);
        // console.log(user);
        $headerLoginWrapper.style.display = "none";
        $headerAvt.style.display = "flex";
        let $dropdownSelect = document.createElement("div");
        $dropdownSelect.classList.add("dropdown-select");
        $dropdownSelect.innerHTML = `
        <a class="header-user">
        <img src="https://source.unsplash.com/random/?vietnam,girl" alt="" />
        </a>
        <span class="header-user-name">${userData.name}</span>
        `;
        let $dropdownCaret = document.createElement("i");
        $dropdownCaret.classList.add("fa", "fa-angle-down", "dropdown-caret");
        $dropdownSelect.append($dropdownCaret);
        let $dropdownList = document.createElement("ul");
        $dropdownList.classList.add("dropdown-list");
        function handleSelectDropdown() {
          $dropdownList.classList.remove("show");
          $dropdownCaret.classList.remove("fa-angle-up");
        }

        let $dropdownOption1 = this.dropdownOption("add", "Add", "fas fa-plus-circle", handleSelectDropdown);
        let $dropdownOption2 = this.dropdownOption("logout", "Logout", "fas fa-sign-out-alt", handleSelectDropdown);
        let $modalAdd = document.querySelector("#modalAdd");
        $dropdownOption1.addEventListener("click", (e) => {
          e.preventDefault();
          $modalAdd.style.display = "block";
        });
        $dropdownOption2.addEventListener("click", (e) => {
          auth.signOut();
          window.location.reload();
        });
        $dropdownList.append($dropdownOption1, $dropdownOption2);
        // Avt Listener
        $dropdownSelect.addEventListener("click", async () => {
          $dropdownList.classList.toggle("show");
          $dropdownCaret.classList.toggle("fa-angle-up");
        });
        $headerAvt.append($dropdownSelect, $dropdownList);
        $headerLoginWrapper.style.display = "none";
      } else {
        $headerAvt.style.display = "none";
        $headerLoginWrapper.style.display = "flex";
      }
    });

    $headerTop.append($headerLogo, $headerAvt, $headerLoginWrapper);
    $container.append($headerTop);
    $header.append($container);
    return $header;
  }
  dropdownOption(dataValue, content, icon, handleSelectDropdown) {
    let $dropdownOption = document.createElement("li");
    $dropdownOption.classList.add("dropdown-item");
    $dropdownOption.dataset.value = `${dataValue}`;
    $dropdownOption.innerHTML = `<span>${content}</span><i class="${icon} dropdown-item-icon"></i>`;
    $dropdownOption.addEventListener("click", handleSelectDropdown);
    return $dropdownOption;
  }
}
