class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetLeft = budget;
  }
}

class HTML {
  insertBudget(amount) {
    budgetTotal.innerHTML = amount;
    budgetLeft.innerHTML = amount;
  }

  printMessage(message, className){
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('class1', 'class2', className);
    messageWrapper.appendChild(document.createTextNode(message));

    document.getElementById('adding').insertBefore(messageWrapper, addExpenseForm);

    setTimeout(function(){
      messageWrapper.remove();
    }, 3000);
  }

  addExpenses(name, amount) {
    const list = document.querySelector('#expenses ul');
    const li = document.createElement('li');
    li.className = 'classname'; //TODO later
    li.innerHTML = `
      ${name}
      <span class="className">$${amount}</span>
    `;  //TODO classname
    list.appendChild(li);
    addExpenseForm.reset();
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

    if (userBudget === null || userBudget === '' || userBudget === '0') {
      window.location.reload();
    } else {
      budget = new Budget(userBudget);

      html.insertBudget(budget.budget);
    }
  });

  addExpenseForm.addEventListener('submit', function(e) {
    //e.preventDefault();
    const expenseName = document.getElementById('expense').value;
    const amount = document.getElementById('amount').value;

    if (expenseName === '' || amount === ''){
      html.printMessage('All fields are mandatory', 'error');
    } else {
      html.addExpenses(expenseName, amount);
    }
  });
}
