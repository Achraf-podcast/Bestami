// Declarer les variables
var type = true;

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
    type = true;
    expenseBtn.classList.remove("bg-white");
    expenseBtn.classList.remove("text-green-600");
    expenseBtn.classList.remove("transition-all");
    incomeBtn.classList.add("bg-white");
    incomeBtn.classList.add("text-green-600");
    incomeBtn.classList.add("transition-all");
}
function expense(){
    type = false;
    incomeBtn.classList.remove("bg-white");
    incomeBtn.classList.remove("text-green-600");
    incomeBtn.classList.remove("transition-all");
    expenseBtn.classList.add("bg-white");
    expenseBtn.classList.add("text-red-600");
    expenseBtn.classList.add("transition-all");
}

function getData(){
    const inputs = document.getElementsByClassName("form-input");
    for(let i=0; i<inputs.length; i++){
        inputs[i].value = "";
    }
    
}

// Declarer les buttons
const newTransBtn = document.getElementById("addNewTransaction");
const closeFormulaireBtns = document.getElementsByClassName("close-formulaire")
const incomeBtn = document.getElementById("income-btn")
const expenseBtn = document.getElementById("expense-btn")

// Rendre les buttons fonctionelles
newTransBtn.addEventListener("click", displayTransactionFormulaire);
for(let i=0; i<closeFormulaireBtns.length; i++){
    closeFormulaireBtns[i].addEventListener("click", CloseFormulaire);
}
incomeBtn.addEventListener("click", income);
expenseBtn.addEventListener("click", expense);

// Rendre le type à Income par défaut
income();