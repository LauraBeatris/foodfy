const { check } = require('express-validator');
const User = require('../models/User');
const { parseValidationErrors } = require('../../lib/utils');

class UserValidator {
    postFields() {
        return [
            check('name')
                .not()
                .isEmpty()
                .withMessage('Digite o nome do usuário'),
            check('email')
                .isEmail()
                .withMessage('Email inválido')
                .not()
                .isEmpty()
                .withMessage('Digite o email do usuário'),
        ];
    }

    async post(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/users/create', {
                validationErrorMessages,
                user: req.body,
            });
        }

        try {
            const { email } = req.body;

            const findUserByEmailResults = await User.findOne({
                where: { email },
            });
            const findUserByEmail = findUserByEmailResults.rows[0];

            if (findUserByEmail) {
                return res.render('admin/users/create', {
                    error:
                        'Esse email já está sendo utilizado por outro usuário',
                });
            }

            return next();
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro no cadastro do usuário. Por favor, tente novamente.',
            });
        }
    }

    async edit(req, res, next) {
        try {
            const verifyIfUserExistsResults = await User.findOne({
                where: { id: req.params.id || req.body.id },
            });
            const verifyIfUserExists = verifyIfUserExistsResults.rows[0];

            if (!verifyIfUserExists) {
                return res.redirect(
                    '/admin/users?error=Usuário não encontrado'
                );
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/users', {
                error:
                    'Houve um erro na procura do usuário. Por favor, tente novamente.',
            });
        }
    }

    putFields() {
        return [
            check('name')
                .not()
                .isNumeric()
                .withMessage('O nome do usuário não pode conter numéros'),
            check('email').isEmail().withMessage('Email inválido'),
        ];
    }

    async put(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/users/edit', {
                validationErrorMessages,
                user: {
                    ...req.body,
                    id: req.params.id,
                },
            });
        }

        const { id } = req.params;

        try {
            const { email, currentEmail } = req.body;

            if (email !== currentEmail) {
                const findUserByEmailResults = await User.findOne({
                    where: { email },
                });
                const findUserByEmail = findUserByEmailResults.rows[0];

                if (findUserByEmail) {
                    return res.render('admin/users/edit', {
                        error:
                            'Esse email já está sendo utilizado por outro usuário',
                        user: { ...req.body, id },
                    });
                }
            }

            return next();
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro na atualização do usuário. Por favor, tente novamente.',
                user: { ...req.body, id },
            });
        }
    }
}

module.exports = new UserValidator();
