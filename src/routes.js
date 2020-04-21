const express = require('express');

const routes = express.Router();

const upload = require('./app/middlewares/multer');

const RecipesController = require('./app/controllers/public/RecipesController');
const ChefsController = require('./app/controllers/public/ChefsController');
const HomeController = require('./app/controllers/public/HomeController');

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

routes.post(
    '/admin/recipes',
    upload.array('photos', 5),
    RecipesAdminController.post
);
routes.put(
    '/admin/recipes/:id',
    upload.array('photos', 5),
    RecipesAdminController.put
);
routes.delete('/admin/recipes/:id', RecipesAdminController.delete);

routes.get('/admin/chefs', ChefsAdminController.index);
routes.get('/admin/chefs/create', ChefsAdminController.create);
routes.get('/admin/chefs/:id', ChefsAdminController.show);
routes.get('/admin/chefs/:id/edit', ChefsAdminController.edit);

routes.post('/admin/chefs', upload.single('avatar'), ChefsAdminController.post);
routes.put(
    '/admin/chefs/:id',
    upload.single('avatar'),
    ChefsAdminController.put
);
routes.delete('/admin/chefs/:id', ChefsAdminController.delete);

/*
    == Public Routes ==
*/
routes.get('/', HomeController.index);
routes.get('/recipes', RecipesController.index);
routes.get('/recipes/search', HomeController.index);
routes.get('/recipes/:id', RecipesController.show);

routes.get('/chefs', ChefsController.index);

routes.get('/about', (_, res) => res.render('public/about'));

module.exports = routes;
