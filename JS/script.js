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
function income(){
    expenseBtn.classList.remove("bg-white");
    expenseBtn.classList.remove("text-green-600");
    expenseBtn.classList.remove("transition-all");
    incomeBtn.classList.add("bg-white");
    incomeBtn.classList.add("text-green-600");
    incomeBtn.classList.add("transition-all");
}
function expense(){
    incomeBtn.classList.remove("bg-white");
    incomeBtn.classList.remove("text-green-600");
    incomeBtn.classList.remove("transition-all");
    expenseBtn.classList.add("bg-white");
    expenseBtn.classList.add("text-red-600");
    expenseBtn.classList.add("transition-all");
}

// Declare buttons
const newTransBtn = document.getElementById("addNewTransaction");
const closeFormulaireBtns = document.getElementsByClassName("close-formulaire")
const incomeBtn = document.getElementById("income-btn")
const expenseBtn = document.getElementById("expense-btn")

// make buttons functionel
newTransBtn.addEventListener("click", displayTransactionFormulaire);
for(let i=0; i<closeFormulaireBtns.length; i++){
    closeFormulaireBtns[i].addEventListener("click", CloseFormulaire);
}
incomeBtn.addEventListener("click", income);
expenseBtn.addEventListener("click", expense);