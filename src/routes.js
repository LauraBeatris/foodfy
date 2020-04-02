const express = require('express');

const routes = express.Router();

const RecipesController = require('./app/controllers/RecipesController');
const HomeController = require('./app/controllers/HomeController');

const RecipesAdminController = require('./app/controllers/admin/RecipesController');
const ChefsAdminController = require('./app/controllers/admin/ChefsController');

/*  
    == Admin Routes ==
*/

// TODO - Authentication

routes.get('/admin', (req, res) => res.redirect(301, '/admin/recipes'));
routes.get('/admin/recipes', RecipesAdminController.index);
routes.get('/admin/recipes/create', RecipesAdminController.create);
routes.get('/admin/recipes/:id', RecipesAdminController.show);
routes.get('/admin/recipes/:id/edit', RecipesAdminController.edit);

routes.post('/admin/recipes', RecipesAdminController.post);
routes.put('/admin/recipes/:id', RecipesAdminController.put);
routes.delete('/admin/recipes/:id', RecipesAdminController.delete);

routes.get('/admin/chefs', ChefsAdminController.index);
routes.get('/admin/chefs/create', ChefsAdminController.create);
routes.get('/admin/chefs/:id', ChefsAdminController.show);
routes.get('/admin/chefs/:id/edit', ChefsAdminController.edit);

routes.post('/admin/chefs', ChefsAdminController.post);
routes.put('/admin/chefs/:id', ChefsAdminController.put);
routes.delete('/admin/chefs/:id', ChefsAdminController.delete);

/*  
    == Public Routes ==
*/
routes.get('/', HomeController.index);
routes.get('/recipes', RecipesController.index);
routes.get('/recipes/:id', RecipesController.show);
routes.get('/about', (_, res) => res.render('public/about'));

module.exports = routes;
