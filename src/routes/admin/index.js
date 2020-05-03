const express = require('express');

const routes = express.Router();

const sessionRoutes = require('./session.routes');
const userRoutes = require('./user.routes');
const profileRoutes = require('./profile.routes');
const recipeRoutes = require('./recipe.routes');
const chefRoutes = require('./chef.routes');

routes.use(sessionRoutes, userRoutes, profileRoutes, recipeRoutes, chefRoutes);

module.exports = routes;
