const express = require('express');

const routes = express.Router();

const ProfileController = require('../../app/controllers/admin/ProfileController');
const ProfileValidator = require('../../app/validators/ProfileValidator');

routes
    .get('/profile', ProfileController.index)
    .put(
        '/profile',
        [ProfileValidator.putFields, ProfileValidator.put],
        ProfileController.put
    );

module.exports = routes;
