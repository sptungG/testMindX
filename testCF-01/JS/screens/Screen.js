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
    $wrapper02.innerHTML = `
    <div class="title">Short domain:</div>
    <div class="short-link">shrtco.de</div>
    <div class="short-link">9qr.de</div>
    <div class="short-link">shiny.link</div>`;

    let $button = document.createElement("button");
    $button.classList.add("btn");
    $button.innerHTML = `<i class="fas fa-arrow-right"></i>`;
    let $result = document.createElement("div");
    $result.classList.add("result");
    $result.innerHTML = `
    <div class="title">Result:</div>
    <div class="answer"></div>`;

    $wrapper01.append($button);
    $wrapper.append($title, $wrapper01, $wrapper02);
    let arr = [...$wrapper02.children];
    arr.shift();
    // console.log(arr);
    arr[0].classList.add("focus");

    arr.forEach((element) => {
      element.onclick = () => {
        arr.forEach((e) => {
          e.classList.remove("focus");
        });
        element.classList.add("focus");
      };
    });
    $button.addEventListener("click", async () => {
      let http = this.state.data.link;
      console.log(http);
      if (http.indexOf("http://") == 0 || http.indexOf("https://") == 0) {
        http = http.split("//")[1];
        // getShortLink
        await axios.get("https://api.shrtco.de/v2/shorten?url=" + http).then((response) => {
          console.log(response);
          $result.innerHTML = `<div class="title">Result:</div><div class="answer">${response.data.result["short_link"]}</div>`;
        });
      } else if (http.indexOf("shrtco.de") == 0 || http.indexOf("9qr.de") == 0 || http.indexOf("shiny.link") == 0) {
        http = http.split("/");
        let tmp = "";
        for (let i = 1; i < http.length; i++) {
          tmp = tmp + http[i];
          if (i != http.length - 1) {
            tmp += "/";
          }
        }
        // getLongLink
        await axios.get("https://api.shrtco.de/v2/info?code=" + tmp).then((response) => {
          console.log(response);
          $result.innerHTML = `<div class="title">Result:</div><div class="answer">${response.data.result["url"]}</div>`;
        });
      }
    });
    $container.innerHTML = "";
    $container.append($wrapper, $result);
    return $container;
  }
}
