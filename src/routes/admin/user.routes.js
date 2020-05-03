const express = require('express');

const routes = express.Router();

const UserController = require('../../app/controllers/admin/UserController');

routes.get('/users', UserController.list);
routes.post('/users', UserController.post);
routes.put('/users', UserController.put);
routes.delete('/users', UserController.delete);

module.exports = routes;
