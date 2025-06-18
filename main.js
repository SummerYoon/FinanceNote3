
function updateDateBox() {
    const dateBox = document.getElementById("dateBox");
    const now = new Date();
    const weekOfMonth = Math.ceil((now.getDate() + 6 - now.getDay()) / 7);
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dateText = `${now.getMonth() + 1}월 ${weekOfMonth}째주 ${dayNames[now.getDay()]}요일, ${now.toISOString().slice(0, 10)}`;
    if (dateBox) dateBox.innerText = dateText;
}

function getTodayDate() {
    const now = new Date();
    return now.toISOString().slice(0, 10);
}

function addExpense() {
    const desc = document.getElementById("desc").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    if (!desc || !amount || !category) return;

    const newEntry = {
        name: desc,
        amount: amount,
        category: category,
        date: getTodayDate()
    };

    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    stored.push(newEntry);
    localStorage.setItem("expenses", JSON.stringify(stored));

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    renderExpenses();
}

function deleteExpense(index) {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    stored.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(stored));
    renderExpenses();
}

function editExpense(index) {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    const item = stored[index];
    document.getElementById("desc").value = item.name;
    document.getElementById("amount").value = item.amount;
    document.getElementById("category").value = item.category;
    deleteExpense(index);
}

function renderExpenses() {
    const container = document.getElementById("expensesList");
    if (!container) return;

    container.innerHTML = "";
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");

    const grouped = {};
    stored.forEach((item, index) => {
        if (!grouped[item.date]) grouped[item.date] = [];
        grouped[item.date].push({ ...item, index });
    });

    for (let date in grouped) {
        const dateLabel = document.createElement("small");
        dateLabel.textContent = date;
        container.appendChild(dateLabel);

        grouped[date].forEach(item => {
            const entry = document.createElement("div");
            entry.className = "expense-entry";
            entry.innerHTML = `
                ${item.name} | ${item.category} | -${Number(item.amount).toLocaleString()}
                <span>
                    <button onclick="editExpense(${item.index})">✏️</button>
                    <button onclick="deleteExpense(${item.index})">🗑️</button>
                </span>
            `;
            container.appendChild(entry);
        });
    }
}

function addCategory() {
    const newCat = document.getElementById("newCategory").value;
    if (!newCat) return;
    let cats = JSON.parse(localStorage.getItem("categories") || "[]");
    if (!cats.includes(newCat)) {
        cats.push(newCat);
        localStorage.setItem("categories", JSON.stringify(cats));
        location.reload();
    }
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
    renderExpenses();
    loadCategories();
});
