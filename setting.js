
function addCategory() {
  const input = document.getElementById('newCategory');
  const newCat = input.value.trim();
  if (!newCat) return;
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  categories.push(newCat);
  localStorage.setItem('categories', JSON.stringify(categories));
  input.value = '';
  renderCategoryList();
}
function renderCategoryList() {
  const list = document.getElementById('categoryList');
  list.innerHTML = '';
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  categories.forEach((cat, index) => {
    const li = document.createElement('li');
    li.textContent = cat;
    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.onclick = () => {
      if (confirm(`${cat} 카테고리를 삭제할까요?`)) {
        const newList = categories.filter((_, i) => i !== index);
        localStorage.setItem('categories', JSON.stringify(newList));
        renderCategoryList();
      }
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
document.addEventListener('DOMContentLoaded', renderCategoryList);
