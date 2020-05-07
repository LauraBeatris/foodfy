const LoadRecipesService = require('../../services/LoadRecipesService');

class SearchController {
    async index(req, res) {
        const { filter } = req.query;

        const recipes = await new LoadRecipesService({
            filters: { search: filter },
        }).execute();

        return res.render('public/search', { recipes, filter });
    }
}

module.exports = new SearchController();
