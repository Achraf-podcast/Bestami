// Declarer les variables
var type = true;
var cards = JSON.parse(localStorage.getItem("cards"));
const errorNotification = document.getElementById('errorNotification');
const successNotification = document.getElementById('successNotification');

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
function showNewCard(amount, date, category, type, description){
    const original = type == "Income" ? document.querySelector('.positive-card') : document.querySelector('.negative-card');
    const container = document.getElementById('cards-container');
    const newCard = original.cloneNode(true);

    newCard.classList.remove('hidden')
    const spans = newCard.querySelectorAll('span');
    spans[1].textContent = date;
    spans[3].textContent = description;
    spans[5].textContent = category;
    spans[7].textContent = type;
    spans[9].textContent = amount;

    container.appendChild(newCard);
}

function stockData(amount, date, category, type, description){
    const card = type ? {amount: "+"+amount+"$", date: date, category: category, type: "Income", description: description} : {amount: amount+"$", date: date, category: category, type: "Expense", description: description};
    // Ajouter la carte à notre tableau des autres cartes
    cards[cards.length] = card;
    // Mise à jour des données dans LocalStorage
    localStorage.setItem("cards", JSON.stringify(cards));
    // Afficher La carte
    showNewCard(card.amount, card.date, card.category, card.type, card.description);
}
function getData(){
    // prendre tous les inputs
    let inputs = document.getElementsByClassName("form-input");
    // Valider les données
    let validate = validatingData(inputs[0].value, inputs[1].value, inputs[2].value)[0];
    let updatedAmount = validatingData(inputs[0].value, inputs[1].value, inputs[2].value)[1];

    // Afficher notification à l'utilisatuer selon les données entrées
    if(validate){
        stockData(updatedAmount, inputs[1].value, inputs[2].value, type, inputs[3].value)
        successNotification.style.display = 'block';
        setTimeout(() => {
          successNotification.style.display = 'none';
        }, 2000);
    }else{
        errorNotification.style.display = 'block';
        setTimeout(() => {
          errorNotification.style.display = 'none';
        }, 2000);
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
for(let i=0; i<cards.length; i++){
    showNewCard(cards[i].amount, cards[i].date, cards[i].category, cards[i].type, cards[i].description);
}