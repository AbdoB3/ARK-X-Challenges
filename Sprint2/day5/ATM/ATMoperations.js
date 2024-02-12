const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const eventEmitter = new EventEmitter();

const ATM_EVENTS = {
    deposit: 'deposit',
    withdraw: 'withdraw'
};



let myData = [];
console.log("****** Bienvenue ******");
const choises = () => ['1 : Créer un compte', '2 : Connexion', '3 : Quitter'].forEach((x => console.log(x)))

const trait = () => {
    choises()
    rl.question('Veuillez Choisir une Action : ', (choise) => {
        switch (choise) {
            case '1':
                console.log("****** Création du Compte ******");
                createAcc()
                break;
            case '2':
                console.log("****** Connexion ******");
                login()
                break;
            case '3':
                rl.close();
                console.log("****** Au Revoir ******");
                break;
            default:
                console.log("****** Veuillez Choisir entre (1-2-3) ******");
                trait();
        }
    });
}

let id = 1001;
let balance = 0;
let transactions = [];
let currentAccount;

const createAcc = () => {
    try {
        let formatedPin = Math.random() * 9000
        let pin = Math.floor(formatedPin);
        rl.question(` Veuillez Entrer votre Nom et Prénom : `, (nom) => {
            if (nom.trim() === "") {
                console.log(" Veuillez entrer un nom valide.");
                createAcc();
                return;
            }
            var accountID = "ACC" + id;
            myData.push({ accountID, nom, pin, balance, transactions })
            fs.writeFileSync('users.json', JSON.stringify(myData,null,2));
            id++;
            console.log("Compte créé avec succès :");
            console.log(" ** Votre identifiant est :", accountID);
            console.log(" ** Votre code PIN est:", pin);
            trait()
        })
    } catch (err) {
        console.log('Erreur bro: ', err)
    }
}

const login = () => {
    rl.question(`Entrez votre AccountID: `, (accountid) => {
        rl.question('Entrez votre code PIN:',(Pin) => {
            try {
                const data = JSON.parse(fs.readFileSync('users.json', 'utf8'))
                const account = data.find(account => account.accountID === accountid);

                if (account && Number(account.pin) === Number(Pin)) {  
                    console.log("****** Connexion réussie ! ******");
                    currentAccount = account; // Définir le compte actuel
                    OperationMenu();
                } else {
                    console.log("Identifiant invalide ou code PIN incorrect. Veuillez réessayer.");
                    trait();
                }
            } catch (error) {
                console.error("Erreur lors de la lecture du fichier json:", error);
                trait();
            }
        });
    })
}


function OperationMenu() {
    console.log("****** Bienvenue dans le menu des opérations : ******");
    console.log("1. Vérifier le solde.");
    console.log("2. Déposer de l'argent.");
    console.log("3. Retirer de l'argent.");
    console.log("4. Voir l'historique des transactions?");
    console.log("5. Quitter.");

    rl.question("Veuillez sélectionner une option : ", (choix) => {
        switch (choix) {
            case '1':
                console.log(" ** Votre solde actuel est : ", currentAccount.balance , "DH");
                OperationMenu();
                break;
            case '2':
                deposit();
                break;
            case '3':
                withdraw();
                break;
            case '4':
                viewTransactions();
                break;
            case '5':
                console.log("Merci d'avoir utilisé nos services. À bientôt!");
                rl.close();
                break;
            default:
                console.log("Option non valide. Veuillez sélectionner une option valide.");
                OperationMenu();
                break;
        }
    });
}

function deposit() {
    rl.question("Entrez le montant à déposer: ", (amount) => {
        amount = parseFloat(amount);
        if (isNaN(amount) || amount <= 0) {
            console.log("Montant invalide.");
            deposit();
        } else {
            currentAccount.balance += amount;
            currentAccount.transactions.push({ type: "Dépôt", amount: amount, date: new Date() });
            updateData(currentAccount);
            eventEmitter.emit(ATM_EVENTS.deposit, amount);
            OperationMenu();
        }
    });
}

let date = new Date();
const max_per_tran=2000;
const max_per_day =4000;
var total_withraw=0;
function withdraw() {
    rl.question("Entrez le montant à retirer: ", (amount) => {
        amount = parseFloat(amount);
        if (isNaN(amount) || amount <= 0) {
            console.log("Montant invalide.");
            withdraw();
        
        }else if(amount>max_per_tran){
            console.log(`Le montant maximal de retrait par transaction est de ${max_per_tran}Dh. Veuillez saisir un montant plus petit.`);
            withdraw();

        }else if(total_withraw+amount > max_per_day){
            console.log(`Le montant maximal de retrait par jour est de ${max_per_day}. Vous avez atteint la limite quotidienne.`);
            OperationMenu();

        }else if (amount > currentAccount.balance) {
            console.log("Solde insuffisant. Vous ne pouvez pas retirer plus que votre solde actuel.");
            withdraw();
        } else {
            total_withraw=total_withraw+amount;
            currentAccount.balance -= amount;
            currentAccount.transactions.push({ type: "Retrait", amount: amount, date: date });
            updateData(currentAccount);
            eventEmitter.emit(ATM_EVENTS.withdraw, amount);
            OperationMenu();
            }
    });
}

function viewTransactions() {
    console.log(" ** Historique des transactions:");
    currentAccount.transactions.forEach(transaction => {
        console.log(`${transaction.type}: ${transaction.amount}Dh - Date: ${transaction.date}`);
    });
    OperationMenu();
}

function updateData(account) {
    const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    const index = data.findIndex(acc => acc.accountID === account.accountID);
        data[index] = account;
        fs.writeFileSync('users.json', JSON.stringify(data));
    
}

eventEmitter.on(ATM_EVENTS.deposit, (amount) => {
    console.log(`** Vous avez déposé ${amount}Dh avec succès.`);
});

eventEmitter.on(ATM_EVENTS.withdraw, (amount) => {
    console.log(`** Vous avez retiré ${amount}Dh avec succès.`);
});

trait();