const express = require('express');

const routes = express.Router();

const RecipesAdminController = require('../../app/controllers/admin/RecipesController');
const RecipeValidator = require('../../app/validators/RecipeValidator');

const adminMiddleware = require('../../app/middlewares/admin');
const uploadMiddleware = require('../../app/middlewares/multer');

routes
    .get('/', (_, res) => res.redirect(301, '/admin/recipes'))
    .get('/recipes', RecipesAdminController.index)
    .get('/recipes/create', adminMiddleware, RecipesAdminController.create)

    .get('/recipes/:id', RecipesAdminController.show)
    .get('/recipes/:id/edit', adminMiddleware, RecipesAdminController.edit)

    .post(
        '/recipes',
        adminMiddleware,
        [
            uploadMiddleware.array('photos', 5),
            RecipeValidator.postFields,
            RecipeValidator.post,
        ],
        RecipesAdminController.post
    )
    .put(
        '/recipes/:id',
        adminMiddleware,
        [
            uploadMiddleware.array('photos', 5),
            RecipeValidator.putFields,
            RecipeValidator.put,
        ],
        RecipesAdminController.put
    )

    .delete('/recipes/:id', adminMiddleware, RecipesAdminController.delete);

module.exports = routes;
