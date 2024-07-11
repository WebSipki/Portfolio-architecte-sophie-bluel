


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
    // categorieElement.innerText = work.category.name;

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
  const categorieElement = document.createElement("p");

  imageElement.src = work.imageUrl;
  nomElement.innerText = work.title;
  categorieElement.innerText = work.category.name;

  let parentElement1 = document.getElementById("gallerie");

  parentElement1.appendChild(figureElement);
  figureElement.appendChild(imageElement);
  figureElement.appendChild(figcaptionElement);
  figcaptionElement.appendChild(nomElement);
  figcaptionElement.appendChild(categorieElement);

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
  console.log("icon");
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

//affichage du chantier dans la galerie
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
displayChantierModal()



//Suppression d'une image dans la modal
function deleteWork() {
  const trashAll = document.querySelectorAll(".fa-solid.fa-trash-can")
  console.log(trashAll);
  trashAll.forEach(trash => {
    button.addEventListener("click",(e)=>{
      const id = trash.id
      const init ={
        method:"DELETE",
        headers:{'content-type':'application/json'},
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



//Faire apparaitre la deuxime modale une fois le html fini
const btnAddModal = document.querySelector(".modalChantier button")
const modalAddPhoto = document.querySelector(".modalAddPhoto")
const modalChantier = document.querySelector(".modalChantier")
const arrowLeft = document.querySelector(".fa-arrow-left")
const markAdd = document.querySelector(".modalAddPhoto .fa-xmark")


function displayAddModal() {
btnAddModal.addEventListener("click",()=>{ //Ajouter une photo et Faire apparaitre le modale Ajout Photo
  modalAddPhoto.style.display = "flex"
  modalChantier.style.display = "none"
})
arrowLeft.addEventListener("click",()=>{ //Revenir en arrière sur le modale Galerie photo
  modalAddPhoto.style.display = "none"
  modalChantier.style.display = "flex"
})
markAdd.addEventListener("click",()=>{ //Faire disparaitre le modale
  containerModals.style.display = "none"
})
}
displayAddModal()

//Faire la previsualisation de l'image
const previewImg = document.querySelector(".containaeFile img")
const inputFile = document.querySelector(".containaeFile input")
const labelFile = document.querySelector(".containaeFile label")
const inconFile = document.querySelector(".containaeFile .fa-image")
const pFile = document.querySelector(".containaeFile p")

// ajouter une image et prévisualiser l'image
inputFile.addEventListener("change", ()=>{
  const file = inputFile.files[0]
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e){
      previewImg.src = e.target.result
      previewImg.style.display = "flex"
      labelFile.style.display = "none"
      inconFile.style.display = "none"
      pFile.style.display = "none"
    }

    reader.readAsDataURL(file);
  }

})

 //Création d'une liste de catégories dans l'input Select
async function displayCategoryModal (){
  const select = document.querySelector(".modalAddPhoto select")
  const categorys = await getCategorys()
  categorys.forEach(category => {
    const option = document.createElement("option")
    option.value = category.id
    option.textContent = category.name
    select.appendChild(option)
  })
}
displayCategoryModal ()

// Faire un POST pour ajouter une photo
const form = document.querySelector(".modalAddPhoto form")
const title = document.querySelector(".modalAddPhoto #title")
const category = document.querySelector(".modalAddPhoto #categorie")

form.addEventListener("submit",async (e)=>{
  e.preventDefault() // Annule le comprotement par défaut
  const formData = {
    title:title.value,
    categoryId:category.value,
    imageUrl:previewImg.src,
    category:{
      id:category.value,
      name: category.option[category.selectedIndex].textContent,
    },
  };
  fetch("http://localhost:5678/api/works",{
   method:"POST",
   body:JSON.stringify(formData),
   headers:{
    "content-Type":"application/json"
   }
  })
   .then(response => response.json())
   .then(data =>{
    console.log(data);
    console.log("voici le photo ajouté",data);
    displayChantierModal()
    displayModalAddPhoto()
  })
  .catch(error => console.log("voici l'erreur",error))
  
})

//Fonction qui vérifie si tout les inputs sont remplis
function verifFormCompleted() {
  const buttonValidForm = document.querySelector(".modalAddPhoto button")
  form.addEventListener("input",()=>{
    if (!title.value =="" && !category.value =="" && !inputFile.src ==""){
      buttonValidForm.classList.add("valid")
    }
    else{
      buttonValidForm.classList.remove("valid")
      buttonValidForm.disabled = true
    }
  })
}
verifFormCompleted()