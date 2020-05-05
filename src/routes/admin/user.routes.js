const express = require('express');

const routes = express.Router();

const UserController = require('../../app/controllers/admin/UserController');
const UserValidator = require('../../app/validators/UserValidator');
const adminMiddleware = require('../../app/middlewares/admin');

routes.get('/users', adminMiddleware, UserController.list);
routes.post(
    '/users',
    UserValidator.postFields(),
    UserValidator.post,
    UserController.post
);
routes.get('/users/create', adminMiddleware, UserController.create);

routes.get(
    '/users/:id/edit',
    adminMiddleware,
    UserValidator.edit,
    UserController.edit
);
routes.put(
    '/users/:id',
    adminMiddleware,
    UserValidator.putFields(),
    UserValidator.put,
    UserController.put
);
routes.delete('/users/:id', adminMiddleware, UserController.delete);

module.exports = routes;
