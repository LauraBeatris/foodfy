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
