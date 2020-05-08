const fs = require('fs');
const db = require('../../config/database');
const File = require('./File');
const Base = require('./Base');

class Recipe extends Base {
    constructor() {
        super('recipes');
    }

    async findOne(id) {
        const query = `
                SELECT recipes.*, chefs.id as chef_id, chefs.name as chef_name, files.path as photo
                FROM recipe_files
                FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1
            `;

        const results = await db.query(query, [id]);
        return results.rows[0];
    }

    async findAll() {
        const query = `
                SELECT recipes.*, files.path as photo, chefs.name as chef_name FROM recipe_files
                FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ORDER BY created_at DESC
            `;

        const results = await db.query(query);
        return results.rows;
    }

    async findAllByUser(userId) {
        const query = `
            SELECT recipes.*, files.path as photo, chefs.name as chef_name FROM recipe_files
            FULL JOIN recipes ON (recipe_files.recipe_id = recipes.id)
            LEFT JOIN files ON (recipe_files.file_id = files.id)
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.user_id = $1
            ORDER BY created_at DESC
        `;

        const results = await db.query(query, [userId]);
        return results.rows;
    }

    async findBy(values) {
        const query = `
                SELECT recipes.*, chefs.name AS chef_name, files.path as photo
                FROM recipe_files
                RIGHT JOIN recipes ON (recipe_files.recipe_id = recipes.id)
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE 1 = 1
                AND recipes.title ILIKE '%${values.filter}%'
                ORDER BY updated_at DESC
            `;

        const results = await db.query(query);
        return results.rows;
    }

    async chefOptions() {
        const query = `
                SELECT * FROM chefs ORDER BY name ASC
            `;

        const results = await db.query(query);
        return results.rows;
    }

    async createFile(values) {
        const file = await File.create({
            name: values.file.filename,
            path: values.file.path,
        });

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

    async files(id) {
        const query = `
            SELECT recipe_files.*, files.path FROM recipe_files
            LEFT JOIN files ON (recipe_files.file_id = files.id)
            WHERE recipe_files.recipe_id = $1
        `;

        const results = await db.query(query, [id]);
        return results.rows;
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
