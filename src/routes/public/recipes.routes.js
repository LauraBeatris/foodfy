const express = require('express');

const routes = express.Router();

const RecipesController = require('../../app/controllers/public/RecipesController');
const SearchController = require('../../app/controllers/public/SearchController');
const SearchValidator = require('../../app/validators/SearchValidator');

routes.get('/recipes', RecipesController.index);
routes.get('/recipes/search', SearchValidator.index, SearchController.index);
routes.get('/recipes/:id', RecipesController.show);

module.exports = routes;
