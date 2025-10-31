// Declarer les variables globals
var type = true;
var cards = JSON.parse(localStorage.getItem("cards"));
var id = parseInt(JSON.parse(localStorage.getItem("id")));
var ev;

if(cards == null){id = 0;}

const errorNotification = document.getElementById('errorNotification');
const successNotification = document.getElementById('successNotification');

function displayPositiveNotification(msg){
    successNotification.textContent = msg;
    successNotification.style.display = 'block';
    setTimeout(() => {
        successNotification.style.display = 'none';
    }, 2000);
}
function displayNegativeNotification(){
    errorNotification.style.display = 'block';
    setTimeout(() => {
        errorNotification.style.display = 'none';
    }, 2000);
}

// Mise à jour les totals
function updateTotals(){
    let totalIncome = 0;
    let totalExpense = 0;
    let sold = 0;
    try{
        for(let i=0; i<cards.length; i++){
            totalIncome = parseInt(cards[i].amount)>0 ? totalIncome+parseInt(cards[i].amount) : totalIncome;
        }
    }catch(er){console.log()}
    try{
        for(let i=0; i<cards.length; i++){
            totalExpense = parseInt(cards[i].amount)<0 ? totalExpense+parseInt(cards[i].amount) : totalExpense;
        }
    }catch(er){console.log()}
    sold = totalExpense+totalIncome;

    const totalIncomeHtml = document.getElementById('totalIncome');
    const totalExpenseHtml = document.getElementById('totalExpense');
    const soldHtml = document.getElementById('sold');

    totalIncomeHtml.textContent = totalIncome;
    totalExpenseHtml.textContent = totalExpense;
    soldHtml.textContent = sold;
}
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
    expenseBtn.classList.remove("text-red-600");
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

// split la date from 2025-10-31 to year:2025 | month:10 | day:31
function split(date){
    let year = parseInt(date[0]+date[1]+date[2]+date[3]);
    let month = parseInt(date[5]+date[6]);
    let day = parseInt(date[8]+date[9]);

    return [year, month, day];
}
function validatingData(amount, date, category){
    let splitedDate = split(date);
    let updatedAmount;
    
    // Valider Amount
    if(amount == "" || amount == 0){
        return false;
    }else{
        if(type){
            updatedAmount = amount>0 ? amount : -amount;
        }else{
            updatedAmount = amount<0 ? amount : -amount;
        }
    }
    
    // Valider La Date
    if(date == ""){
        return false;
    }else{
        if(splitedDate[0] > new Date().getFullYear()){
            return false;
        }else{
            if(splitedDate[1] > new Date().getMonth()+1){
                return false;
            }else{
                if(splitedDate[2] > new Date().getDate()){
                    return false;
                }
            }
        }
    }
    // Valider Category
    if(category=="Select a category" || category==""){
        return false;
    }

    return [true, updatedAmount]; 
}

// Afficher une nouvelle carte avec les paramètres donées
function showNewCard(id, amount, date, category, type, description){
    const original = type == "Income" ? document.querySelector('.positive-card') : document.querySelector('.negative-card');
    const container = document.getElementById('cards-container');
    const newCard = original.cloneNode(true);

    newCard.classList.remove('hidden');
    newCard.classList.add("id"+id);
    const spans = newCard.querySelectorAll('span');
    spans[1].textContent = date;
    spans[3].textContent = description;
    spans[5].textContent = category;
    spans[7].textContent = type;
    spans[9].textContent = amount+"$";

    container.appendChild(newCard);
}

