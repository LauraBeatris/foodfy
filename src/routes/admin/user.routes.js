const express = require('express');

const routes = express.Router();

const UserController = require('../../app/controllers/admin/UserController');
const UserValidator = require('../../app/validators/UserValidator');

routes.get('/users', UserController.list);
routes.post('/users', UserValidator.post, UserController.post);
routes.get('/users/create', UserController.create);

routes.get('/users/:id/edit', UserValidator.edit, UserController.edit);
routes.put('/users/:id', UserValidator.put, UserController.put);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;
