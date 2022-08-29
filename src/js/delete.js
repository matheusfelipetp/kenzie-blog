import { Api } from "./Api.js";
import { HomePage } from "./homePage.js";

export class DeletePost {
  static openModalDelete() {
    const modalDelete = document.querySelector(".modal-delete");
    const btnDelete = document.querySelectorAll(".btn-delete");
    btnDelete.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        modalDelete.style.display = "flex";
      });
    });

    const btnClose = document.querySelector(".btn-close-post");
    btnClose.addEventListener("click", (event) => {
      event.preventDefault();
      modalDelete.style.display = "none";
    });
  }

  static async deleteUserPost() {
    const btnDelete = document.querySelectorAll(".btn-delete");
    let idPost;

    btnDelete.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const li = event.target.closest("li");
        idPost = li.id;
      });
    });

    const modalDelete = document.querySelector(".modal-delete");
    const btnModalDelete = document.querySelector(".btn-delete-post");
    btnModalDelete.addEventListener("click", async () => {
      await Api.deletPost(idPost);
      HomePage.renderPost();
      modalDelete.style.display = "none";
      window.location.reload();
    });
  }
}
