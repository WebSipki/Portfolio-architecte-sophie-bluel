// Variables Globales pour le login
const email = document.querySelector("#login__form #email");
const password = document.querySelector("#login__form #password");
const form = document.querySelector("#login__form");
const messageErreur = document.querySelector(".login p");

// Fonction de connexion
async function login(event) {
    event.preventDefault();
    const userEmail = email.value;
    const userPwd = password.value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: userEmail, password: userPwd })
        });

        if (response.ok) {
            const data = await response.json();
            window.sessionStorage.setItem("loged", true);
            messageErreur.textContent = "Connexion réussie";
            window.location.href = 'index.html'; // Redirigez vers le tableau de bord après la connexion
        } else {
            const errorData = await response.json();
            email.classList.add("loginEmail__error");
            password.classList.add("loginMdp__error");
            messageErreur.textContent = errorData.message || "Erreur de connexion";
        }
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion", error);
        messageErreur.textContent = "Erreur de connexion";
    }
}

// Ajouter l'écouteur d'événements de soumission du formulaire
form.addEventListener("submit", login);
