const express = require('express');

const routes = express.Router();

const authMiddleware = require('../../app/middlewares/auth');
const adminMiddleware = require('../../app/middlewares/admin');

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
    adminMiddleware,
    userRoutes
);

module.exports = routes;
