const { check } = require('express-validator');
const User = require('../models/User');
const { parseValidationErrors } = require('../../lib/utils');

class SessionValidator {
    get loginFields() {
        return [
            check('email')
                .isEmail()
                .withMessage('Email inválido')
                .not()
                .isEmpty()
                .withMessage('Digite seu email'),
            check('password').not().isEmpty().withMessage('Digite sua senha'),
        ];
    }

    async login(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/sessions/login', {
                validationErrorMessages,
                user: req.body,
            });
        }

        try {
            const verifyIfUserExists = await User.findOne({
                filters: {
                    where: {
                        email: req.body.email,
                    },
                },
            });

            if (!verifyIfUserExists) {
                return res.render('admin/sessions/login', {
                    error:
                        'Usuário não encontrado. Tem certeza que digitou as credenciais corretas?',
                    user: req.body,
                });
            }

            const passwordMismatch =
                verifyIfUserExists.password !== req.body.password;
            if (passwordMismatch) {
                return res.render('admin/sessions/login', {
                    error: 'Senha inválida',
                });
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/sessions/login', {
                error:
                    'Houve um erro na autenticação do usuário. Por favor, tente novamente.',
            });
        }
    }

    get recoverPasswordFields() {
        return [
            check('email')
                .isEmail()
                .withMessage('Email inválido')
                .not()
                .isEmpty()
                .withMessage('Digite seu email'),
        ];
    }

    async recoverPassword(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/sessions/recoverPassword', {
                validationErrorMessages,
                email: req.body.email,
            });
        }

        try {
            const verifyIfUserExists = await User.findOne({
                filters: {
                    where: {
                        email: req.body.email,
                    },
                },
            });

            if (!verifyIfUserExists) {
                return res.render('admin/sessions/recoverPassword', {
                    error:
                        'Usuário não encontrado. Tem certeza que digitou o email correto?',
                    email: req.body.email,
                });
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/sessions/recoverPassword', {
                error:
                    'Houve um erro ao enviar o email de recuperação de senha. Por favor, tente novamente.',
                email: req.body.email,
            });
        }
    }

    resetPasswordForm(req, res, next) {
        if (!req.query.token) {
            return res.redirect('/admin/login');
        }

        return next();
    }

    get resetPasswordFields() {
        return [
            check('email')
                .isEmail()
                .withMessage('Email inválido')
                .not()
                .isEmpty()
                .withMessage('Digite seu email'),
            check('newPassword')
                .not()
                .isEmpty()
                .withMessage('Digite uma nova senha'),
            check('confirmNewPassword')
                .not()
                .isEmpty()
                .withMessage('Confirme sua nova senha')
                .bail()
                .custom((value, { req }) => {
                    if (value !== req.body.newPassword) {
                        return false;
                    }
                    return true;
                })
                .withMessage('As senhas não correspondem'),
        ];
    }

    async resetPassword(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/sessions/resetPassword', {
                validationErrorMessages,
                user: req.body,
                token: req.body.token,
            });
        }

        const { email, newPassword, confirmNewPassword, token } = req.body;

        try {
            const verifyIfUserExists = await User.findOne({
                filters: {
                    where: {
                        email,
                    },
                },
            });

            if (!verifyIfUserExists) {
                return res.render('admin/sessions/resetPassword', {
                    error:
                        'Usuário não encontrado. Tem certeza que digitou o email correto?',
                    user: req.body,
                    token,
                });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(404).render('session/reset-password.njk', {
                    error: 'Senhas não coincidem',
                    user: req.body,
                    token,
                });
            }

            const { reset_token, reset_token_expires } = verifyIfUserExists;

            if (!reset_token || !reset_token_expires) {
                return res
                    .status(404)
                    .render('admin/sessions/resetPassword.njk', {
                        error:
                            'Tokens inválidos. Refaça a solicitação para criar uma nova senha',
                        user: req.body,
                        token,
                    });
            }

            const expiredToken = Date.now() > reset_token_expires;
            const validToken = reset_token === token;

            if (expiredToken) {
                return res.redirect(
                    301,
                    `/admin/recover-password?error=Token Expirado.
                  Por favor, envie uma nova solicitação`
                );
            }

            if (!validToken) {
                return res.redirect(
                    301,
                    `/admin/recover-password?error=Token Inválido`
                );
            }

            req.user = verifyIfUserExists;

            return next();
        } catch (err) {
            return res.render('admin/sessions/resetPassword', {
                error:
                    'Houve um erro ao enviar criar uma nova senha. Por favor, tente novamente.',
                user: req.body,
                token,
            });
        }
    }
}

module.exports = new SessionValidator();
