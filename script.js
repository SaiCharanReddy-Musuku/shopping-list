const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');

function onSubmit(e) {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue === '') {
    alert('Please add an item!!');
    return;
  }
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(inputValue));
  const button = createButton('remove-item btn-link text-red');
  const icon = createIcon('fa-solid fa-xmark');

  button.appendChild(icon);
  li.appendChild(button);
  list.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//Event Listeners
form.addEventListener('submit', onSubmit);
