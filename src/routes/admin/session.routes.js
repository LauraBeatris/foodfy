const express = require('express');

const routes = express.Router();

const SessionController = require('../../app/controllers/admin/SessionController');
const SessionValidator = require('../../app/validators/SessionValidator');

routes
    .get('/login', SessionController.loginForm)
    .post(
        '/login',
        [SessionValidator.loginFields, SessionValidator.login],
        SessionController.login
    )
    .delete('/logout', SessionController.logout)

    .get('/recover-password', SessionController.recoverPasswordForm)
    .post(
        '/recover-password',
        [
            SessionValidator.recoverPasswordFields,
            SessionValidator.recoverPassword,
        ],
        SessionController.recoverPassword
    )

    .get(
        '/reset-password',
        SessionValidator.resetPasswordForm,
        SessionController.resetPasswordForm
    )
    .post(
        '/reset-password',
        [SessionValidator.resetPasswordFields, SessionValidator.resetPassword],
        SessionController.resetPassword
    );

module.exports = routes;
