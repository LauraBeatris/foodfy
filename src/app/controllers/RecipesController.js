const Recipe = require('../models/Recipe');

/* 
    This controller is responsable for the recipes operations related to
    the public platform
*/
class RecipesController {
    async index(_, res) {
        try {
            const recipes = await Recipe.all();
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
            const recipe = await Recipe.find([req.params.id]);
            if (!recipe) return res.status(404).send('Recipe not found');

            return res.render('public/recipes/show', { recipe });
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
