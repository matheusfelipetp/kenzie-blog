import { Api } from "./Api.js";

export class Login{
    static loginUserValidation(){
        const buttonLogin = document.querySelector(".form__btn")
        buttonLogin.addEventListener("click", async function(e){
            e.preventDefault();
            const inputLogin = document.querySelectorAll("input")

            const userLogin = {
                email: inputLogin[0].value,
                password: inputLogin[1].value
            }
            const logedUser = await Api.loginUser(userLogin)
            localStorage.setItem("@KenzieBlog:Token", logedUser.token)
            localStorage.setItem("@KenzieBlog:Id", logedUser.userId)
            return logedUser
        })
    }
}

Login.loginUserValidation()



  