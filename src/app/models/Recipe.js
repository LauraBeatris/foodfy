const db = require('../../config/database');

class Chef {
    all() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT recipes.*, chefs.name as chef_name
                FROM recipes 
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
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
                    $5,
                    $6
                ) RETURNING id
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
                SELECT recipes.*, chefs.id as chef_id, chefs.name as chef_name FROM recipes 
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows[0]);
            });
        });
    }

    findBy(values) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT recipes.*, chefs.name AS chef_name
                FROM recipes 
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.name ILIKE '%${values.filter}%'
            `;

            db.query(query, null, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows);
            });
        });
    }

    update(values) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE recipes SET 
                    chef_id = ($1),
                    image = ($2),
                    title = ($3),
                    ingredients = ($4),
                    preparation = ($5),
                    information = ($6)
                WHERE recipes.id = $7
                RETURNING id
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows[0]);
            });
        });
    }

    delete(values) {
        // NOT ALLOW IF THE CHEF HAS EXISTING RECIPES
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

    chefOptions() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM chefs ORDER BY name ASC
            `;

            db.query(query, null, (error, results) => {
                if (error) return reject(error);
                return resolve(results.rows);
            });
        });
    }
}

module.exports = new Chef();
