const express = require('express');

const routes = express.Router();

const SessionController = require('../../app/controllers/admin/SessionController');
const SessionValidator = require('../../app/validators/SessionValidator');

routes.get('/login', SessionController.loginForm);
routes.post(
    '/login',
    SessionValidator.loginFields(),
    SessionValidator.login,
    SessionController.login
);
routes.delete('/logout', SessionController.logout);

routes.get('/recover-password', SessionController.recoverPasswordForm);
routes.post(
    '/recover-password',
    SessionValidator.recoverPasswordFields(),
    SessionValidator.recoverPassword,
    SessionController.recoverPassword
);

routes.get(
    '/reset-password',
    SessionValidator.resetPasswordForm,
    SessionController.resetPasswordForm
);
routes.post(
    '/reset-password',
    SessionValidator.resetPasswordFields(),
    SessionValidator.resetPassword,
    SessionController.resetPassword
);

module.exports = routes;
