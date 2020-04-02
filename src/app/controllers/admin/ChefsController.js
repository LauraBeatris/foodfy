const Chef = require('../../models/Chef');

/* 
    This controller is responsable for the chefs operations related to
    the admin platform
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
                error: 'Houve um erro durante a procura de chefs',
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
                error: 'Houve um erro durante a criação de um chef',
                errorData,
            });
        }
    }

    async show(req, res) {
        try {
            const chef = await Chef.find([req.params.id]);
            const chefRecipes = await Chef.chefRecipes([req.params.id]);
            if (!chef) return res.status(404).send('Chef not found');

            return res.render('admin/chefs/show.njk', { chef, chefRecipes });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a procura de um chef',
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
                error:
                    'Houve um erro durante o render da view de atualização um chef',
                errorData,
            });
        }
    }

    async put(req, res) {
        try {
            // validate(req.body)
            const values = [req.body.name, req.body.avatar_url, req.params.id];
            const chef = await Chef.update(values);

            return res.redirect(301, `/admin/chefs/${chef.id}`);
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a atualização de um chef',
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
                error: 'Houve um erro durante a deleção de um chef',
                errorData,
            });
        }
    }
}

module.exports = new ChefsController();
