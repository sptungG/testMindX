// Xây dựng Web app chia sẻ công thức nấu ăn? 
// Trang web có những chức năng như đăng nhập, đăng kí, công thức hiển thị người đóng góp (chính là tài khoản đăng nhập) và các thành phần cùng cách chế biến.
//  Cho phép người dùng thêm công thức các món ăn.

import RegisterForm from "./screens/RegisterForm.js";
import LoginForm from "./screens/LoginForm.js";
import Collection from "./screens/Collection.js";
import Header from "./screens/Header.js";
import AddForm from "./screens/AddForm.js";

let header = new Header().render();
let register = new RegisterForm().render();
let login = new LoginForm().render();
let collection = new Collection().render();
let addForm = new AddForm().render();