const Chef = require('../../models/Chef');
const File = require('../../models/File');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the chefs operations related to
    the admin domain
*/
class ChefsController {
    async index(req, res) {
        try {
            const results = await Chef.all();
            const chefs = results.rows.map((chef) => ({
                ...chef,
                avatar: formatFilePath(req, chef.avatar),
            }));

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
            if (!req.file)
                return res.status(400).send('Envie uma imagem de avatar');

            const { name } = req.body;
            let results = await File.create(req.file);
            const file = results.rows[0];

            results = await Chef.create([name, file.id]);
            const chef = results.rows[0];

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
            let results = await Chef.find(req.params.id);
            const chef = results.rows[0];
            if (!chef) return res.status(404).send('Chef not found');

            results = await Chef.chefRecipes(req.params.id);
            const chefRecipes = results.rows.map((recipe) => ({
                ...recipe,
                photo: formatFilePath(req, recipe.photo),
            }));

            return res.render('admin/chefs/show.njk', {
                chef: {
                    ...chef,
                    avatar: formatFilePath(req, chef.avatar),
                },
                chefRecipes,
            });
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
            const results = await Chef.find(req.params.id);
            let chef = results.rows[0];

            if (!chef) await res.status(404).send('Chef not found');

            chef = {
                ...chef,
                avatar_url: formatFilePath(req, chef.avatar),
            };

            return res.render('admin/chefs/edit.njk', {
                chef,
            });
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
            let results = await Chef.find(req.params.id);
            let chef = results.rows[0];
            if (!chef) return res.status(404).send('Chef not found');

            const values = {
                ...chef,
                ...req.body,
            };

            if (req.file) {
                const file = await File.create(req.file);
                values.file_id = file.id;
            }

            results = await Chef.update(values);
            [chef] = results.rows;

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
            const results = await Chef.chefRecipes(req.params.id);
            const chefRecipes = results.rows;
            if (chefRecipes.length > 0)
                return res
                    .status(403)
                    .send('Chefs que possuem receitas não podem ser deletados');

            await Chef.delete([req.params.id]);
            return res.redirect(301, `/admin/chefs`);
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error:
                    err.code === '23503'
                        ? 'Chefs que possuem receitas não podem ser deletados'
                        : 'Houve um erro durante a deleção de um chef',
                errorData,
            });
        }
    }
}

module.exports = new ChefsController();
