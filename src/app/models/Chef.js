const db = require('../../config/database');
const Base = require('./Base');

class Chef extends Base {
    constructor() {
        super('chefs');
    }

    async findAll() {
        const query = `
                SELECT chefs.*, count(recipes) as total_recipes, files.path as avatar
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                LEFT JOIN files ON (files.id = chefs.file_id)
                GROUP BY chefs.id, files.id
            `;

        const results = await db.query(query, null);

        return results.rows;
    }

    async find(id) {
        const query = `
                SELECT chefs.*, count(recipes) as total_recipes,
                (
                    SELECT files.path
                    FROM chefs
                    RIGHT JOIN files ON (files.id = chefs.file_id)
                    WHERE chefs.id = $1
                ) AS avatar
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                WHERE chefs.id = $1
                GROUP BY chefs.id
            `;

        const results = await db.query(query, [id]);
        return results.rows[0];
    }

    async chefRecipes(id) {
        const query = `
                SELECT recipes.*, chefs.name as chef_name, files.path as photo
                FROM recipe_files
                FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                INNER JOIN chefs ON (recipes.chef_id = chefs.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                WHERE chefs.id = $1
            `;

        const results = await db.query(query, [id]);
        return results.rows;
    }
}

module.exports = new Chef();
