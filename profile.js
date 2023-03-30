//* In Profile

// import { User } from "./script.js";

const deleteBtn = document.querySelector(".deleteBtn");
deleteBtn.addEventListener("click", deleteUser);

function deleteUser() {
  console.log(1);
  window.location.href = "./index.html";

  window.localStorage.clear();
}
