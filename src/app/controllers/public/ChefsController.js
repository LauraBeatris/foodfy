const LoadChefsService = require('../../services/LoadChefsService');

/*
    This controller is responsable for the chefs operations related to
    the public domain
*/
class ChefsController {
    async index(req, res) {
        try {
            const chefs = await new LoadChefsService().execute();

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
