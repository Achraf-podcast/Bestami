function displayTransactionFormulaire(){
    let formulaire = document.getElementsByClassName("formulaire");
    formulaire[0].style.display = "flex";
}
function CloseFormulaire(){
    let formulaire = document.getElementsByClassName("formulaire");
    formulaire[0].style.display = "none";
}

const newTransBtn = document.getElementById("addNewTransaction");
const closeFormulaireBtns = document.getElementsByClassName("close-formulaire")


newTransBtn.addEventListener("click", displayTransactionFormulaire);

for(let i=0; i<closeFormulaireBtns.length; i++){
    closeFormulaireBtns[i].addEventListener("click", CloseFormulaire)
}