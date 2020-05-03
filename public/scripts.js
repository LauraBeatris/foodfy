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

const PhotoUpload = {
    input: null,
    files: [],
    uploadLimit: 5,
    hasLimit() {
        if (
            PhotoUpload.input.files.length > PhotoUpload.uploadLimit ||
            PhotoUpload.input.files.length + PhotoUpload.files.length >
                PhotoUpload.uploadLimit
        ) {
            alert(
                `Você só pode realizar o upload de até ${PhotoUpload.uploadLimit} fotos`
            );
            return true;
        }

        return false;
    },
    handleFileInput(event) {
        PhotoUpload.input = event.target;
        const { files: FileList } = PhotoUpload.input;

        if (PhotoUpload.hasLimit()) return true;

        Array.from(FileList).forEach((file) => {
            const reader = new FileReader();
            PhotoUpload.files.push(file);

            reader.onload = () => {
                const image = new Image();
                image.src = reader.result;

                const photoContainer = PhotoUpload.getContainer();
                const previewContainer = PhotoUpload.getPreviewContainer();

                photoContainer.appendChild(image);
                previewContainer.appendChild(photoContainer);
            };

            reader.readAsDataURL(file);
        });

        PhotoUpload.input.files = PhotoUpload.getAllFiles();
    },
    getContainer() {
        const container = document.createElement('div');
        container.classList.add('photo');
        container.appendChild(PhotoUpload.getRemoveButton());

        return container;
    },
    getPreviewContainer() {
        const preview = document.querySelector('.js-photos');
        return preview;
    },
    getRemoveButton() {
        const icon = document.createElement('i');

        icon.classList.add('material-icons');
        icon.id = 'remove-photo';
        icon.innerHTML = 'close';
        icon.addEventListener('click', PhotoUpload.removePhoto);

        return icon;
    },
    getAllFiles() {
        const dataTransfer =
            new ClipboardEvent('').clipboardData || new DataTransfer();

        PhotoUpload.files.map((file) => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    removePhoto(event) {
        const photos = Array.from(PhotoUpload.getPreviewContainer().children);
        // Removing the input element of the photos container
        photos.splice(0, 1);

        const photoContainer = event.target.parentNode;
        const photoIndex = photos.indexOf(photoContainer);

        PhotoUpload.files.splice(photoIndex, 1);
        PhotoUpload.input.files = PhotoUpload.getAllFiles();

        photoContainer.remove();
    },
    removeOldPhoto(event) {
        const photo = event.target.parentNode;

        const removedFilesInput = document.querySelector(
            'input[name="removed_files"]'
        );

        if (removedFilesInput) {
            removedFilesInput.value += `${photo.id},`;
            photo.remove();
        }
    },
};

const AvatarUpload = {
    selected(event) {
        const button = event.target.parentNode;
        const buttonText = button.querySelector('span');
        buttonText.innerHTML = 'Avatar selecionado';
    },
};

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

Navigation.active();
AddField.listen();
ToastyMessages.listen();
