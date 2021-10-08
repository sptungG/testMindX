import BaseComponent from "../components/BaseComponent.js";
import InputWrapper from "../components/InputWrapper.js";
import { appendTo } from "../models/utils.js";
export default class Screen extends BaseComponent {
  // truyền dữ liệu thông qua props
  constructor(props) {
    super(props);
    this.state = {
      data: {
        link: "",
      },
      messageError: {
        link: "",
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
    let $container = document.querySelector("#main");

    let $wrapper = document.createElement("div");
    $wrapper.classList.add("input-wrapper");
    let $title = document.createElement("h1");
    $title.innerHTML = "Link shortener";
    $title.classList.add("title");
    let $wrapper01 = document.createElement("div");
    $wrapper01.classList.add("input-container");
    let _link = new InputWrapper({
      id: "link",
      label: "Link",
      placeholder: "Enter the link to get shorter, Example.com...",
      type: "text",
      error: this.state.messageError.link,
      value: this.state.data.link,
      autocomplete: "on",
      onblur: (event) => {
        this.handleInputChange("link", event.target.value);
      },
    });
    appendTo($wrapper01, _link);
    let $wrapper02 = document.createElement("div");
    $wrapper02.classList.add("short-domain");
    let $title1 = document.createElement("h1");
    $title1.innerHTML = "Short domain";
    $title1.classList.add("title");
    // <div class="short-link">shrtco.de</div>
    let $option1 = document.createElement("div");
    $option1.classList.add("short-link","focus");
    $option1.value = "shrtco.de";
    $option1.innerHTML = "shrtco.de";
    let $option2 = document.createElement("div");
    $option2.classList.add("short-link");
    $option2.value = "9qr.de";
    $option2.innerHTML = "9qr.de";
    let $option3 = document.createElement("div");
    $option3.classList.add("short-link");
    $option3.value = "shiny.link";
    $option3.innerHTML = "shiny.link";
    $wrapper02.append($title1, $option1, $option2, $option3);

    let $button = document.createElement("button");
    $button.classList.add("btn");
    $button.innerHTML = `<i class="fas fa-arrow-right"></i>`;
    let $result = document.createElement("div");
    $result.classList.add("result");
    $result.innerHTML = `<div>Result:</div>`;
    let $answer = document.createElement("div");
    $answer.classList.add("answer");
    $result.append($answer);

    $wrapper01.append($button);
    $wrapper.append($title, $wrapper01, $wrapper02);
    $container.innerHTML = "";
    $container.append($wrapper, $result);
    return $container;
  }
}
