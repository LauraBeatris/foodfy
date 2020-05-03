const express = require('express');

const routes = express.Router();

const ProfileController = require('../../app/controllers/admin/ProfileController');
const ProfileValidator = require('../../app/validators/ProfileValidator');
const authMiddleware = require('../../app/middlewares/auth');

routes.get('/profile', authMiddleware, ProfileController.index);
routes.put(
    '/profile',
    authMiddleware,
    ProfileValidator.put,
    ProfileController.put
);

module.exports = routes;
