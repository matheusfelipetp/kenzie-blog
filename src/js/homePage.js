import { Api } from "./Api.js";
import { Edit } from "./edit.js";
import { CreatePost } from "./post.js";
import { DeletePost } from "./delete.js";

export class HomePage {
  static logout() {
    const btnLogout = document.querySelector(".btn-logout");
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("@KenzieBlog:Token");
      localStorage.removeItem("@KenzieBlog:Id");
      window.location.replace("../index.html");
    });
  }

  static async renderPost() {
    const postList = document.querySelector(".main__list");
    postList.innerHTML = "";

    const btnPrevious = document.getElementById("previous");
    const btnNext = document.getElementById("next");
    const pageText = document.querySelector(".page p");
    let page = 1;
    btnNext.addEventListener("click", async (event) => {
      event.preventDefault();
      page++;
      pageText.innerText = page;

      postList.innerHTML = "";
      const posts = await Api.getPost(page);
      posts.data.forEach((elem) => {
        const template = this.createTemplate(elem);
        postList.appendChild(template);
      });

      Edit.openModalEdit();
      Edit.editText();
      DeletePost.openModalDelete();
      DeletePost.deleteUserPost();
    });

    btnPrevious.addEventListener("click", async (event) => {
      event.preventDefault();
      if (page > 1) {
        page--;
        pageText.innerText = page;

        postList.innerHTML = "";
        const posts = await Api.getPost(page);
        posts.data.forEach((elem) => {
          const template = this.createTemplate(elem);
          postList.appendChild(template);
        });
        
        Edit.openModalEdit();
        Edit.editText();
        DeletePost.openModalDelete();
        DeletePost.deleteUserPost();
      }
    });

    const posts = await Api.getPost(page);
    posts.data.forEach((elem) => {
      const template = this.createTemplate(elem);
      postList.appendChild(template);
    });
  }

  static createTemplate(elem) {
    const postCard = document.createElement("li");
    const divUser = document.createElement("div");
    const imgUser = document.createElement("img");
    const nickname = document.createElement("h2");
    const textPost = document.createElement("p");
    const date = document.createElement("span");
    const divBtn = document.createElement("div");
    const btnEdit = document.createElement("button");
    const imgEdit = document.createElement("img");
    const btnDelete = document.createElement("button");
    const imgDelete = document.createElement("img");
    const datePost = new Date(elem.createdAt);

    postCard.id = elem.id;
    postCard.key = elem.id;
    postCard.classList.add("list__post");

    divUser.classList.add("post__user");
    imgUser.src = elem.user.avatarUrl;
    imgUser.alt = "Imagem de Perfil";
    nickname.innerText = `@${elem.user.username}`;
    textPost.innerText = elem.content;

    date.innerText =
      datePost.getDate() +
      1 +
      "/" +
      (datePost.getMonth() + 1) +
      "/" +
      datePost.getFullYear();

    divBtn.classList.add("post__btn");
    btnEdit.classList.add("btn-edit");
    imgEdit.src = "../src/img/edit.svg";
    imgEdit.alt = "Editar";

    btnDelete.classList.add("btn-delete");
    imgDelete.src = "../src/img/delete.svg";
    imgDelete.alt = "Deletar";

    const idUser = +Api.userId;
    if (elem.user.id === idUser) {
      btnEdit.appendChild(imgEdit);
      btnDelete.appendChild(imgDelete);
    }

    divUser.append(imgUser, nickname);
    divBtn.append(btnEdit, btnDelete);
    postCard.append(divUser, textPost, date, divBtn);

    return postCard;
  }

  static async userInfo() {
    const nickUser = await Api.getUser();
    const nickname = document.querySelector(".header__user h2");
    nickname.innerText = `@${nickUser.username}`;

    const imgUser = document.querySelector(".header__user img");
    if (nickUser.avatarUrl !== undefined) {
      imgUser.src = nickUser.avatarUrl;
    }
  }
}

HomePage.logout();
await HomePage.renderPost();
HomePage.userInfo();
CreatePost.sendPost();
Edit.openModalEdit();
Edit.editText();
DeletePost.openModalDelete();
DeletePost.deleteUserPost();
