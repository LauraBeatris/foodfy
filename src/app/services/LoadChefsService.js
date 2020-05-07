const pluralize = require('pluralize');
const Chef = require('../models/Chef');

class LoadChefsService {
    constructor({ filters } = {}) {
        this.filters = filters;
    }

    async execute() {
        const { filters } = this;

        if (filters) {
            const chef = this.loadOneChef(filters);
            return chef;
        }

        const chefs = await this.loadAllChefs();
        return chefs;
    }

    format(chef) {
        return {
            ...chef,
            total_recipes: `${chef.total_recipes} ${pluralize(
                'receitas',
                parseInt(chef.total_recipes, 10)
            )}`,
            avatar: chef.avatar.replace('public', ''),
        };
    }

    async loadAllChefs() {
        let chefs = await Chef.findAll();

        chefs = chefs.map((chef) => this.format(chef));

        return chefs;
    }

    async loadOneChef(filters) {
        const chef = await Chef.find(filters.id);

        return this.format(chef);
    }
}

module.exports = LoadChefsService;
