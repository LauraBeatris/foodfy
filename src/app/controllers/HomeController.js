const Recipe = require('../models/Recipe');

/* 
    This controller is responsable for the operations related to
    the home route
*/
class HomeController {
    async index(_, res) {
        try {
            const recipes = await Recipe.all();
            return res.render('public/index', { recipes });
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
