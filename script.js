const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = form.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  clearUI();
}

function getItemsFromStorage() {
  let itemsFromStorage;
  //if local storage is empty, initialize array
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    //retrieve items from local storage and convert string to json array
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
function onSubmit(e) {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue === '') {
    alert('Please add an item!!');
    return;
  }

  //Update item
  if (isEditMode) {
    const itemToEdit = list.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('.edit-mode');
    itemToEdit.remove();

    isEditMode = false;
  }

  if (checkIfItemExists(inputValue)) {
    alert('Item already exists!!');
    input.value = '';
    return;
  }

  //Add new item to DOM
  addItemToDOM(inputValue);
  //Add new item to local storage
  addItemToStorage(inputValue);

  clearUI();
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  // .includes() return true or false
  return itemsFromStorage.includes(item);
}

function addItemToDOM(newItem) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);
  list.appendChild(li);
}

function addItemToStorage(newItem) {
  let itemsFromStorage = getItemsFromStorage();

  //Add item to Array
  itemsFromStorage.push(newItem);
  //convert to json string and store in local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

const onRemoveItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      const item = e.target.parentElement.parentElement.textContent;
      //Remove item from local storage
      removeItemFromStorage(item);
      clearUI();
    }
  }
  //If clicked anywhere other than 'X' mark
  else {
    setItemToEdit(e.target);
  }
};

function setItemToEdit(item) {
  isEditMode = true;
  list.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update item';
  formBtn.style.backgroundColor = '#228B22';
  input.value = item.textContent;
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i != item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

const onClearItems = (e) => {
  // list.innerHTML = '';
  while (list.firstChild) {
    list.firstChild.remove();
  }

  //Remove items from storage
  localStorage.removeItem('items');
  clearUI();
};

function onFilterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = list.querySelectorAll('li');

  items.forEach((item) => {
    const listItem = item.textContent.toLowerCase();
    if (listItem.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function clearUI() {
  const items = list.querySelectorAll('li');
  if (items.length == 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  input.value = '';
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
}

function init() {
  //Event Listeners
  form.addEventListener('submit', onSubmit);
  list.addEventListener('click', onRemoveItem);
  clearBtn.addEventListener('click', onClearItems);
  itemFilter.addEventListener('input', onFilterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  clearUI();
}

init();
