const express = require('express');

const routes = express.Router();

const SessionController = require('../../app/controllers/admin/SessionController');

routes.get('/login', SessionController.loginForm);
routes.post('/login', SessionController.login);
routes.post('/logout', SessionController.logout);

routes.get('/recover-password', SessionController.recoverPasswordForm);
routes.post('/recover-password', SessionController.recoverPassword);

routes.get('/reset-password', SessionController.resetPasswordForm);
routes.post('/reset-password', SessionController.resetPassword);

module.exports = routes;
