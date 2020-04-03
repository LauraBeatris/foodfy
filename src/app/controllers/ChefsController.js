const pluralize = require('pluralize');
const Chef = require('../models/Chef');

/* 
    This controller is responsable for the chefs operations related to
    the public domain
*/
class ChefsController {
    async index(_, res) {
        try {
            let chefs = await Chef.all();
            chefs = chefs.map((chef) => ({
                ...chef,
                total_recipes: `${chef.total_recipes} ${pluralize(
                    'receitas',
                    parseInt(chef.total_recipes, 10)
                )}`,
            }));
            return res.render('public/chefs/index', { chefs });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a procura de chefs',
                errorData,
            });
        }
    }
}

module.exports = new ChefsController();
