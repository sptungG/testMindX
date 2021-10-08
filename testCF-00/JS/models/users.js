import { getDataFromDoc, getDataFromDocs } from "./utils.js";
import { auth, db } from "../firebase.js";

export async function register(name, email, password) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    await auth.currentUser.updateProfile({
      displayName: name,
    });

    //Luu document voi id la uid cua user
    let docId = auth.currentUser.uid;

    //set = add || update
    await db
      .collection("users")
      .doc(docId)
      .set(
        {
          name: name,
          email: email,
          password: password,
          dishesCreated: [],
          createAt: new Date().toLocaleDateString("vi-VI"),
        },
        { merge: true }
      );
    await auth.signOut();
    let $register = document.querySelector("#modalRegister");
    $register.style.display = "none";
    let $login = document.querySelector("#modalLogin");
    $login.style.display = "block";
    alert("Dang ki thanh cong");
  } catch (error) {
    alert("Dang ky khong thanh cong", error.message);
  }
}

export async function login(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("Sign in successfully");
    let $login = document.querySelector("#modalLogin");
    $login.style.display = "none";
    new Collection().render();
  } catch (error) {
    alert(error.message);
  }
}

export async function getUserById(id) {
  let response = await db.collection("users").doc(id).get();
  return getDataFromDoc(response);
}