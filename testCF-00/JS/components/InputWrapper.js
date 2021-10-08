import { capitalize } from "../models/utils.js";
import BaseComponent from "./BaseComponent.js";
export default class InputWrapper extends BaseComponent {
  render() {
    // console.log(this.props);
    let $container = document.createElement("div");
    $container.classList.add("text-field");
    let $label = document.createElement("label");
    $label.setAttribute("for", `${this.props.id}`);
    $label.innerHTML = `${capitalize(this.props.label)}`;
    let $input = document.createElement("input");
    $input.classList.add("form-input");
    $input.id = this.props.id;
    $input.placeholder = this.props.placeholder;
    $input.type = this.props.type;
    $input.value = this.props.value;
    $input.onblur = this.props.onblur;
    $input.autocomplete = this.props.autocomplete ? this.props.autocomplete : "off";

    let $error = document.createElement("div");
    $error.classList.add("form-error");
    $error.innerHTML = this.props.error;

    $container.append($label, $input, $error);
    return $container;
  }
}
