// Fonctionnalité 1-bis :
// Maintenant on va upgrader cette première fonctionnalité : lorsque l'utilisateur va cliquer sur le footer, 
// tu vas afficher en console "clic numéro x" avec x qui commence à 1 et s'incrémente de +1 à chaque clic.

let footer = document.querySelector('footer')
let counter = 0

function clickFooter(){
    counter++
    this.innerHTML = "click"
    this.innerHTML = "clicks :" + counter
}

footer.addEventListener("click", clickFooter)

// Fonctionnalité 2 :
// Tu vas faire que si quelqu'un clique sur ce bouton, l'élément HTML portant l'Id navbarHeader perde sa classe collapse.
// Une fois que ça, ça marche, fait que si on clique à nouveau dessus, la classe collapse soit rajoutée à nouveau à l'élément portant l'Id navbarHeader

let navBar = document.querySelector('#navbarHeader')
let buttonNavBar = document.querySelector(".navbar-toggler")


function changeClassNavBar(){
    
    if (navBar.className == "collapse bg-dark"){
        navBar.className = "bg-dark" 
    }else if (navBar.className == "bg-dark"){
        navBar.className = "collapse bg-dark" 
    }
}

buttonNavBar.addEventListener("click", changeClassNavBar)

// Fonctionnalité 3 :
// À présent, on va faire cela : si on clique sur le bouton "Edit" de la première card, 
// le texte de la card va se mettre en rouge de façon irréversible (sauf si on recharge la page). À toi de jouer !

let buttons = document.querySelectorAll(".btn-group")
let firstCardEditButton = buttons[0].children[1]
let firstCard = document.querySelectorAll('.col-md-4')[0]
let firstCardText = firstCard.querySelector('.card-text')

function redText(){
    firstCardText.style.color = "red"
}
firstCardEditButton.addEventListener("click", redText)

// Fonctionnalité 4 :
// On va faire quelque chose de similaire à la fonctionnalité 3 mais un peu plus complexe : si on clique sur le bouton 
// "Edit" de la deuxième card, le texte de la card va se mettre en vert. Si on re-clique dessus, il redevient comme avant ! Tu l'as compris, il va falloir que tu cherches comment faire un "toggle" sur le style du texte. C'est plus compliqué que sur une classe.

let secondCardEditButton = buttons[1].children[1]
let secondCard = document.querySelectorAll('.col-md-4')[1]
let secondCardText = secondCard.querySelector('.card-text')

function changeColorText(){
    if (secondCardText.style.color != "green"){
        secondCardText.style.color = "green"
    }else {
        secondCardText.style.color = "black"
    }
}
secondCardEditButton.addEventListener("click", changeColorText)

// Fonctionnalité 5 :
// Pour le fun, on va implémenter une fonctionnalité à la sauce ☢"nucléaire"🤯. 
//Et comme elle est un peu dangereuse, on va la cacher… Voici comment elle doit marcher : 
//si un utilisateur double clique sur la navbar en haut, tout Bootstrap disparaît et la page s'affiche
//comme si on avait oublié de mettre le CDN qui la relie au fichier CSS. Si possible, rends cette fonctionnalité réversible 
//(un nouveau double-clic fait tout revenir à la normale).

// Indice : Cherche sur Google comment désactiver le tag <link> avec JavaScript.

let linkBootstrap = document.querySelector("head").children[1]
let header = document.querySelector("header")

function linkDisabled(){
    if ((linkBootstrap.hasAttribute("disabled"))== false){
        linkBootstrap.setAttribute("disabled", "true")
    } else {
        linkBootstrap.removeAttribute("disabled");
    }
}

header.addEventListener("dblclick", linkDisabled)

// Fonctionnalité 6 :
// T'as déjà implémenté 5 fonctionnalités d'interaction ! C'est top ! On va commencer à corser les choses.

// La fonctionnalité sera la suivante : si un utilisateur passe sa souris sur le bouton "View" d'une card 
// (n'importe laquelle), celle-ci va se réduire. Cela veut dire que le texte disparaît, l'image n'apparaîtra 
// qu'à 20 % de sa taille d'origine et les boutons "Edit" / "View" restent visibles. Cette fonction sera réversible : 
// s'il repasse sa souris, la card redevient normale !

