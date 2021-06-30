const balance = document.getElementById('balance');
const moneycredit = document.getElementById('money-credit');
const moneydebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

const Transactions = [
    {id: 1, reason: 'salary', amount: 5000},
    {id: 2, reason: 'lunch', amount: -40},
    {id: 3, reason: 'breakfast', amount: -50},
    {id: 4, reason: 'dinner', amount: -20},
];

let transactions = Transactions;

function displaytransaction (transaction) {
    const type = transaction.amount > 0 ? '+' : '-';

    const transactionLI = document.createElement('li');

    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit' );

    transactionLI.innerHTML = `
        ${transaction.reason} <span>${transaction.amount}</span>
        <button class="delete-btn" onclick="deletetransaction(${transaction.id})">X</button>
    `;

    list.appendChild(transactionLI);

}

function createID() {
    return Math.floor(Math.random() * 100000); 
}

function addtransaction (e) {
    e.preventDefault();

    if ( reason.value.trim() === '' || amount.value.trim() === ''){
        alert('please enter reason and amount');
    } else {
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        displaytransaction(transaction);

        updatebalance();
    
        amount.value = '';
    }
}

function deletetransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}

function updatebalance () {
    const transactionamounts = transactions.map (transaction => transaction.amount );
    
    const totalbalance = transactionamounts.reduce( (acc, amount) => (acc += amount),0 );
    
    const creditbalance = transactionamounts
    .filter( amount => amount > 0 )
    .reduce( (acc,amount) => (acc += amount),0);

    const debitbalance = transactionamounts
    .filter( amount => amount < 0 )
    .reduce( (acc,amount) => (acc += amount),0);

    balance.innerText = `${totalbalance}$`;
    moneycredit.innerText = `${creditbalance}$`;
    moneydebit.innerText = `${debitbalance}$`; 

}

form.addEventListener('submit', addtransaction);

function init() {
    list.innerHTML = '';

    transactions.forEach(displaytransaction);

    updatebalance();
};

init();
