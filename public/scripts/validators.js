const FormValidatorSchema = {
    chefs: {
        name: {
            presence: {
                message: '^Digite o nome do chef',
            },
        },
    },
    recipes: {
        title: {
            presence: {
                message: '^Digite o título da receita',
            },
        },
        chef_id: {
            presence: {
                message: '^Selecione um chef',
                allowEmpty: false,
            },
        },
        'ingredients[]': {
            presence: {
                message: '^Adicione um ingrediente',
                allowEmpty: false,
            },
        },
        'preparations[]': {
            presence: {
                message: '^Adicione uma instrução',
                allowEmpty: false,
            },
        },
    },
    users: {
        name: {
            presence: {
                message: '^Digite o nome do usuário',
            },
        },
        email: {
            presence: {
                message: '^Digite o email do usuário',
            },
            email: {
                message: '^Digite um email válido',
            },
        },
    },
    profile: {
        name: {
            presence: {
                message: '^Digite o seu nome',
            },
        },
        email: {
            presence: {
                message: '^Digite seu email',
            },
            email: {
                message: '^Digite um email válido',
            },
        },
        password: {
            presence: {
                message: '^Digite sua senha para atualizar os dados',
            },
        },
    },
    login: {
        email: {
            presence: {
                message: '^Digite seu email',
            },
            email: {
                message: '^Digite um email válido',
            },
        },
        password: {
            presence: {
                message: '^Digite sua senha',
            },
        },
    },
    recoverPassword: {
        email: {
            presence: {
                message: '^Digite seu email',
            },
            email: {
                message: '^Digite um email válido',
            },
        },
    },
    resetPassword: {
        email: {
            presence: {
                message: '^Digite seu email',
            },
            email: {
                message: '^Digite um email válido',
            },
        },
        newPassword: {
            presence: {
                message: '^Digite sua nova senha',
            },
        },
        confirmNewPassword: {
            presence: {
                message: '^Confirme sua nova senha',
            },
            equality: {
                attribute: 'newPassword',
                message: '^As senhas não coincidem',
            },
        },
    },
};

const FormValidator = {
    form: null,
    schema: null,
    fields: [],
    errors: {},
    listen() {
        const form = document.querySelector('.submit-form');
        if (form) {
            // Get the form node and validation schema
            FormValidator.form = form;
            FormValidator.schema = form.getAttribute('data-schema');
            FormValidator.fields = document.getElementsByClassName('field');

            // Listener to verify it there are validators errors on submit
            form.addEventListener('submit', (event) => {
                Array.from(FormValidator.fields).forEach((field) => {
                    FormValidator.validate(field);
                });

                if (Object.keys(FormValidator.errors).length > 0) {
                    event.preventDefault();
                }

                return false;
            });
        }
    },
    // Validate the fields according to a schema
    validate(field) {
        const errors = validate(
            FormValidator.form,
            FormValidatorSchema[FormValidator.schema]
        );

        // Updating the errors attribute
        FormValidator.errors = errors || {};

        // Adding/removing error messages
        FormValidator.handleErrorMessages(field);
    },
    handleErrorMessages(field) {
        /*
            Create error messages for invalid fields
            and delete messages for valid fields
        */
        const fieldContainer = field.parentNode;

        if (Object.keys(FormValidator.errors).includes(field.name)) {
            field.classList.add('error');
            field.classList.remove('valid');

            const errorMessage = FormValidator.createErrorMessage(
                field.name,
                fieldContainer
            );

            if (errorMessage) fieldContainer.appendChild(errorMessage);
        } else {
            field.classList.remove('error');
            field.classList.add('valid');
            FormValidator.removeErrorMessage(fieldContainer);
        }
    },
    createErrorMessage(fieldName, fieldContainer) {
        const alreadyHasErrorMessage =
            fieldContainer &&
            Array.from(fieldContainer.children).find((fieldNode) =>
                fieldNode.classList.contains('error-message')
            );

        if (!alreadyHasErrorMessage) {
            const errorMessage = document.createElement('span');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = FormValidator.errors[fieldName];

            return errorMessage;
        }

        return null;
    },
    removeErrorMessage(fieldContainer) {
        const errorMessage = fieldContainer.querySelector('.error-message');
        if (errorMessage) fieldContainer.removeChild(errorMessage);
    },
};

FormValidator.listen();
