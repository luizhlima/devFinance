const modalOverlay = document.querySelector('.modal-overlay');
const buttonCancel = document.querySelector('.button.cancel');
const newTransition = document.querySelector('.button.new');

const Modal = {
    open() {
        modalOverlay.classList.add('active');
    },
    close(e){
        e.preventDefault();
        modalOverlay.classList.remove('active');
    },
}

newTransition.addEventListener('click', Modal.open);
buttonCancel.addEventListener('click', Modal.close);

const transactions = [
    {
        id: 1,
        description: 'Salário',
        amount: 250000,
        date: '23/02/2021'
    },
    {
        id: 2,
        description: 'Energia',
        amount: -12000,
        date: '23/02/2021'
    },
    {
        id: 3,
        description: 'Agua',
        amount: -4000,
        date: '23/02/2021'
    },
    {
        id: 4,
        description: 'Internet',
        amount: -18000,
        date: '23/02/2021'
    },
    {
        id: 5,
        description: 'App',
        amount: 58000,
        date: '23/02/2021'
    }
]

const Transaction = {
    //Somar todas as entradas
    incomes() {
        let income = 0;
        transactions.forEach(transaction => {
            if (transaction.amount > 0){
                income += transaction.amount;
            }
        })
        return income;
    },
    //Somar todas as saídas
    expenses(){
        let expense = 0;
        transactions.forEach(transaction => {
            if (transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        return expense;

    },
    //Retornar o resultado de Incomes() - Expenses()
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        const tbody = document.querySelector('#tbody')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        tbody.appendChild(tr);
    },

    innerHTMLTransaction(transaction){
        const cssClass = transaction.amount > 0 ? "income" : "expense";
        const amount = Utils.formatCurrency(transaction.amount);


        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${cssClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Imagem para remover transação"></td>
            `
        return html;
    },
    updateBalance(){
        document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

const Utils = {
    formatCurrency (value) {
        const signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }

}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction);
})

DOM.updateBalance();
