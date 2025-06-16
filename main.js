
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

    localStorage.setItem("expenses", list.innerHTML);
}

function loadExpenses() {
    const list = document.getElementById("expensesList");
    if (list) list.innerHTML = localStorage.getItem("expenses") || "";
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
