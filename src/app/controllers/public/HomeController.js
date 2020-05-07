const LoadRecipesService = require('../../services/LoadRecipesService');

/*
    This controller is responsable for the operations related to
    the home route
*/
class HomeController {
    async index(req, res) {
        try {
            const { filter } = req.query;

            const recipes = await new LoadRecipesService().execute();

            return res.render('public/index', { recipes, filter });
        } catch (err) {
            return res.render('public/index', {
                error: 'Erro ao listar receitas',
            });
        }
    }
}

module.exports = new HomeController();
