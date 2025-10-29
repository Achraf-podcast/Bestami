// Afficher le formulaire
function displayTransactionFormulaire(){
    let formulaire = document.getElementsByClassName("formulaire");
    formulaire[0].style.display = "flex";
}
// Fermer le formulaire ou annuler la transaction
function CloseFormulaire(){
    let formulaire = document.getElementsByClassName("formulaire");
    formulaire[0].style.display = "none";
}

// Declare buttons
const newTransBtn = document.getElementById("addNewTransaction");
const closeFormulaireBtns = document.getElementsByClassName("close-formulaire")
const incomeBtn = document.getElementById("income-btn")
const expenseBtn = document.getElementById("expense-btn")

// make buttons functionel
newTransBtn.addEventListener("click", displayTransactionFormulaire);
for(let i=0; i<closeFormulaireBtns.length; i++){
    closeFormulaireBtns[i].addEventListener("click", CloseFormulaire)
}