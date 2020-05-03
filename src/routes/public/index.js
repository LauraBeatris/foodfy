const express = require('express');

const routes = express.Router();

const recipeRoutes = require('./recipes.routes');
const homeRoutes = require('./home.routes');

routes.use(recipeRoutes, homeRoutes);

module.exports = routes;
