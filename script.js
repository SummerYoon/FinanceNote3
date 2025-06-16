
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
  }, 1000);

  updateDate();
  loadCategories();
  loadExpenses();
});

function updateDate() {
  const date = new Date();
  const weekNumber = Math.ceil((date.getDate() + 6 - date.getDay()) / 7);
  const weekdays = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
  const dateString = `${date.getMonth()+1}월 ${weekNumber}째주 ${weekdays[date.getDay()]}, ${date.getFullYear()}.${(date.getMonth()+1).toString().padStart(2,'0')}.${date.getDate().toString().padStart(2,'0')}`;
  document.getElementById('today-date').innerText = dateString;
}

function addExpense() {
  const name = document.getElementById('item-name').value;
  const amount = document.getElementById('item-amount').value;
  const category = document.getElementById('item-category').value;
  if (!name || !amount || !category) return;

  const expense = { name, amount, category };
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  loadExpenses();
}

function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const list = document.getElementById('expenses-list');
  list.innerHTML = '';
  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.innerText = `${exp.name} ${exp.category} -${parseInt(exp.amount).toLocaleString()}`;
    list.appendChild(li);
  });
}

function goToSetting() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('setting').classList.remove('hidden');
}

function addCategory() {
  const newCat = document.getElementById('new-category').value;
  if (!newCat) return;
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  categories.push(newCat);
  localStorage.setItem('categories', JSON.stringify(categories));
  loadCategories();
}

function loadCategories() {
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  const select = document.getElementById('item-category');
  const list = document.getElementById('category-list');
  if (select) select.innerHTML = '';
  list.innerHTML = '';
  categories.forEach(cat => {
    if (select) {
      const option = document.createElement('option');
      option.value = cat;
      option.text = cat;
      select.appendChild(option);
    }
    const li = document.createElement('li');
    li.innerText = cat;
    list.appendChild(li);
  });
}
