let form = document.querySelector('.add-stuff');
let cancelButton = document.querySelectorAll('.btn');
let allLists = document.querySelector('.all-lists');
let search = document.querySelector('#search');

form.addEventListener('submit', addItem);
allLists.addEventListener('click', removeItem);
search.addEventListener('keyup', filterItems);

function addItem(e) {
  e.preventDefault();
  let value = document.querySelector('#add').value;
  let createItem = document.createElement('li');
  createItem.className = "item container";
  let createItemText = document.createTextNode(value);
  createItem.appendChild(createItemText);
  let button = document.createElement('button');
  let buttonText = document.createTextNode('X');
  button.className = "btn";
  button.appendChild(buttonText);
  createItem.appendChild(button);
  allLists.appendChild(createItem);
}

function removeItem(e) {
  if(e.target.classList.contains('btn')) {
    if(confirm('Are you sure you wanna remove this item? 😉😉')) {
      let li = e.target.parentElement;
      allLists.removeChild(li);
    }
  }
}

function filterItems(e) { // Replace with Regex some other time...
  let text = e.target.value.toLowerCase();
  let li = allLists.getElementsByTagName('li');
  Array.from(li).forEach(function(item) {
    let itemText = item.firstChild.textContent;
    if (itemText.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}

// Add local storage later
