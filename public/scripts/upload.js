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
