// Variables Globales pour le login
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".login p");

// fonction qui recupere les users

async function getUsers() {
    try {
        const response = await fetch("http://localhost:5678/api/users/login");
        console.log(response);
        return await response.json();
       
    } catch (error) {
        console.log("erreur users");
    }
}

//fonction de conexion

async function login() {
    const users = await getUsers();
    console.log(users);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;
        console.log(userEmail, userPwd);
       users.forEach((user) => {
            // verifications
            if (user.email == userEmail && user.password == userPwd){ 
              // si les conditions ne sont pas remplies on fait ça 
              window.sessionStorage.loged = true;     
                
            } else {
                // message d'erreur
                email.classList.add("loginEmail__error");
                password.classList.add("loginMdp__error");
                messageErreur.textContent = "Votre email ou votre mot de passe est incorect";
            }
        })
    });
}

login();

