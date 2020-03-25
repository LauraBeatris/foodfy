// Toggle the show state of the element and change the text of the button 
function handleShow(target, buttonSelector) {
  const button = document.querySelector(buttonSelector);
  const targetElement = document.querySelector(target);

  targetElement.classList.toggle("hidden");

  if (targetElement.className.includes("hidden")) {
    button.innerHTML = "Mostrar";
  } else {
    button.innerHTML = "Esconder";
  }
}

// Appending fields to a parent 
function appendField(fieldSelector, parentSelector) { 
  const parentContainer = document.querySelector(parentSelector)
  const fields = document.querySelectorAll(fieldSelector)
  
  // Cloning the node of the last field added to the parent 
  const lastField = fields[fields.length - 1]
  const newField = lastField && lastField.cloneNode(true)

  // The user needs to fill the input above before creating a new one 
  if (lastField && lastField.value == '') return false; 

  // Reset the value from the cloned node 
  newField.value = "" 

  // Appending the field to his parent
  parentContainer.appendChild(newField)

  // Passing the listener for the new field
  appendFieldInputListener(fieldSelector, parentSelector)
} 

// Registering listeners on initial mount of inputs to append field on input keyup with enter key
function appendFieldInputListener(fieldSelector, parentSelector) { 
  const fields = document.querySelectorAll(fieldSelector) 

  for (let field of fields) { 
    field.addEventListener("keyup", (event) => { 
      if (event.keyCode && event.keyCode == 13) appendField(`${parentSelector} input`, parentSelector)
    })
  }
}

// Registering listeners on initial mount of inputs to append field on button action click
function actionButtonsListener(fieldSelector, parentSelector) { 
  // The button needs to be placed after the container
  const button = document.querySelector(`${parentSelector} + ${fieldSelector}`)
  if (button) button.addEventListener('click', () => appendField(`${parentSelector} input`, parentSelector))
}

appendFieldInputListener('#ingredients input', '#ingredients')
appendFieldInputListener('#preparations input', '#preparations')
actionButtonsListener(".field-container__action", "#ingredients")
actionButtonsListener(".field-container__action", "#preparations")