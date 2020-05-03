const express = require('express');

const routes = express.Router();

const ProfileController = require('../../app/controllers/admin/ProfileController');

routes.get('/profile', ProfileController.index);
routes.put('/profile', ProfileController.put);

module.exports = routes;
