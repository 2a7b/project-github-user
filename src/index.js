import { getUser } from "../src/services/user.js";
import { getRepositories } from "./services/repositories.js";

import { userObjects } from "./objetcs/user-objects.js";
import { screen } from "./objetcs/screen.js";


document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isKeyEnterPressed = key === 13;

  if (isKeyEnterPressed) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome do usuário do GitHub");
    return true;
  }
};

async function getUserData(userName){
  const userResponse = await getUser(userName);
  
  if (userResponse.message === 'Not Found'){
    screen.renderNotFound()
    return
  }
  
  const userRepositories = await getRepositories(userName);
  userObjects.setInfo(userResponse);
  userObjects.setRepositories(userRepositories);
  screen.renderUser(userObjects);
}


