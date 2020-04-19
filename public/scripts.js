const Navigation = {
    links: document.querySelectorAll('.js-header__link'),
    active() {
        if (Navigation.links.length > 0) {
            Navigation.links.forEach((link) => {
                if (
                    window.location.pathname.includes(link.getAttribute('href'))
                ) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    },
};

const DeleteAlert = {
    run(event, message) {
        const confirmation = confirm(message);

        if (!confirmation) event.preventDefault();

        return true;
    },
};

const ToggleElement = {
    toggle(event, elementSelector) {
        const button = event.target;
        const element = document.querySelector(elementSelector);

        element.classList.toggle('hidden');

        if (element.className.includes('hidden')) {
            button.innerHTML = 'Mostrar';
        } else {
            button.innerHTML = 'Esconder';
        }
    },
};

const AddField = {
    add(parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (parent) {
            const fields = parent.querySelectorAll('input');

            // Cloning the node of the last field added to the parent
            const lastField = fields[fields.length - 1];

            // The user needs to fill the input above before creating a new one
            if (lastField && lastField.value === '') return false;

            const newField = lastField && lastField.cloneNode(true);

            // Reset the value from the cloned field
            newField.value = '';

            // Appending the field to his parent
            parent.appendChild(newField);

            return newField;
        }

        return false;
    },
    listen() {
        document
            .querySelector('.js-add-ingredient')
            .addEventListener('click', () => AddField.add('#ingredients'));
        document
            .querySelector('.js-add-preparation')
            .addEventListener('click', () => AddField.add('#preparations'));
    },
};

Navigation.active();
AddField.listen();
