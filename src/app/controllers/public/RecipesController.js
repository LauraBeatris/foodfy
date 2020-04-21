const Recipe = require('../../models/Recipe');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the recipes operations related to
    the public domain
*/
class RecipesController {
    async index(req, res) {
        try {
            const results = await Recipe.all();
            const recipes = results.rows.map((recipe) => ({
                ...recipe,
                photo: recipe.photo
                    ? formatFilePath(req, recipe.photo)
                    : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
            }));

            return res.render('public/recipes/index', { recipes });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a procura de receitas',
                errorData,
            });
        }
    }

    async show(req, res) {
        try {
            // Get recipe
            let results = await Recipe.find(req.params.id);
            const recipe = results.rows[0];

            if (!recipe) return res.status(404).send('Recipe not found');

            // Get recipe files
            results = await Recipe.files(req.params.id);
            const files = results.rows.map((file) => ({
                ...file,
                path: formatFilePath(req, file.path),
            }));

            return res.render('public/recipes/show', {
                recipe,
                files,
            });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a procura de uma receita',
                errorData,
            });
        }
    }
}

module.exports = new RecipesController();
