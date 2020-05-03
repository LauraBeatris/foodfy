const express = require('express');

const routes = express.Router();

const SessionController = require('../../app/controllers/admin/SessionController');
const SessionValidator = require('../../app/validators/SessionValidator');

routes.get('/login', SessionController.loginForm);
routes.post('/login', SessionValidator.login, SessionController.login);
routes.delete('/logout', SessionController.logout);

routes.get('/recover-password', SessionController.recoverPasswordForm);
routes.post(
    '/recover-password',
    SessionValidator.recoverPassword,
    SessionController.recoverPassword
);

routes.get('/reset-password', SessionController.resetPasswordForm);
routes.post('/reset-password', SessionController.resetPassword);

module.exports = routes;
