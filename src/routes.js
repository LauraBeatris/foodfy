const express = require('express');

const routes = express.Router();
const data = require('./data');

const RecipesController = require('./app/controllers/RecipesController');
const ChefsController = require('./app/controllers/ChefsController');

/*  
    == Admin Routes ==
*/

// TODO - Authentication

routes.get('/admin', (req, res) => res.redirect(301, '/admin/recipes'));
routes.get('/admin/recipes', RecipesController.index);
routes.get('/admin/recipes/create', RecipesController.create);
routes.get('/admin/recipes/:id', RecipesController.show);
routes.get('/admin/recipes/:id/edit', RecipesController.edit);

routes.post('/admin/chefs', ChefsController.post);
routes.put('/admin/chefs/:id', ChefsController.put);
routes.delete('/admin/chefs/:id', ChefsController.delete);

routes.get('/admin/chefs', ChefsController.index);
routes.get('/admin/chefs/create', ChefsController.create);
routes.get('/admin/chefs/:id', ChefsController.show);
routes.get('/admin/chefs/:id/edit', ChefsController.edit);

routes.post('/admin/chefs', ChefsController.post);
routes.put('/admin/chefs/:id', ChefsController.put);
routes.delete('/admin/chefs/:id', ChefsController.delete);

/*  
    == Public Routes ==
*/
routes.get('/', (req, res) =>
    res.render('public/index', { recipes: data.recipes })
);
routes.get('/recipes', (req, res) =>
    res.render('public/recipes/index', { recipes: data.recipes })
);
routes.get('/recipes/:id', (req, res) => {
    const recipe = data.recipes[req.params.id];
    res.render('public/recipes/show', { recipe });
});
routes.get('/about', (_, res) => res.render('public/about'));

module.exports = routes;
