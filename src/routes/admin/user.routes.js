const express = require('express');

const routes = express.Router();

const UserController = require('../../app/controllers/admin/UserController');

routes.get('/users', UserController.list);
routes.post('/users', UserController.post);
routes.get('/users/create', UserController.create);
routes.get('/users/:id/edit', UserController.edit);
routes.put('/users/:id', UserController.put);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;
