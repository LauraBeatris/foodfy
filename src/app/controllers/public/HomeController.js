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
            let results = [];

            if (filter) {
                results = await Recipe.findBy({ filter });
                const recipes = results.rows.map((recipe) => ({
                    ...recipe,
                    photo: recipe.photo
                        ? formatFilePath(req, recipe.photo)
                        : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
                }));

                return res.render('public/search', { recipes, filter });
            }

            results = await Recipe.all();
            const recipes = results.rows.map((recipe) => ({
                ...recipe,
                photo: recipe.photo
                    ? formatFilePath(req, recipe.photo)
                    : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
            }));
            return res.render('public/index', { recipes, filter });
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
}

module.exports = new HomeController();
