const Chef = require('../../models/Chef');
const File = require('../../models/File');
const { formatFilePath } = require('../../../lib/utils');

/*
    This controller is responsable for the chefs operations related to
    the admin domain
*/
class ChefsController {
    async index(req, res) {
        const { success, error } = req.query;

        try {
            const results = await Chef.all();
            const chefs = results.rows.map((chef) => ({
                ...chef,
                avatar: formatFilePath(req, chef.avatar),
            }));

            return res.render('admin/chefs/index', {
                chefs,
                success,
                error,
            });
        } catch (err) {
            return res.render('admin/chefs/index', {
                error: 'Erro ao listar chefs',
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

            return res.redirect(
                301,
                `/admin/chefs/${chef.id}?success=Chef criado com sucesso`
            );
        } catch (err) {
            return res.render('admin/chefs/create', {
                error:
                    'Houve um erro ao criar um chef. Por favor, tente novamente.',
                chef: req.body,
            });
        }
    }

    async show(req, res) {
        const { success, error } = req.query;
        try {
            let results = await Chef.find(req.params.id);
            const chef = results.rows[0];
            if (!chef) return res.status(404).send('Chef not found');

            results = await Chef.chefRecipes(req.params.id);
            const chefRecipes = results.rows.map((recipe) => ({
                ...recipe,
                photo: formatFilePath(req, recipe.photo),
            }));

            console.log(chef.avatar);
            return res.render('admin/chefs/show', {
                chef: {
                    ...chef,
                    avatar: formatFilePath(req, chef.avatar),
                },
                chefRecipes,
                success,
                error,
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

            return res.render('admin/chefs/edit', {
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
                    'Houve um erro durante o render da view de edição um chef',
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
                const fileResults = await File.create(req.file);
                const file = fileResults.rows[0];
                values.file_id = file.id;
            }

            results = await Chef.update(values);
            [chef] = results.rows;

            return res.redirect(
                301,
                `/admin/chefs/${chef.id}?success=Chef editado com sucesso`
            );
        } catch (err) {
            return res.render('admin/chefs/edit', {
                error:
                    'Houve um erro ao editar o chef. Por favor, tente novamente',
                chef: req.body,
            });
        }
    }

    async delete(req, res) {
        try {
            await Chef.delete([req.params.id]);
            return res.redirect(
                301,
                `/admin/chefs?success=Chef deletado com sucesso`
            );
        } catch (err) {
            return res.render('admin/chefs/edit', {
                error:
                    'Houve um erro ao deletar o chef. Por favor, tente novamente',
                chef: req.body,
            });
        }
    }
}

module.exports = new ChefsController();
