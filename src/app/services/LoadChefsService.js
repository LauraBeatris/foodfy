const Chef = require('../models/Chef');

class LoadChefsService {
    constructor({ filters } = {}) {
        this.filters = filters;
    }

    async execute() {
        const { filters = {} } = this;

        if (filters.id) {
            const chef = this.loadOneChef(filters);
            return chef;
        }

        if (filters.chef_id) {
            const chefRecipes = this.loadChefRecipes(filters.chef_id);
            return chefRecipes;
        }

        const chefs = await this.loadAllChefs();
        return chefs;
    }

    formatChef(chef) {
        return {
            ...chef,
            // total_recipes: `${chef.total_recipes} ${pluralize(
            //     'receitas',
            //     parseInt(chef.total_recipes, 10)
            // )}`,
            total_recipes: chef.total_recipes,
            avatar: chef.avatar.replace('public', ''),
        };
    }

    formatRecipe(recipe) {
        return {
            ...recipe,
            photo: recipe.photo
                ? recipe.photo.replace('public', '')
                : 'https://place-hold.it/172x80?text=Receita%20sem%20foto',
        };
    }

    async loadAllChefs() {
        let chefs = await Chef.findAll();

        chefs = chefs.map(this.formatChef);

        return chefs;
    }

    async loadOneChef(filters) {
        const chef = await Chef.find(filters.id);

        return this.formatChef(chef);
    }

    async loadChefRecipes(chefId) {
        let chefRecipes = await Chef.chefRecipes(chefId);
        chefRecipes = chefRecipes.map(this.formatRecipe);

        return chefRecipes;
    }
}

module.exports = LoadChefsService;
