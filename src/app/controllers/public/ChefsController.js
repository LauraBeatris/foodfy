const pluralize = require('pluralize');
const Chef = require('../../models/Chef');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the chefs operations related to
    the public domain
*/
class ChefsController {
    async index(req, res) {
        try {
            const results = await Chef.all();
            let chefs = results.rows;

            chefs = chefs.map((chef) => ({
                ...chef,
                total_recipes: `${chef.total_recipes} ${pluralize(
                    'receitas',
                    parseInt(chef.total_recipes, 10)
                )}`,
                avatar: formatFilePath(req, chef.avatar),
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
