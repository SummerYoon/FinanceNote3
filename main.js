
function updateDateBox() {
    const dateBox = document.getElementById("dateBox");
    const now = new Date();
    const weekOfMonth = Math.ceil((now.getDate() + 6 - now.getDay()) / 7);
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dateText = `${now.getMonth() + 1}월 ${weekOfMonth}째주 ${dayNames[now.getDay()]}요일, ${now.toISOString().slice(0, 10)}`;
    if (dateBox) dateBox.innerText = dateText;
}

function addExpense() {
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const list = document.getElementById("expensesList");

    if (!desc || !amount || !category) return;

    const item = document.createElement("li");
    item.textContent = `${desc} ${category}`;
    const amountSpan = document.createElement("span");
    amountSpan.textContent = `-${Number(amount).toLocaleString()}`;
    item.appendChild(amountSpan);
    list.appendChild(item);

    // 로컬스토리지 저장
    const newEntry = { name: desc, amount: amount, category: category };
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    stored.push(newEntry);
    localStorage.setItem("expenses", JSON.stringify(stored));
}

function loadExpenses() {
    const list = document.getElementById("expensesList");
    if (!list) return;

    list.innerHTML = ""; // 초기화

    const stored = localStorage.getItem("expenses");
    if (!stored) return;

    const items = JSON.parse(stored);
    items.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `${expense.name} ${expense.category}`;
        const amountSpan = document.createElement("span");
        amountSpan.textContent = `-${Number(expense.amount).toLocaleString()}`;
        li.appendChild(amountSpan);
        list.appendChild(li);
    });
}

function addCategory() {
    const newCat = document.getElementById("newCategory").value;
    if (!newCat) return;

    let cats = JSON.parse(localStorage.getItem("categories") || "[]");
    cats.push(newCat);
    localStorage.setItem("categories", JSON.stringify(cats));
    location.reload();
}

function loadCategories() {
    const cats = JSON.parse(localStorage.getItem("categories") || "[]");
    const select = document.getElementById("category");
    const list = document.getElementById("categoryList");

    if (select) {
        cats.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            select.appendChild(opt);
        });
    }

    if (list) {
        cats.forEach(cat => {
            const li = document.createElement("li");
            li.textContent = cat;
            list.appendChild(li);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateDateBox();
    loadExpenses();
    loadCategories();
});
