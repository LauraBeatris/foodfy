const express = require('express');

const routes = express.Router();

const recipeRoutes = require('./recipes.routes');
const chefsRoutes = require('./chefs.routes');

routes.use(recipeRoutes, chefsRoutes);

module.exports = routes;
