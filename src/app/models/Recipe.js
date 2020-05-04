const fs = require('fs');
const db = require('../../config/database');
const File = require('./File');

class Recipe {
    all() {
        const query = `
                SELECT recipes.*, files.path as photo, chefs.name as chef_name FROM recipe_files
                FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY created_at DESC
            `;

        return db.query(query, null);
    }

    allByUser(userId) {
        const query = `
            SELECT recipes.*, files.path as photo, chefs.name as chef_name FROM recipe_files
            FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
            LEFT JOIN files ON (recipe_files.file_id = files.id)
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.user_id = $1
            ORDER BY created_at DESC
        `;

        return db.query(query, [userId]);
    }

    create(values) {
        const query = `
                INSERT INTO recipes (
                    chef_id,
                    user_id,
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

        return db.query(query, [
            values.chef_id,
            values.user_id,
            values.title,
            values.ingredients,
            values.preparations,
            values.information,
        ]);
    }

    find(id) {
        const query = `
                SELECT recipes.*, chefs.id as chef_id, chefs.name as chef_name, files.path as photo
                FROM recipe_files
                FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1
            `;

        return db.query(query, [id]);
    }

    findBy(values) {
        const query = `
                SELECT recipes.*, chefs.name AS chef_name, files.path as photo
                FROM recipe_files
                RIGHT JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.title ILIKE '%${values.filter}%'
                ORDER BY updated_at DESC
            `;

        return db.query(query, null);
    }

    update(values) {
        const query = `
                UPDATE recipes SET
                    chef_id = ($1),
                    title = ($2),
                    ingredients = ($3),
                    preparation = ($4),
                    information = ($5)
                WHERE recipes.id = $6
                RETURNING id
            `;

        return db.query(query, values);
    }

    delete(id) {
        const query = `
                DELETE FROM recipes WHERE id = $1
            `;

        return db.query(query, [id]);
    }

    chefOptions() {
        const query = `
                SELECT * FROM chefs ORDER BY name ASC
            `;

        return db.query(query, null);
    }

    async createFile(values) {
        const results = await File.create(values.file);
        const file = results.rows[0];

        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES (
                $1,
                $2
            )
        `;

        return db.query(query, [values.recipe_id, file.id]);
    }

    files(id) {
        const query = `
            SELECT recipe_files.*, files.path FROM recipe_files
            LEFT JOIN files ON (recipe_files.file_id = files.id)
            WHERE recipe_files.recipe_id = $1
        `;

        return db.query(query, [id]);
    }

    async deleteFile(values) {
        let query = `
            DELETE FROM recipe_files
            WHERE recipe_id = $1 AND file_id = $2
        `;

        await db.query(query, [values.recipe_id, values.file_id]);

        query = `
            SELECT * FROM files WHERE id = $1
        `;

        const fileResults = await db.query(query, [values.file_id]);
        const file = fileResults.rows[0];

        fs.unlinkSync(file.path);

        query = `
            DELETE FROM files
            WHERE id = $1
        `;

        return db.query(query, [values.file_id]);
    }
}

module.exports = new Recipe();
