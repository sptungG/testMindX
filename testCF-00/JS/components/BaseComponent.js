export default class BaseComponent {
  state; // lưu trữ dữ liệu của component (tồn tại trong component), có thể thay đổi giá trị
  props; // dữ liệu truyền từ bên ngoài vào component, chỉ có thể đọc (không thay đổi giá trị)
  /**
   * @type {HTMLElement}
   */
  $element;
  _isFirstRender = true;

  constructor(props) {
    this.props = props;
  }

  /**
   * Hiển thị nội dung của component lên màn hình
   *
   * @returns {HTMLElement}
   */
  render() {}

  // thực thi 1 lần duy nhất, sau khi component render lần đầu tiên
  componentDidMount() {}

  /**
   * Thiết lập lại state của component và render lại component (Khi state thay đổi, component render lại)
   *
   */
  setState(newState) {
    this.state = newState;
    this.refresh();
  }

  // thay đổi lại nội dung của component cho phù hợp với trạng thái hiện tại
  refresh() {
    let $element = this.render();

    if (this._isFirstRender) {
      this.componentDidMount();
      this._isFirstRender = false;
    }

    if (this.$element) {
      this.$element.replaceWith($element);
    }
    this.$element = $element;
    return this.$element;
  }
}
