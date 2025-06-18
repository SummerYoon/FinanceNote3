
function getTodayDate() {
  const today = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return today.toLocaleDateString('ko-KR', options);
}
function loadCategories() {
  const categorySelect = document.getElementById('category');
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  categorySelect.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}
function addExpense() {
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = new Date().toISOString().split('T')[0];
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  expenses.push({ name, amount, category, date });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}
function renderExpenses() {
  const list = document.getElementById('expensesList');
  list.innerHTML = '';
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const grouped = {};
  expenses.forEach(e => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });
  for (const date in grouped) {
    const section = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = date;
    section.appendChild(title);
    grouped[date].forEach(e => {
      const item = document.createElement('div');
      item.textContent = `${e.name} / ${e.category} / ${e.amount}원`;
      section.appendChild(item);
    });
    list.appendChild(section);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('dateBox').textContent = getTodayDate();
  loadCategories();
  renderExpenses();
});
