import { Api } from "./Api.js";

export class Register {
  static registerUser() {
    const btnRegister = document.querySelector(".form__btn");
    btnRegister.addEventListener("click", async (event) => {
      event.preventDefault();
      const input = document.querySelectorAll("input");

      const user = {
        username: input[0].value,
        email: input[1].value,
        avatarUrl: input[2].value,
        password: input[3].value,
      };

      const newUser = await Api.register(user);
      return newUser;
    });
  }

  static goLogin() {
    const btn = document.querySelector(".mesage-login span");
    btn.addEventListener("click", () => {
      window.location.assign("../index.html");
    });
  }
}

Register.registerUser();
Register.goLogin();
