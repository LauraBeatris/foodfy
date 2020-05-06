const Recipe = require('../../models/Recipe');
const { formatFilePath } = require('../../../lib/utils');

class SearchController {
    async index(req, res) {
        const { filter } = req.query;

        let recipes = await Recipe.findBy({ filter });
        recipes = recipes.map((recipe) => ({
            ...recipe,
            photo: recipe.photo
                ? formatFilePath(req, recipe.photo)
                : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
        }));

        return res.render('public/search', { recipes, filter });
    }
}

module.exports = new SearchController();