function stockData(amount, date, category, type, description){
    const card = type ? {id:id, amount: amount, date: date, category: category, type: "Income", description: description} : {id:id, amount: amount, date: date, category: category, type: "Expense", description: description};
    // Ajouter la carte à notre tableau des autres cartes
    try{
        cards[cards.length] = card;
    }catch(er){
        cards = [card];
    }
    id++;
    // Mise à jour des données dans LocalStorage
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("id", id);
    // Afficher La carte
    showNewCard(card.id, card.amount, card.date, card.category, card.type, card.description);
}
function editData(){
    const carte = ev.target.closest('.card');
    const classes = carte.classList;
    const idToEdit = ev.target.classList.contains('positive') ? parseInt(classes.value.replace('grid grid-cols-1 md:grid-cols-6 border-t border-gray-200 bg-green-200 text-sm card positive-card id', '')) : parseInt(classes.value.replace('grid grid-cols-1 md:grid-cols-6 border-t border-gray-200 bg-red-200 text-sm card negative-card id', ''));

    let inputs = document.getElementsByClassName("form-input");
    let validate = validatingData(inputs[0].value, inputs[1].value, inputs[2].value)[0];
    let updatedAmount = validatingData(inputs[0].value, inputs[1].value, inputs[2].value)[1];

    if(validate){
        console.log(cards);
        for(let i=0; i<cards.length; i++){
            if(cards[i].id === idToEdit){
                cards[i].amount = updatedAmount;
                cards[i].date = inputs[1].value;
                cards[i].category = inputs[2].value;
                cards[i].type = type ? "Income" : "Expense";
                cards[i].description = inputs[3].value;

                carte.remove();
                submitBtn.removeEventListener("click", editData);
                submitBtn.addEventListener("click", getData);
                CloseFormulaire();
                displayPositiveNotification("✅ Card edited successfully");
                showNewCard(cards[i].id, cards[i].amount, cards[i].date, cards[i].category, cards[i].type, cards[i].description);
                localStorage.setItem("cards", JSON.stringify(cards));
                updateTotals();
                break;
            }
        }
        for(let i=0; i<inputs.length; i++){
            inputs[i].value = "";
        }
    }else{
        displayNegativeNotification();
    }
   
}
function getData(){
    // prendre tous les inputs
    let inputs = document.getElementsByClassName("form-input");
    // Valider les données
    let validate = validatingData(inputs[0].value, inputs[1].value, inputs[2].value)[0];
    let updatedAmount = validatingData(inputs[0].value, inputs[1].value, inputs[2].value)[1];

    // Afficher notification à l'utilisatuer selon les données entrées
    if(validate){
        stockData(updatedAmount, inputs[1].value, inputs[2].value, type, inputs[3].value);
        updateTotals();
        displayPositiveNotification("✅ Your details are registred successfully");
    }else{
        displayNegativeNotification();
    }
    
    for(let i=0; i<inputs.length; i++){
        inputs[i].value = "";
    }
}

// Declarer les buttons
const newTransBtn = document.getElementById("addNewTransaction");
const closeFormulaireBtns = document.getElementsByClassName("close-formulaire");
const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");
const submitBtn = document.getElementById("submit");

// Rendre les buttons fonctionelles
newTransBtn.addEventListener("click", displayTransactionFormulaire);
for(let i=0; i<closeFormulaireBtns.length; i++){
    closeFormulaireBtns[i].addEventListener("click", CloseFormulaire);
}
incomeBtn.addEventListener("click", income);
expenseBtn.addEventListener("click", expense);
submitBtn.addEventListener("click", getData);

// Rendre le type à Income par défaut
income();
// Afficher tous les cartes déja stockée quand tu ouvre le siteweb
try{
    for(let i=0; i<cards.length; i++){
        showNewCard(cards[i].id, cards[i].amount, cards[i].date, cards[i].category, cards[i].type, cards[i].description);
    }
}catch(er){
    console.log();
}

updateTotals()


// Supprimer Ou Modifier une carte
document.getElementById("cards-container").addEventListener("click", (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const carte = e.target.closest('.card');
    const classes = carte.classList;
    const confirmation = confirm("Are you sure you want to delete this card ?");
    if(confirmation){
        const idToRemove = e.target.classList.contains('positive') ? parseInt(classes.value.replace('grid grid-cols-1 md:grid-cols-6 border-t border-gray-200 bg-green-200 text-sm card positive-card id', '')) : parseInt(classes.value.replace('grid grid-cols-1 md:grid-cols-6 border-t border-gray-200 bg-red-200 text-sm card negative-card id', ''));
        for(let i=0; i<cards.length; i++){
            if(cards[i].id === idToRemove){
                cards.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cards", JSON.stringify(cards));
        carte.remove();
        displayPositiveNotification("✅ Your card deleted successfully");
        updateTotals();
    }
  }else if(e.target.classList.contains('edit-btn')){
    ev = e;
    submitBtn.removeEventListener("click", getData);
    displayTransactionFormulaire();
    submitBtn.addEventListener("click", editData);
    
  }
});