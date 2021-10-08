// Xây dựng website rút gọn link từ API cho sẵn (đọc tài liệu sau để lấy API: https://shrtco.de/docs/)
// Các chức năng như trong video minh hoạ https://youtu.be/hhdiS8TGiPQ


import Screen from "./screens/Screen.js";

let login = new Screen().render();

window.addEventListener("load", e => {
  let $shortLink = document.querySelectorAll(".short-link");
  let $button = document.querySelector("button");
  let $input = document.querySelector("input");
  let $answer = document.querySelector(".answer");
  $shortLink[0].classList.add("focus");
  
  $shortLink.forEach((value) => {
      value.onclick = () => {
          $shortLink.forEach((i) => {
              i.classList.remove("focus");
          });
          value.classList.add("focus");
      };
  });
  $button.onclick = () => {
      let http = $input.value;
      if (http.indexOf("http://") == 0 || http.indexOf("https://") == 0) {
          http = http.split("//")[1];
          getShortLink(http);
      } else if (
          http.indexOf("shrtco.de") == 0 ||
          http.indexOf("9qr.de") == 0 ||
          http.indexOf("shiny.link") == 0
      ) {
          http = http.split("/");
          let tmp = "";
          for (let i = 1; i < http.length; i++) {
              tmp = tmp + http[i];
              if (i != http.length - 1) {
                  tmp += "/";
              }
          }
          getLongLink(tmp);
      }
  };
  async function getShortLink(http) {
    await axios
        .get("https://api.shrtco.de/v2/shorten?url=" + http)
        .then((response) => {
            console.log(response);
            $answer.innerHTML = response.data.result["short_link"];
            $input.value =""
        });
    }
    async function getLongLink(http) {
    await axios
        .get("https://api.shrtco.de/v2/info?code=" + http)
        .then((response) => {
            console.log(response);
            $answer.innerHTML = response.data.result["url"];
            $input.value=""
        });
    }

})
