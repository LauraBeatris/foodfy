const fs = require('fs');
const data = require('../../data');

/* 
    This controller is responsable for the recipe operations (CRUD) and also rendering the screens that 
    handle that operations, which are provided by the admin routes,
    Public Routes doesn't need to access this controller because they only need to list and show data and not
    to realize database operations.
*/
class RecipesController {
    index(_, res) {
        return res.render('admin/recipes/index', { recipes: data.recipes });
    }

    create(_, res) {
        return res.render('admin/recipes/create');
    }

    post(req, res) {
        try {
            // validate(req.body)
            const {
                title,
                author,
                image,
                ingredients,
                preparations,
                information,
            } = req.body;
            const recipe = {
                title,
                author,
                image,
                ingredients,
                preparations,
                information,
            };

            const updatedRecipes = [...data.recipes, recipe];
            data.recipes = updatedRecipes;

            return fs.writeFile(
                'src/data.json',
                JSON.stringify(data, null, 2),
                (error) => {
                    if (error) throw new Error(error.message);
                    return res.redirect(
                        301,
                        `/admin/recipes/${data.recipes.length - 1}`
                    );
                }
            );
        } catch (err) {
            const errorData = {
                message: err.message,
                name: err.name,
                status: err.status || 500,
            };

            return res.status(errorData.status).json({
                error: 'Houve um erro durante a criação de uma receita',
                errorData,
            });
        }
    }

    show(req, res) {
        const recipe = data.recipes[req.params.id];
        if (!recipe) return res.send('Recipe not found');

        return res.render('admin/recipes/show', {
            recipe: { id: req.params.id, ...recipe },
        });
    }

    edit(req, res) {
        const recipe = data.recipes[req.params.id];
        return res.render('admin/recipes/edit', {
            recipe: { id: req.params.id, ...recipe },
        });
    }

    put(req, res) {
        const recipe = data.recipes[req.params.id];
        if (!recipe) return res.send('Recipe not found');

        const updatedRecipe = {
            ...recipe,
            ...req.body,
        };

        const updatedRecipes = data.recipes.map((recipeData, index) => {
            if (index === Number(req.params.id)) return updatedRecipe;
            return recipeData;
        });

        data.recipes = updatedRecipes;

        return fs.writeFile(
            'src/data.json',
            JSON.stringify(data, null, 2),
            (error) => {
                if (error) throw new Error(error.message);
                return res.redirect(`/admin/recipes/${req.params.id}`);
            }
        );
    }

    delete(req, res) {
        try {
            const recipe = data.recipes[req.params.id];
            if (!recipe) return res.send('Recipe not found');

            const filteredRecipes = data.recipes.filter(
                (_, index) => index !== Number(req.params.id)
            );
            data.recipes = filteredRecipes;

            return fs.writeFile(
                'src/data.json',
                JSON.stringify(data, null, 2),
                (error) => {
                    if (error) throw new Error(error.message);
                    return res.redirect('/admin/recipes');
                }
            );
        } catch (err) {
            const errorData = {
                message: err.message,
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

module.exports = new RecipesController();
