document.addEventListener("DOMContentLoaded", function () {
  loadCategories();
  loadExpenses();
});

function loadCategories() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const select = document.getElementById("expense-category");
  if (select) {
    select.innerHTML = "";
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
  }

  const list = document.getElementById("category-list");
  if (list) {
    list.innerHTML = "";
    categories.forEach(cat => {
      const li = document.createElement("li");
      li.textContent = cat;
      const del = document.createElement("button");
      del.textContent = "🗑️";
      del.onclick = () => deleteCategory(cat);
      const edit = document.createElement("button");
      edit.textContent = "✏️";
      edit.onclick = () => editCategory(cat);
      li.append(del, edit);
      list.appendChild(li);
    });
  }
}

function addCategory() {
  const input = document.getElementById("new-category");
  if (!input.value) return;
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  categories.push(input.value);
  localStorage.setItem("categories", JSON.stringify([...new Set(categories)]));
  input.value = "";
  loadCategories();
}

function deleteCategory(name) {
  const data = JSON.parse(localStorage.getItem("expenses") || "[]");
  const categories = JSON.parse(localStorage.getItem("categories") || "[]");
  const remaining = categories.filter(c => c !== name);

  const hasData = data.some(d => d.category === name);
  if (hasData) {
    const target = prompt("병합할 카테고리를 입력하세요:");
    if (remaining.includes(target)) {
      data.forEach(d => {
        if (d.category === name) d.category = target;
      });
      localStorage.setItem("expenses", JSON.stringify(data));
    }
  }
  localStorage.setItem("categories", JSON.stringify(remaining));
  loadCategories();
  loadExpenses();
}

function editCategory(name) {
  const newName = prompt("새 이름:");
  if (!newName) return;
  const categories = JSON.parse(localStorage.getItem("categories") || "[]").map(c => c === name ? newName : c);
  const data = JSON.parse(localStorage.getItem("expenses") || "[]").map(e => {
    if (e.category === name) e.category = newName;
    return e;
  });
  localStorage.setItem("categories", JSON.stringify([...new Set(categories)]));
  localStorage.setItem("expenses", JSON.stringify(data));
  loadCategories();
  loadExpenses();
}

function addExpense() {
  const name = document.getElementById("expense-name").value;
  const amount = document.getElementById("expense-amount").value;
  const category = document.getElementById("expense-category").value;
  const today = new Date().toISOString().split("T")[0];
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  expenses.push({ name, amount, category, date: today });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  loadExpenses();
}

function loadExpenses() {
  const container = document.getElementById("expenses-list");
  if (!container) return;
  const data = JSON.parse(localStorage.getItem("expenses") || "[]");
  container.innerHTML = "";
  const grouped = {};
  data.forEach(d => {
    grouped[d.date] = grouped[d.date] || [];
    grouped[d.date].push(d);
  });
  for (const date in grouped) {
    const group = document.createElement("div");
    group.innerHTML = `<h3>${date}</h3>`;
    grouped[date].forEach((d, idx) => {
      const item = document.createElement("div");
      item.innerHTML = `
        ${d.name} / ${d.category} / ${d.amount}
        <button onclick="editExpense('${date}', ${idx})">✏️</button>
        <button onclick="deleteExpense('${date}', ${idx})">🗑️</button>
      `;
      group.appendChild(item);
    });
    container.appendChild(group);
  }
}

function deleteExpense(date, idx) {
  const data = JSON.parse(localStorage.getItem("expenses") || "[]");
  const filtered = data.filter((_, i) => !(data[i].date === date && i === idx));
  localStorage.setItem("expenses", JSON.stringify(filtered));
  loadExpenses();
}

function editExpense(date, idx) {
  const data = JSON.parse(localStorage.getItem("expenses") || "[]");
  const item = data.find((_, i) => data[i].date === date && i === idx);
  const newName = prompt("새 내역:", item.name);
  const newAmount = prompt("새 금액:", item.amount);
  const newCategory = prompt("새 카테고리:", item.category);
  if (newName && newAmount && newCategory) {
    item.name = newName;
    item.amount = newAmount;
    item.category = newCategory;
    localStorage.setItem("expenses", JSON.stringify(data));
    loadExpenses();
  }
}