const Recipe = require('../models/Recipe');

class LoadRecipesService {
    constructor({ filters, user } = {}) {
        this.filters = filters;
        this.user = user;
    }

    async execute() {
        const { filters, user } = this;

        if (filters && filters.search) {
            const recipes = await this.loadSearchedRecipes(filters.search);
            return recipes;
        }

        if (filters && filters.recipe_id) {
            const chef = await this.loadOneRecipe(filters.recipe_id);
            return chef;
        }

        const chefs = this.loadAllRecipes(user);
        return chefs;
    }

    formatRecipe(recipe) {
        return {
            ...recipe,
            photo: recipe.photo
                ? recipe.photo.replace('public', '')
                : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
        };
    }

    formatFile(file) {
        return {
            ...file,
            path: file.path
                ? file.path.replace('public', '')
                : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
        };
    }

    async loadAllRecipes(user) {
        let recipes =
            user && user.is_admin
                ? await Recipe.findAllByUser(user.id)
                : await Recipe.findAll();

        recipes = recipes.map(this.formatRecipe);

        return recipes;
    }

    async loadOneRecipe(recipeId) {
        let recipe = await Recipe.findOne(recipeId);

        if (!recipe) throw new Error('Recipe not found');

        let files = await Recipe.files(recipeId);

        files = files.map(this.formatFile);
        recipe = this.formatRecipe(recipe);

        return { files, recipe };
    }

    async loadSearchedRecipes(filter) {
        let recipes = await Recipe.findBy({ filter });
        recipes = recipes.map(this.formatRecipe);

        return recipes;
    }
}

module.exports = LoadRecipesService;
