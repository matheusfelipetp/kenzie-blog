export class Api {
  static baseUrl = "https://blog-m2.herokuapp.com";
  static token = localStorage.getItem("@KenzieBlog:Token");
  static userId = localStorage.getItem("@KenzieBlog:Id");

  static async register(user) {
    const response = await fetch(`${this.baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const toast = document.querySelector(".toast");
        const toastStatus = document.querySelector(".toast__header");
        const toastText = document.querySelector(".toast__header h2");
        const toastMsg = document.querySelector(".toast__body p");

        if (res.status === 400 || res.status === 401) {
          toast.style.display = "flex";
          toastStatus.style.backgroundColor = "red";
          toastText.innerText = "Alguma coisa deu errado!";
          toastMsg.innerText = `Verifique os campos do seu formulário.`;

          setTimeout(() => {
            toast.classList.add("hidden-toast");
          }, 3000);

          setTimeout(() => {
            toast.classList.remove("hidden-toast");
            toast.style.display = "none";
          }, 4000);
        } else {
          toast.style.display = "flex";
          toastStatus.style.backgroundColor = "#40f035";
          toastText.innerText = "Usuário cadastrado com sucesso!";
          toastMsg.innerText = "Você será redirecionado para a página de login";

          setTimeout(() => {
            window.location.assign("../index.html");
          }, 3000);
        }
        return res.json();
      })
      .then((res) => res)
      .catch((err) => err);

    return response;
  }

  static async loginUser(user) {
    const response = await fetch(`${this.baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status != 200) {
          const toast = document.querySelector(".toast");
          const toastStatus = document.querySelector(".toast__header");
          const toastText = document.querySelector(".toast__header h2");
          const toastMsg = document.querySelector(".toast__body p");

          toast.style.display = "flex";
          toastStatus.style.backgroundColor = "red";
          toastText.innerText = "Algo deu errado!";
          toastMsg.innerText = "E-mail ou senha inválidos";

          setTimeout(() => {
            toast.classList.add("hidden-toast");
          }, 3000);

          setTimeout(() => {
            toast.classList.remove("hidden-toast");
            toast.style.display = "none";
          }, 4000);
        } else {
          window.location.assign("./pages/homepage.html");
        }

        return res.json();
      })
      .then((res) => res)
      .catch((err) => err);
    return response;
  }

  static async getUser() {
    if (!this.token) {
      window.location.replace("../index.html");
    }

    const response = await fetch(`${this.baseUrl}/users/${this.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    return response;
  }

  static async getPost(page) {
    if (!this.token) {
      window.location.replace("../index.html");
    }

    const response = await fetch(`${this.baseUrl}/posts?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    return response;
  }

  static async createPost(post) {
    if (!this.token) {
      window.location.replace("../index.html");
    }

    const response = await fetch(`${this.baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    return response;
  }

  static async editPost(newPost, idPost) {
    if (!this.token) {
      window.location.replace("../index.html");
    }

    const response = await fetch(`${this.baseUrl}/posts/${idPost}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    return response;
  }

  static async deletPost(id) {
    if (!this.token) {
      window.location.replace("../index.html");
    }

    const response = await fetch(`${this.baseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);

    return response;
  }
}
