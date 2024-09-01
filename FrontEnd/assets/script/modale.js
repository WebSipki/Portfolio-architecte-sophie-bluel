/**** Les variables ******/
const gallery = document.querySelector("#gallerie");
const filters = document.querySelector(".filters");



// Récupération des éléments depuis le Swager
async function getWorks() { /*(async)pour dire que à cette fonction il doit falloir attendre avant continue à lire mon code */
  const response = await fetch("http://localhost:5678/api/works");
  data = await response.json();
  console.log(data);
  return data;
  }
  getWorks(); 

  //Affichage des works dans le DOM:
async function affichageWorks() {
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    // Création des balises dans le code HTML avec createElement :
    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const figcaptionElement = document.createElement("figcaption");
    const nomElement = document.createElement("h3");
    nomElement.innerText = work.title;

    const categorieElement = document.createElement("p");
   

    // Rattachement à un parent des balise au DOM
    // Récupérer un élément parent existant
    let parentElement1 = document.getElementById("gallerie");

    // Ajouter le nouvel élément au parent
    parentElement1.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
    figcaptionElement.appendChild(nomElement);
    figcaptionElement.appendChild(categorieElement); 
    })
};
// Afficher les éléments
affichageWorks();

// fonction création des works
function createWorks(work) {
  const figureElement = document.createElement("figure");
  const imageElement = document.createElement("img");
  const figcaptionElement = document.createElement("figcaption");
  const nomElement = document.createElement("h3");
  

  imageElement.src = work.imageUrl;
  nomElement.innerText = work.title;
  

  let parentElement1 = document.getElementById("gallerie");

  parentElement1.appendChild(figureElement);
  figureElement.appendChild(imageElement);
  figureElement.appendChild(figcaptionElement);
  figcaptionElement.appendChild(nomElement);
  

}

// *****************Affichage des boutons par catégorie*****************/

// Récupérer le tableau des catégories

async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
//Création des boutons filtres
async function displayCategorysButtons() {
  const categorys = await getCategorys();
  console.log(categorys);
  categorys.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    filters.appendChild(btn);

  })

}
displayCategorysButtons();


// Filtrer au click sur les boutons par catégorie
async function filterCategory() {
  const chantier = await getWorks();
  console.log(chantier);
  const buttons = document.querySelectorAll(".filters button");
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      btnId = e.target.id;
      gallery.innerHTML = "";
      
      if (btnId !=="0") {
        const chantierTriCategory = chantier.filter((work)=>{
          return work.categoryId == btnId; 
          
          });
          chantierTriCategory.forEach((work) => {
            createWorks(work);
            
          });
        } else {
          affichageWorks();
        }
        //console.log(btnId);
    });
  });

}

filterCategory();

//Si l'utilisateur et conecté

const loged = window.sessionStorage.loged;
const admin = document.querySelector(".portfolio-title .js-modale");
const logout = document.querySelector("header nav .logout");
const containerModals = document.querySelector(".containerModals");
const xmark = document.querySelector(".containerModals .fa-xmark");
const chantierModal= document.querySelector(".containerModals .chantierModal");
const icon = document.querySelector("#admin");
const barre= document.querySelector("header div");

if (loged == "true") {
  const span = document.createElement("span")
const modif = document.createElement("i")
const barreedition = document.createElement("p")
modif.classList.add("fa-solid","fa-pen-to-square")
icon.appendChild(modif)
icon.appendChild(span)
barre.appendChild(barreedition)
icon.textContent = "Modifier";
icon.classList.add("fa-solid","fa-pen-to-square");
logout.textContent = "logout";
barreedition.textContent = "Mode edition";
barreedition.classList.add("fa-solid","fa-pen-to-square");
logout.addEventListener("click", () => { //Si l'utilisateur click sur logout , il est déconecté
  window.sessionStorage.loged = false;
});
};

//Affichage de la modale au click sur icon
icon.addEventListener("click", () => {
  //console.log("icon");
  containerModals.style.display="flex" // Change dans CSS l'attribut "display: none" en flex pour affichage la modale

});

//fermeture de la modale au click sur la croix
xmark.addEventListener("click", () => {
  console.log("xmark");
  containerModals.style.display="none" // Change dans CSS l'attribut "display: flex" en none pour fermer la modale
});

//fermeture de la modale au click à coté
containerModals.addEventListener("click", (e) => {
  //console.log(e.target.className);
  if (e.target.className == "containerModals") {
        containerModals.style.display="none";
  }
});
// Affichage du chantier dans la galerie
async function displayChantierModal() {
  chantierModal.innerHTML =""
  const chantier = await getWorks();
  console.log(chantier);
chantier.forEach(work => {
  const figure = document.createElement("figure")
  const img = document.createElement("img")
  const span = document.createElement("span")
  const div = document.createElement("div")
  const trash = document.createElement("i")

  trash.classList.add("fa-solid","fa-trash-can")
  trash.id = work.id
  img.src = work.imageUrl
  div.appendChild(trash)
  figure.appendChild(span)
  span.appendChild(div)
  figure.appendChild(img)
  chantierModal.appendChild(figure)
});
deleteWork()
}
displayChantierModal();


//Suppression d'une image dans la modal
function deleteWork() {
  const trashAll = document.querySelectorAll(".fa-solid.fa-trash-can");
  const userToken = sessionStorage.getItem("userToken");
  console.log(trashAll);
  trashAll.forEach(trash => {
    trash.addEventListener("click",(e)=>{
      const id = trash.id
      const init ={
        method:"DELETE",
        headers:{'content-type':'application/json',
           'Authorization': `Bearer ${userToken}`
        },
      }
      fetch("http://localhost:5678/api/works/" +id,init)
      .then((response)=>{
        if (!response.ok) {
          console.log("le delete n'a pas marché !")
        }
        return response.json()
      })
      .then((data)=>{
        console.log("Le delete a réussi voici la data :",data)
        displayChantierModal()
        displayGetWorks()
        //getWorks()
      })
    })
  });
}


