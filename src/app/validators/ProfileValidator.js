const { check } = require('express-validator');
const User = require('../models/User');
const { parseValidationErrors } = require('../../lib/utils');

class ProfileValidator {
    get putFields() {
        return [
            check('name')
                .not()
                .isEmpty()
                .withMessage('Digite o seu nome')
                .bail()
                .not()
                .isNumeric()
                .withMessage('O nome do usuário não pode conter numéros'),
            check('email')
                .not()
                .isEmpty()
                .withMessage('Digite seu email')
                .bail()
                .isEmail()
                .withMessage('Email inválido'),
            check('password')
                .not()
                .isEmpty()
                .withMessage('Digite sua senha para atualizar os dados'),
        ];
    }

    async put(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/profile/index', {
                validationErrorMessages,
                user: req.body,
            });
        }

        const { email, password: confirmPassword } = req.body;
        const { user: loggedUser } = req.session;
        const { email: loggedUserEmail, password } = loggedUser;

        try {
            if (email !== loggedUserEmail) {
                const findUserByEmail = await User.findOne({
                    filters: {
                        where: { email },
                    },
                });

                if (findUserByEmail) {
                    return res.render('admin/profile/index', {
                        error:
                            'Esse email já está sendo utilizado por outro usuário',
                        user: loggedUser,
                    });
                }
            }

            const passwordMismatch = confirmPassword !== password;
            if (passwordMismatch) {
                return res.render('admin/profile/index', {
                    error: 'Senha inválida',
                    user: loggedUser,
                });
            }

            return next();
        } catch (err) {
            return res.render('admin/users', {
                error:
                    'Houve um erro na edição da sua conta. Por favor, tente novamente.',
            });
        }
    }
}

module.exports = new ProfileValidator();
