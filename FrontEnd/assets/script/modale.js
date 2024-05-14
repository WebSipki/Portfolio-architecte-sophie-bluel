


/**** Les variables ******/
const gallery = document.querySelector("#gallerie");
const filters = document.querySelector(".filters");


// Récupération des éléments depuis le Swager
async function getWorks() {
const response = await fetch("http://localhost:5678/api/works");
data = await response.json();
console.log(data);
return data;
}
getWorks(); 

// Création des balises avec createElement :
async function affichageWorks() {
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    const figureElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;

    const figcaptionElement = document.createElement("figcaption");
    const nomElement = document.createElement("h3");
    nomElement.innerText = work.title;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = work.category.name;

    // Rattachement à un parent des balise au DOM
    // Récupérer un élément parent existant
    let parentElement1 = document.getElementById("gallerie");

    // Ajouter le nouvel élément au parent
    parentElement1.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
    figcaptionElement.appendChild(nomElement);
    figcaptionElement.appendChild(categorieElement);

    // Afficher les éléments
    
  })
};

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

/*const loged = window.sessionStorage.loged;
const admin = document.querySelector("header nav .admin");*/







