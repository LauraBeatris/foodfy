const Recipe = require('../../models/Recipe');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the operations related to
    the home route
*/
class HomeController {
    async index(req, res) {
        try {
            const { filter } = req.query;

            let recipes = await Recipe.findAll();
            recipes = recipes.map((recipe) => ({
                ...recipe,
                photo: recipe.photo
                    ? formatFilePath(req, recipe.photo)
                    : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
            }));

            return res.render('public/index', { recipes, filter });
        } catch (err) {
            return res.render('public/index', {
                error: 'Erro ao listar receitas',
            });
        }
    }
}

module.exports = new HomeController();
