import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://ground-play-6c584-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const serviceInDB = ref(database, "car service");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value;
  clearInputFiledEl();
  // appendShoppingListEl(inputValue);
  push(serviceInDB, inputValue);
});

onValue(serviceInDB, function(snapshot) {
  clearShoppingListEl();
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    for (let i = 0; i < itemsArray.length; i++) {
      let currentArray = itemsArray[i];
      // let currentItemID = currentArray[0];
      // let currentItemValue = currentArray[1];
      appendShoppingListEl(currentArray);
    }
  } else {
    shoppingListEl.innerHTML = "No items here to show...yet"
  }
 
});

function clearInputFiledEl() {
  inputFieldEl.value = "";
}

function appendShoppingListEl(item) {
  // shoppingListEl.innerHTML+= `<li>${item}</li>`
  let newEl = document.createElement("li");
  let itemID = item[0];
  let itemValue = item[1];
  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);
  newEl.addEventListener("click", function() {
    let exactLocationOfItemsInDB = ref(database, `car service/${itemID}`);
    remove(exactLocationOfItemsInDB);
  });
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}
 






