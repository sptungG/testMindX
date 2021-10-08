import { getDataFromDoc, getDataFromDocs } from "./utils.js";
import { auth, db } from "../firebase.js";

export async function getAllDishes() {
  let response = await db.collection("dishes").get();
  let data = getDataFromDocs(response.docs);
  return data;
}

export async function getDishById(id) {
  let response = await db.collection("dishes").doc(id).get();
  return getDataFromDoc(response);
}
