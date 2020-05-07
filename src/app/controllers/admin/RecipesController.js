const Recipe = require('../../models/Recipe');
const LoadRecipesService = require('../../services/LoadRecipesService');

/*
    This controller is responsable for the recipes operations related to
    the admin domain
*/
class RecipesAdminController {
    async index(req, res) {
        const { success, error } = req.query;
        const { user } = req.session;

        try {
            const recipes = await new LoadRecipesService({ user }).execute();

            return res.render('admin/recipes/index', {
                recipes,
                success,
                error,
            });
        } catch (err) {
            return res.render('admin/recipes/index', {
                error: 'Erro ao listar receitas',
            });
        }
    }

    async create(req, res) {
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
                    'Houve um erro ao renderizar a view de criação uma receita',
                errorData,
            });
        }
    }

    async post(req, res) {
        try {
            const {
                chef_id,
                user_id,
                title,
                ingredients,
                preparations,
                information,
            } = req.body;

            const recipe = await Recipe.create({
                chef_id,
                user_id,
                title,
                ingredients: `{${ingredients}}`,
                preparations: `{${preparations}}`,
                information,
            });

            const recipeFilesPromises = req.files.map((file) =>
                Recipe.createFile({ file, recipe_id: recipe.id })
            );
            await Promise.all(recipeFilesPromises);

            return res.redirect(
                301,
                `/admin/recipes/${recipe.id}?success=Receita criada com sucesso`
            );
        } catch (err) {
            return res.render('admin/recipes/create', {
                error:
                    'Houve um erro ao criar a receita. Por favor, tente novamente.',
                recipe: req.body,
                chefOptions: req.chefOptions,
            });
        }
    }

    async show(req, res) {
        const { success, error } = req.query;
        try {
            const { recipe, files } = await new LoadRecipesService({
                filters: { recipe_id: req.params.id },
            }).execute();

            return res.render('admin/recipes/show', {
                recipe,
                files,
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
                error: 'Houve um erro ao procurar pela receita',
                errorData,
            });
        }
    }

    async edit(req, res) {
        try {
            const { recipe, files } = await new LoadRecipesService({
                filters: { recipe_id: req.params.id },
            }).execute();

            const chefOptions = await Recipe.chefOptions();

            return res.render('admin/recipes/edit', {
                recipe,
                chefOptions,
                files,
            });
        } catch (err) {
            const errorData = {
                message: err.message || 'Database error',
                name: err.name,
                status: err.status || 500,
            };

            return res.status(errorData.status).json({
                error:
                    'Houve um erro durante o render da view de edição uma receita',
                errorData,
            });
        }
    }

    async put(req, res) {
        const {
            chef_id,
            title,
            ingredients,
            preparations,
            information,
        } = req.body;

        try {
            const recipe = await Recipe.update({
                id: req.params.id,
                fieldsData: {
                    chef_id,
                    title,
                    ingredients: `{${ingredients}}`,
                    preparations: `{${preparations}}`,
                    information,
                },
            });

            if (req.files) {
                const recipeFilesPromises = req.files.map((file) =>
                    Recipe.createFile({ file, recipe_id: recipe.id })
                );

                await Promise.all(recipeFilesPromises);
            }

            if (req.body.removed_files) {
                const removedFilesId = req.body.removed_files.split(',');

                removedFilesId.splice(removedFilesId.length - 1, 1);

                const removedFilesPromises = removedFilesId.map((id) =>
                    Recipe.deleteFile({
                        file_id: parseInt(id, 10),
                        recipe_id: recipe.id,
                    })
                );

                await Promise.all(removedFilesPromises);
            }

            return res.redirect(
                301,
                `/admin/recipes/${recipe.id}?success=Receita editada com sucesso`
            );
        } catch (err) {
            return res.render('admin/recipes/edit', {
                error:
                    'Houve um erro ao editar a receita. Por favor, tente novamente',
                recipe: req.body,
            });
        }
    }

    async delete(req, res) {
        try {
            await Recipe.delete(req.params.id);
            return res.redirect(
                301,
                `/admin/recipes?success=Receita deletada com sucesso`
            );
        } catch (err) {
            return res.render('admin/recipes/edit', {
                error:
                    'Houve um erro ao deletar a receita. Por favor, tente novamente',
                recipe: req.body,
            });
        }
    }
}

module.exports = new RecipesAdminController();
