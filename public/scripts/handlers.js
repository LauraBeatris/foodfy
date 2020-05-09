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

Navigation.active();
