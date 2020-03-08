function openModal(overlay){ 
    const imageElement = document.querySelector('.modal__img')
    const titleElement = document.querySelector('.modal__title')
    const authorElement = document.querySelector('.modal__author')

    const cards = document.querySelectorAll('.card')

    for (let card of cards) { 
        card.addEventListener("click", () => { 
            imageElement.src = card.getAttribute('data-source')
            titleElement.innerHTML = card.getAttribute('data-title')
            authorElement.innerHTML = card.getAttribute('data-author')
            overlay.classList.add('active')
        })
    }
}

function closeModal(overlay, closeHandlers = []) { 
    if (closeHandlers.length < 1) return false; 

    for (let closeHandler of closeHandlers) { 
        closeHandler.addEventListener("click", (event) => { 
            /*
                To close on the overlay click the close handler 
                cannot be closest to the modal container expect for the close button
            */
            if (!event.target.closest('.modal') || closeHandler.classList.contains('js-close-button')){ 
                overlay.classList.remove('active')
            }
        })
    }
}

const modalOverlay = document.querySelector('.modal-overlay')
const closeButton = document.querySelector('.js-close-button')
const closeHandlers = [modalOverlay, closeButton]

openModal(modalOverlay)
closeModal(modalOverlay, closeHandlers)