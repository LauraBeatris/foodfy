const express = require('express');

const routes = express.Router();

const HomeController = require('../../app/controllers/public/HomeController');
const ChefsController = require('../../app/controllers/public/ChefsController');

routes.get('/', HomeController.index);
routes.get('/chefs', ChefsController.index);

routes.get('/about', (_, res) => res.render('public/about'));

module.exports = routes;
