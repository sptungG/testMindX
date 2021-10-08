
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