let viewButtons = document.querySelectorAll(".btn.btn-sm.btn-success")

function cardChanges(event){
    let card = event.target.closest('.card')
    let image = card.querySelector('.card-img-top')
    image.style.width = '20%'
    card.querySelector('.card-text').style.display = 'none'
    card.isChanged = true; // set the flag to true
}

function cardNormal(event){
    let card = event.target.closest('.card')
    let image = card.querySelector('.card-img-top')
    image.style.width = ''
    card.querySelector('.card-text').style.display = ''
    card.isChanged = false; // set the flag to false
}

function toggleCard(event){
    let card = event.target.closest('.card')
    if (card.isChanged) {
        cardNormal(event) // call cardNormal if the card is already changed
    } else {
        cardChanges(event) // call cardChanges if the card is not changed
    }
}

viewButtons.forEach((button) => {
    button.addEventListener("mouseover", toggleCard)
})



// Fonctionnalité 7 :
// Allez on va rajouter un peu de WTF dans la page : si un utilisateur clique sur le bouton gris ==>, la 
// dernière card (en bas à droite) va passer en premier (en haut à gauche). On va pouvoir faire tourner les cards !

let buttonRigth = document.querySelector(".btn.btn-secondary.my-2")

function turnRigth(){
let cards = document.querySelectorAll('.col-md-4')
let parent = cards[0].parentNode
let lastCard = cards[cards.length - 1]
parent.insertBefore(lastCard, cards[0])
}

buttonRigth.addEventListener("click", turnRigth)

// Fonctionnalité 8 :
// Évidemment tu t'y attendais : on va faire tourner les card dans l'autre sens aussi. Donc si un utilisateur clique 
// sur le bouton bleu <==, la première card devra passer en dernier. À première vue, tu te dis que si tu as réussi à 
// faire la fonctionnalité précédente, celle-ci c'est du gateau... sauf qu'il y a quelques pièges.

let buttonLeft = document.querySelector(".btn.btn-primary.my-2")

function turnLef(){
    buttonLeft.removeAttribute("href")
    let parent = document.querySelector('.album .container .row');
    let firstCard = document.querySelector('.col-md-4:first-child');
    parent.removeChild(firstCard);
    parent.appendChild(firstCard);
}

buttonLeft.addEventListener("click", turnLef)

// Fonctionnalité 9 :
// Bon si t'es arrivé jusque-là, c'est que t'as besoin d'un peu de challenge. Du coup je t'ai concocté une fonctionnalité 
// de derrière les fagots, spécialement conçue pour les moussaillons pas piqués des hannetons (this sentence is brought to 
// you by www.vieilles-expressions.fr). Voici ce qu'elle va devoir faire :

// La fonctionnalité se déclenchera si le logo de la page (JS & Events) est sélectionné et qu'on appuie sur une touche spécifique du clavier.
// Si l'utilisateur presse la touche "a", l'ensemble de la page va être condensé sur 4 colonnes Bootstrap à gauche de l'écran.
// Si l'utilisateur presse la touche "y", l'ensemble de la  page va ê v
//re condensé sur 4 colonnes Bootstrap au milieu de l'écran.
// Si l'utilisateur presse la touche "p", l'ensemble de la page va être condensé sur 4 colonnes Bootstrap à droite de l'écran.
// Si l'utilisateur presse la touche "b", tout redevient normal.

let logo = document.querySelector(".navbar-brand.d-flex.align-items-center")
// Ajoute un écouteur d'événement pour la touche pressée
document.addEventListener("keydown", changeColumns)

function changeColumns(event){
  if (event.key === "a") {

    // Condense la page sur 4 colonnes Bootstrap à gauche de l'écran
    let cards = document.querySelectorAll(".col-md-4")
    card.forEach(function(col) {
      col.classList.remove(".col-md-4")
      col.classList.add("col-4")
    })
}

//   } else if (event.key === "y") {
//     // Condense la page sur 4 colonnes Bootstrap au milieu de l'écran
//          classList.add("col-4", "offset-md-3")
//     })
//   } else if (event.key === "p") {
//
//      classList.add("col-4", "offset-md-6")
//     });
//   } else if (event.key === "b") {
//     // Remet tout à la normale
//         classList.add("col-md-4")
//     })
//   }
 }