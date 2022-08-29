import { Api } from "./Api.js";
import { HomePage } from "./homePage.js";

export class Edit {
  static openModalEdit() {
    const modalEdit = document.querySelector(".modal-edit");
    const btnEdit = document.querySelectorAll(".btn-edit");
    btnEdit.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        modalEdit.style.display = "flex";
      });

      const btnClose = document.querySelector(".btn-close");
      btnClose.addEventListener("click", (event) => {
        event.preventDefault();
        modalEdit.style.display = "none";
      });
    });
  }

  static async editText() {
    const modalEdit = document.querySelector(".modal-edit");
    const textarea = document.getElementById("post-edit");
    const btnSend = document.querySelector(".modal__btn-edit");
    const btnEdit = document.querySelectorAll(".btn-edit");
    let idPost;
    let newPost = {};

    btnEdit.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        idPost = li.id;
        textarea.value = li.children[1].innerText;
      });
    });

    textarea.addEventListener("change", () => {
      newPost = {
        content: textarea.value,
      };
    });

    
    btnSend.addEventListener("click", async (event) => {
      event.preventDefault();
      await Api.editPost(newPost, idPost);
      modalEdit.style.display = "none";
      HomePage.renderPost();
      window.location.reload();
    });
  }
}
