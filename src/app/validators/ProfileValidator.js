const { check } = require('express-validator');
const User = require('../models/User');
const { parseValidationErrors } = require('../../lib/utils');

class ProfileValidator {
    putFields() {
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

        const { id, email: currentEmail, password } = req.session.user;
        const { email, password: confirmPassword } = req.body;

        try {
            if (email !== currentEmail) {
                const findUserByEmail = await User.findOne({
                    filters: {
                        where: { email },
                    },
                });

                if (findUserByEmail) {
                    return res.render('admin/profile/index', {
                        error:
                            'Esse email já está sendo utilizado por outro usuário',
                        user: { ...req.session.user, id },
                    });
                }
            }

            const passwordMismatch = confirmPassword !== password;
            if (passwordMismatch || !confirmPassword) {
                return res.render('admin/profile/index', {
                    error: 'Senha inválida',
                    user: { ...req.session.user, id },
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
