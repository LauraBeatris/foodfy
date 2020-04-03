const Recipe = require('../../models/Recipe');

/* 
    This controller is responsable for the recipes operations related to
    the admin domain
*/
class RecipesAdminController {
    async index(_, res) {
        try {
            const recipes = await Recipe.all();
            return res.render('admin/recipes/index', { recipes });
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

    async create(_, res) {
        try {
            const chefOptions = await Recipe.chefOptions();
            return res.render('admin/recipes/create', { chefOptions });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };

            return res.status(errorData.status).json({
                error:
                    'Houve um erro durante o render da view de criação uma receita',
                errorData,
            });
        }
    }

    async post(req, res) {
        try {
            // validate(req.body)
            const values = [
                req.body.chef_id,
                req.body.image,
                req.body.title,
                req.body.ingredients,
                req.body.preparations,
                req.body.information,
            ];

            const recipe = await Recipe.create(values);
            return res.redirect(301, `/admin/recipes/${recipe.id}`);
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
            const recipe = await Recipe.find([req.params.id]);
            if (!recipe) return res.status(404).send('Recipe not found');

            return res.render('admin/recipes/show', { recipe });
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
            const chefOptions = await Recipe.chefOptions();
            const recipe = await Recipe.find([req.params.id]);

            return res.render('admin/recipes/edit', { recipe, chefOptions });
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
            const values = [
                req.body.chef_id,
                req.body.image,
                req.body.title,
                req.body.ingredients,
                req.body.preparations,
                req.body.information,
                req.params.id,
            ];

            const recipe = await Recipe.update(values);
            return res.redirect(301, `/admin/recipes/${recipe.id}`);
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
            await Recipe.delete([req.params.id]);
            return res.redirect(301, `/admin/recipes`);
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };
            return res.status(errorData.status).json({
                error: 'Houve um erro durante a deleção de uma receita',
                errorData,
            });
        }
    }
}

module.exports = new RecipesAdminController();
