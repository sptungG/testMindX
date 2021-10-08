export function getDataFromDoc(doc) {
  let obj = doc.data();
  obj.id = doc.id;
  return obj;
}

// docs: mang chua document tra ve tu cloud firestore
export function getDataFromDocs(docs) {
  let data = [];
  for (let doc of docs) {
    data.push(getDataFromDoc(doc));
  }
  return data;
}

export function validateEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
}

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * append component vào trong element, bổ trợ cho refresh()
 * @param {HTMLElement} $element
 * @param  {Array<BaseComponent>} components
 */
 export function appendTo($element, ...components) {
  for (const component of components) {
    let child = component.refresh();

    $element.appendChild(child);
  }
}

export function modalClose(container) {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches(".modal-close")) {
      container.style.display = "none";
    } else if (event.target.matches(".modal")) {
      container.style.display = "none";
    }
  });
}