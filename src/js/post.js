import { Api } from "./Api.js";
import { HomePage } from "./homePage.js";

export class CreatePost {
  static sendPost() {
    const textarea = document.querySelector("#post-user");
    const buttonSubmitPost = document.querySelector(".btn-post");

    buttonSubmitPost.addEventListener("click", async function (e) {
      e.preventDefault();
      const post = {
        content: textarea.value,
      };
      await Api.createPost(post);
      HomePage.renderPost();
      textarea.value = "";
      window.location.reload();
    });
  }
}
