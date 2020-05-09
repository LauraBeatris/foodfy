const { check } = require('express-validator');
const User = require('../models/User');
const { parseValidationErrors } = require('../../lib/utils');

class UserValidator {
    get postFields() {
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
                registedUser: req.body,
            });
        }

        try {
            const { email } = req.body;

            const findUserByEmail = await User.findOne({
                filters: {
                    where: { email },
                },
            });

            if (findUserByEmail) {
                return res.render('admin/users/create', {
                    error:
                        'Esse email já está sendo utilizado por outro usuário',
                    registedUser: req.body,
                });
            }

            return next();
        } catch (err) {
            return res.render('admin/users/create', {
                error:
                    'Houve um erro no cadastro do usuário. Por favor, tente novamente.',
                registedUser: req.body,
            });
        }
    }

    async edit(req, res, next) {
        try {
            const verifyIfUserExists = await User.findOne({
                filters: { where: { id: req.params.id || req.body.id } },
            });

            if (!verifyIfUserExists) {
                return res.redirect(
                    '/admin/users?error=Usuário não encontrado'
                );
            }

            req.registedUser = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/users/edit', {
                error:
                    'Houve um erro na procura do usuário. Por favor, tente novamente.',
            });
        }
    }

    get putFields() {
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
        const { id } = req.params;

        const verifyIfUserExists = await User.findOne({
            filters: { where: { id: req.params.id } },
        });

        const registedUser = {
            id,
            ...req.body,
        };

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/users/edit', {
                validationErrorMessages,
                registedUser,
            });
        }

        try {
            const { email, currentEmail } = req.body;

            if (email !== currentEmail) {
                const findUserByEmail = await User.findOne({
                    filters: {
                        where: { email },
                    },
                });

                if (findUserByEmail) {
                    return res.render('admin/users/edit', {
                        error:
                            'Esse email já está sendo utilizado por outro usuário',
                        registedUser,
                    });
                }
            }

            const updatedData = {
                name: req.body.name,
                is_admin: !!req.body.is_admin,
            };

            /* Email is a field restricted by a unique index */
            if (verifyIfUserExists.email !== currentEmail) {
                updatedData.email = req.body.email;
            }

            req.updatedData = updatedData;

            return next();
        } catch (err) {
            return res.render('admin/users/edit', {
                error:
                    'Houve um erro na atualização do usuário. Por favor, tente novamente.',
                registedUser,
            });
        }
    }
}

module.exports = new UserValidator();
