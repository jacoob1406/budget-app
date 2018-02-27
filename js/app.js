class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = budget;
  }

  substract(amount) {
    return this.budgetLeft -= amount;
  }
}

class HTML {
  insertBudget(amount) {
    budgetTotal.innerHTML = `$${amount}`;
    budgetLeft.innerHTML = `$${amount}`;
  }

  printMessage(message, className) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add(className);
    messageWrapper.appendChild(document.createTextNode(message));

    document.getElementById('adding').insertBefore(messageWrapper, addExpenseForm);

    setTimeout(function() {
      messageWrapper.remove();
    }, 3000);
  }

  addExpenses(name, amount) {
    const list = document.querySelector('#expenses ul');
    const li = document.createElement('li');
    li.className = 'section__col__expenses__list__item';
    li.innerHTML = `
      ${name}
      <span class="section__col__expenses__list__price">$${amount}</span>
    `;
    list.appendChild(li);
    addExpenseForm.reset();
  }

  changeBudget(amount){
    const budgetChanged = budget.substract(amount);
    budgetLeft.innerHTML = `$${budgetChanged}`;

    if ((budget.budget / 4) > budgetChanged) {
      document.getElementById('moneyLeft').style.backgroundColor = '#ff3d3d ';
    } else if ((budget.budget / 2 ) > budgetChanged) {
      document.getElementById('moneyLeft').style.backgroundColor = '#e09706';
    }
  }
}


const addExpenseForm = document.getElementById('add-expense');
const budgetTotal = document.getElementById('total');
const budgetLeft = document.getElementById('left');

let budget, userBudget;

const html = new HTML();

eventListeners();

function eventListeners() {

  document.addEventListener('DOMContentLoaded', function() {
    userBudget = prompt(' Input your weekly budget ');

    if (isNaN(userBudget) || userBudget === null || userBudget === '' || userBudget === '0') {
      window.location.reload();
    } else {
      budget = new Budget(userBudget);

      html.insertBudget(budget.budget);
    }
  });

  addExpenseForm.addEventListener('submit', function(e) {
    const expenseName = document.getElementById('expense').value;
    const amount = document.getElementById('amount').value;

    if (expenseName === '' || amount === '') {
      html.printMessage('All fields are mandatory', 'error');
    } else {
      html.addExpenses(expenseName, amount);
      html.changeBudget(amount);
    }
  });
}
