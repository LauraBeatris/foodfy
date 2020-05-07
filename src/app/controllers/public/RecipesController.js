const LoadRecipesService = require('../../services/LoadRecipesService');

/*
    This controller is responsable for the recipes operations related to
    the public domain
*/
class RecipesController {
    async index(_, res) {
        try {
            const recipes = await new LoadRecipesService().execute();

            return res.render('public/recipes/index', { recipes });
        } catch (err) {
            return res.render('public/recipes/index', {
                error: 'Erro ao listar receitas',
            });
        }
    }

    async show(req, res) {
        try {
            const { recipe, files } = await new LoadRecipesService({
                filters: { recipe_id: req.params.id },
            }).execute();

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
