const express = require('express');

const routes = express.Router();

const RecipesAdminController = require('../../app/controllers/admin/RecipesController');
const RecipeValidator = require('../../app/validators/RecipeValidator');
const adminMiddleware = require('../../app/middlewares/admin');

const upload = require('../../app/middlewares/multer');

routes.get('/', (_, res) => res.redirect(301, '/admin/recipes'));
routes.get('/recipes', RecipesAdminController.index);
routes.get('/recipes/create', adminMiddleware, RecipesAdminController.create);
routes.get('/recipes/:id', RecipesAdminController.show);
routes.get('/recipes/:id/edit', adminMiddleware, RecipesAdminController.edit);

routes.post(
    '/recipes',
    adminMiddleware,
    upload.array('photos', 5),
    RecipeValidator.postFields(),
    RecipeValidator.post,
    RecipesAdminController.post
);
routes.put(
    '/recipes/:id',
    adminMiddleware,
    upload.array('photos', 5),
    RecipeValidator.putFields(),
    RecipeValidator.put,
    RecipesAdminController.put
);

routes.delete('/recipes/:id', adminMiddleware, RecipesAdminController.delete);

module.exports = routes;
