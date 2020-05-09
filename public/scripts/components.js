const ImageGallery = {
    highlight: document.querySelector('.highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(event) {
        const { target } = event;

        ImageGallery.previews.forEach((image) =>
            image.classList.remove('active')
        );
        target.classList.add('active');

        ImageGallery.highlight.src = target.src;
    },
};

const ToastyMessages = {
    listen() {
        const message = document.querySelector('.message');

        if (message)
            setTimeout(() => {
                message.classList.remove('show');
                message.classList.add('hide');
            }, 3000);
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
        const addIngredient = document.querySelector('.js-add-ingredient');
        const addPreparation = document.querySelector('.js-add-preparation');

        if (addIngredient)
            document
                .querySelector('.js-add-ingredient')
                .addEventListener('click', () => AddField.add('#ingredients'));

        if (addPreparation)
            document
                .querySelector('.js-add-preparation')
                .addEventListener('click', () => AddField.add('#preparations'));
    },
};

AddField.listen();
ToastyMessages.listen();
