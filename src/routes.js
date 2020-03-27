const express = require('express');

const routes = express.Router();
const data = require('./data');

const RecipesController = require('./app/controllers/RecipesController');

/*  
    == Admin Routes ==
*/

// TODO - Authentication
routes.get('/admin', (req, res) => res.redirect(301, '/admin/recipes'));
routes.get('/admin/recipes', RecipesController.index);
routes.get('/admin/recipes/create', RecipesController.create);
routes.get('/admin/recipes/:id', RecipesController.show);
routes.get('/admin/recipes/:id/edit', RecipesController.edit);

routes.post('/admin/recipes', RecipesController.post);
routes.put('/admin/recipes/:id', RecipesController.put);
routes.delete('/admin/recipes/:id', RecipesController.delete);

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
