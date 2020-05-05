const express = require('express');

const routes = express.Router();

const authMiddleware = require('../../app/middlewares/auth');

const sessionRoutes = require('./session.routes');
const userRoutes = require('./user.routes');
const profileRoutes = require('./profile.routes');
const recipeRoutes = require('./recipe.routes');
const chefRoutes = require('./chef.routes');

routes.use(
    sessionRoutes,
    authMiddleware,
    profileRoutes,
    recipeRoutes,
    chefRoutes,
    userRoutes
);

module.exports = routes;
