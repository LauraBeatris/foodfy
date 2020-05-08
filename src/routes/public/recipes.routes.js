const express = require('express');

const routes = express.Router();

const RecipesController = require('../../app/controllers/public/RecipesController');
const SearchController = require('../../app/controllers/public/SearchController');

routes.get('/recipes', RecipesController.index);
routes.get('/recipes/search', SearchController.index);
routes.get('/recipes/:id', RecipesController.show);

module.exports = routes;
