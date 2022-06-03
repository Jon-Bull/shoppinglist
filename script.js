//*******Variables********//

var button = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var theLIs = document.getElementsByTagName("li");
var removeButton = document.getElementsByClassName("remove");
var quantity = document.querySelector(".quantity");
var totalQuantity = document.querySelector(".totalQuantity");



//*******Functions********//

// For å forhindre at man kan lage et item uten innhold
function inputLength() {
    return input.value.length;
}

// Lage nytt item i listen
function createListElement() {
	var li = document.createElement("li");
    console.log("li created");
	var newRemoveButton = document.createElement("button");
    console.log("new remove button created");
	newRemoveButton.className = "remove";
    console.log("new remove button assigned class 'remove'");
	newRemoveButton.innerText = "Remove";
    console.log("new remove button text added");
	li.appendChild(document.createTextNode(input.value));
    console.log("text appended from input and added to li-element");
    
    var itemQuantity = document.createElement("span");
    itemQuantity.className = "itemQuantity";
    itemQuantity.innerText = ` ${quantity.value}`; // Template literal - Google it
    
    li.appendChild(itemQuantity);
    console.log("quantity appended from input and added to li element");
    quantity.value = "";
	ul.appendChild(li);
    console.log("li-element added to ul-list");
	ul.appendChild(newRemoveButton);
    console.log("new remove button added to ul-list");
	input.value = "";
    console.log("input-field cleared");
	removeListener();
    console.log("listener removed from 'legg til'-knapp");
	toggleListener();	
    console.log("listener 'legg til' toggled");
    sumQuantity();
}


// Kontrollere at det input-feltet ikke er tomt
function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
        console.log("control that the input-field contains text before making an element");
	}
}

// Kontrollere at input-felt ikke er tomt og lytte etter både tastetrykk 'enter'
function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
        console.log("control that the input-field contains text before making an element and make an element when enter is pressed");
	}
}

// Kontrollere at det er flere enn 0 elementer i listen. Opprettet lyttefunksjon på listeelementene 
function toggleListener(){
	for (let i = 0; i < theLIs.length; i++) {
		const element = theLIs[i];
		element.addEventListener("click",doneToggle);
        console.log("function for linethrough-click activated");
	}
}

// Aktivere class .done fra CSS
function doneToggle() {
	this.classList.toggle("done");
    console.log("classlist toggled");
}

// Kontrollere at det er flere enn 0 elementer i 'Remove-button'-listen og opprette lyttefunksjon på 'fjern'-knappen
function removeListener () {
	for (let index = 0; index < removeButton.length; index++) {
		const element = removeButton[index];
		element.addEventListener("click",removeTheItem);
        console.log("check if there are more than 0 'remove'-buttons and activate listener for the 'remove'-button");
	}
}

// Funksjon for fjern-knappen. Fjerner listeelement og 'fjern'-knapp.
function removeTheItem() {
	this.previousElementSibling.remove();
    console.log("Item removed");
	this.remove();
    console.log("'Remove'-button removed");
    sumQuantity();
}

//
function sumQuantity() {
    var quantityList = document.querySelectorAll(".itemQuantity");
    var counter = 0;
    quantityList.forEach(listItem => {
        counter += +listItem.innerText;
    })
    totalQuantity.innerText = counter;
}

//************************//

button.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
quantity.addEventListener("keypress", addListAfterKeypress);

toggleListener();
removeListener();