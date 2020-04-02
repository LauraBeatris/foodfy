const Chef = require('../models/Chef');

/* 
    This controller is responsable for the chefs operations (CRUD) and also rendering the screens that 
    handle that operations, which are provided by the admin routes,
    Public Routes doesn't need to access this controller because they only need to list and show data and not
    to realize database operations.
*/
class ChefsController {
    async index(_, res) {
        try {
            const chefs = await Chef.all();
            return res.render('admin/chefs/index', { chefs });
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

    create(_, res) {
        return res.render('admin/chefs/create');
    }

    async post(req, res) {
        try {
            // validate(req.body)
            const { name, avatar_url } = req.body;

            const chef = await Chef.create([name, avatar_url]);
            return res.redirect(301, `/admin/chefs/${chef.id}`);
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a criação de uma receita',
                errorData,
            });
        }
    }

    async show(req, res) {
        try {
            const chef = await Chef.find([req.params.id]);
            if (!chef) await res.status(404).send('Chef not found');

            return res.render('admin/chefs/show.njk', { chef });
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

    async edit(req, res) {
        try {
            const chef = await Chef.find([req.params.id]);
            if (!chef) await res.status(404).send('Chef not found');

            return res.render('admin/chefs/edit.njk', { chef });
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

    async put(req, res) {
        try {
            // validate(req.body)
            const { name, avatar_url } = req.body;

            const chef = await Chef.update([name, avatar_url, req.params.id]);
            return res.redirect(301, `/admin/chefs/${chef.id}`);
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a criação de uma receita',
                errorData,
            });
        }
    }

    async delete(req, res) {
        try {
            await Chef.delete([req.params.id]);
            return res.redirect(301, `/admin/chefs`);
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a criação de uma receita',
                errorData,
            });
        }
    }
}

module.exports = new ChefsController();
