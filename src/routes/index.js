const express = require('express');

const routes = express.Router();

const adminRoutes = require('./admin');
const publicRoutes = require('./public');
const injectGlobalsMiddleware = require('../app/middlewares/injestGlobals');
const localeMiddleware = require('../app/middlewares/locale');

routes.use(localeMiddleware);
routes.use(injectGlobalsMiddleware);
routes.use('/', publicRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;
