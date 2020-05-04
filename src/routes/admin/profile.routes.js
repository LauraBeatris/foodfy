const express = require('express');

const routes = express.Router();

const ProfileController = require('../../app/controllers/admin/ProfileController');
const ProfileValidator = require('../../app/validators/ProfileValidator');

routes.get('/profile', ProfileController.index);
routes.put('/profile', ProfileValidator.put, ProfileController.put);

module.exports = routes;
