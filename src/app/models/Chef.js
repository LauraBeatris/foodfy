const db = require('../../config/database');

class Chef {
    all() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT chefs.*, count(recipes) as total_recipes 
                FROM chefs 
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
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
                INSERT INTO chefs (
                    name,
                    avatar_url
                ) VALUES (
                    $1,
                    $2
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
                SELECT chefs.* FROM chefs 
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                WHERE chefs.id = $1
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
                UPDATE chefs SET 
                    name = ($1),
                    avatar_url = ($2)
                WHERE chefs.id = $3
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
                DELETE FROM chefs WHERE id = $1
            `;

            db.query(query, values, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }
}

module.exports = new Chef();
