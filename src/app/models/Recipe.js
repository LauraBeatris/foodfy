const db = require('../../config/database');

class Chef {
    all() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT recipes.*, count(recipes) as total_recipes 
                FROM recipes 
                LEFT JOIN recipes ON (recipes.chef_id = recipes.id)
                GROUP BY recipes.id
            `;

            db.query(query, null, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows);
            });
        });
    }

    // TODO -> Pagination (FRONT AND BACK)
    paginate() {}

    create(values) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO recipes (
                    chef_id,
                    image,
                    title,
                    ingredients,
                    preparation,
                    information
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $6
                ) RETURNING Id 
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows[0]);
            });
        });
    }

    find(values) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT recipes.* FROM recipes 
                LEFT JOIN recipes ON (recipes.chef_id = recipes.id)
                WHERE recipes.id = $1
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows[0]);
            });
        });
    }

    findBy() {}

    update(values) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE recipes SET 
                    name = ($1),
                    avatar_url = ($2)
                WHERE recipes.id = $3
                RETURNING id
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows[0]);
            });
        });
    }

    delete(values) {
        // NOW ALLOW IF THE CHEF HAS EXISTING RECIPES
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM recipes WHERE id = $1
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }
}

module.exports = new Chef();
