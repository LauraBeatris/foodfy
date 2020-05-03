const express = require('express');

const routes = express.Router();

const ProfileController = require('../../app/controllers/admin/ProfileController');

routes.get('/admin/profile', ProfileController.index);
routes.put('/admin/profile', ProfileController.put);

module.exports = routes;
