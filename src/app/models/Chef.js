const db = require('../../config/database');

class Chef {
    all() {
        const query = `
                SELECT chefs.*, count(recipes) as total_recipes, files.path as avatar
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                LEFT JOIN files ON (files.id = chefs.file_id)
                GROUP BY chefs.id, files.id
            `;

        return db.query(query, null);
    }

    create(values) {
        const query = `
                INSERT INTO chefs (
                    name,
                    file_id
                ) VALUES (
                    $1,
                    $2
                ) RETURNING id
            `;

        return db.query(query, values);
    }

    find(id) {
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

        return db.query(query, [id]);
    }

    findBy() {}

    update(values) {
        const query = `
                UPDATE chefs SET
                    name = ($1),
                    file_id = ($2)
                WHERE chefs.id = $3
                RETURNING id
            `;

        return db.query(query, [values.name, values.file_id, values.id]);
    }

    delete(values) {
        const query = `
                DELETE FROM chefs WHERE id = $1
            `;

        return db.query(query, values);
    }

    chefRecipes(id) {
        const query = `
                SELECT recipes.*, chefs.name as chef_name, files.path as photo
                FROM recipe_files
                INNER JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                INNER JOIN chefs ON (recipes.chef_id = chefs.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                WHERE chefs.id = $1
            `;

        return db.query(query, [id]);
    }
}

module.exports = new Chef();
