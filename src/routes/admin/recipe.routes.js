const express = require('express');

const routes = express.Router();

const RecipesAdminController = require('../../app/controllers/admin/RecipesController');
const RecipeValidator = require('../../app/validators/RecipeValidator');
const upload = require('../../app/middlewares/multer');

routes.get('/', (_, res) => res.redirect(301, '/admin/recipes'));
routes.get('/recipes', RecipesAdminController.index);
routes.get('/recipes/create', RecipesAdminController.create);
routes.get('/recipes/:id', RecipesAdminController.show);
routes.get('/recipes/:id/edit', RecipesAdminController.edit);

routes.post(
    '/recipes',
    upload.array('photos', 5),
    RecipeValidator.postFields(),
    RecipeValidator.post,
    RecipesAdminController.post
);
routes.put(
    '/recipes/:id',
    upload.array('photos', 5),
    RecipeValidator.putFields(),
    RecipeValidator.put,
    RecipesAdminController.put
);

routes.delete('/recipes/:id', RecipesAdminController.delete);

module.exports = routes;
