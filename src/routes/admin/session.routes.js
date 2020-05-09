const express = require('express');

const routes = express.Router();

const SessionController = require('../../app/controllers/admin/SessionController');
const SessionValidator = require('../../app/validators/SessionValidator');

const guestMiddleware = require('../../app/middlewares/guest');

routes
    .get('/login', guestMiddleware, SessionController.loginForm)
    .post(
        '/login',
        [SessionValidator.loginFields, SessionValidator.login],
        SessionController.login
    )
    .delete('/logout', SessionController.logout)

    .get(
        '/recover-password',
        guestMiddleware,
        SessionController.recoverPasswordForm
    )
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
        guestMiddleware,
        SessionValidator.resetPasswordForm,
        SessionController.resetPasswordForm
    )
    .post(
        '/reset-password',
        [SessionValidator.resetPasswordFields, SessionValidator.resetPassword],
        SessionController.resetPassword
    );

module.exports = routes;
