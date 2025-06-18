
document.addEventListener('DOMContentLoaded', () => {
  const dateBox = document.getElementById('dateBox');
  if (dateBox) {
    const now = new Date();
    const options = { weekday: 'short', month: '2-digit', day: '2-digit' };
    dateBox.textContent = now.toLocaleDateString('ko-KR', options);
  }

  if (document.getElementById('categoryDropdown')) loadCategories();
  if (document.getElementById('categoryList')) renderCategoryList();
});

function addExpense() {
  const entry = document.getElementById('entry').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('categoryDropdown').value;
  const date = new Date().toISOString().split('T')[0];

  const expense = { name: entry, amount, category, date };
  const data = JSON.parse(localStorage.getItem('expenses') || '[]');
  data.push(expense);
  localStorage.setItem('expenses', JSON.stringify(data));

  document.getElementById('entry').value = '';
  document.getElementById('amount').value = '';
  renderExpenses();
}

function renderExpenses() {
  const expenseList = document.getElementById('expenseList');
  if (!expenseList) return;
  const data = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenseList.innerHTML = '';
  data.forEach((exp, index) => {
    const item = document.createElement('div');
    item.textContent = `${exp.date} - ${exp.name}: ₩${exp.amount} [${exp.category}]`;
    expenseList.appendChild(item);
  });
}

function addCategory() {
  const cat = document.getElementById('newCategory').value;
  if (!cat) return;
  const cats = JSON.parse(localStorage.getItem('categories') || '[]');
  cats.push(cat);
  localStorage.setItem('categories', JSON.stringify(cats));
  document.getElementById('newCategory').value = '';
  loadCategories();
  renderCategoryList();
}

function loadCategories() {
  const dropdown = document.getElementById('categoryDropdown');
  const cats = JSON.parse(localStorage.getItem('categories') || '[]');
  dropdown.innerHTML = '';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    dropdown.appendChild(opt);
  });
}

function renderCategoryList() {
  const list = document.getElementById('categoryList');
  const cats = JSON.parse(localStorage.getItem('categories') || '[]');
  list.innerHTML = '';
  cats.forEach((cat, i) => {
    const li = document.createElement('li');
    li.textContent = cat + ' ';
    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.onclick = () => deleteCategory(i);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function deleteCategory(index) {
  let cats = JSON.parse(localStorage.getItem('categories') || '[]');
  const catToDelete = cats[index];
  const otherCats = cats.filter((_, i) => i !== index);
  const fallback = otherCats[0] || '미지정';

  let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenses = expenses.map(e => e.category === catToDelete ? { ...e, category: fallback } : e);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  localStorage.setItem('categories', JSON.stringify(otherCats));
  renderCategoryList();
  loadCategories();
  renderExpenses();
}
