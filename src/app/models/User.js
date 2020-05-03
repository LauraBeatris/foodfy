const db = require('../../config/database');

class User {
    all() {
        const query = `
            SELECT * FROM users
            ORDER BY created_at DESC
        `;

        return db.query(query);
    }

    findOne(filters) {
        let query = `
            SELECT * FROM users
        `;

        // WHERE | OR | AND
        Object.keys(filters).forEach((key) => {
            query = `${query}
          ${key}
        `;

            // QUERY COLUMNS
            Object.keys(filters[key]).forEach((column) => {
                query = `
            ${query}
            ${column} = '${filters[key][column]}'
          `;
            });
        });

        return db.query(query);
    }

    create(values) {
        const query = `
            INSERT INTO users (
                name,
                email,
                password,
                is_admin
            ) VALUES (
                $1,
                $2,
                $3,
                $4
            ) RETURNING id
        `;

        const userValues = [
            values.name,
            values.email,
            values.password,
            !!values.is_admin,
        ];

        return db.query(query, userValues);
    }

    update(values) {
        const { userData, id } = values;

        let query = `
            UPDATE users SET
        `;

        Object.keys(userData).forEach((column, index, array) => {
            if (index + 1 < array.length) {
                query = `
                    ${query}
                    ${column} = '${userData[column]}',
                `;
            } else {
                query = `
                    ${query}
                    ${column} = '${userData[column]}'
                `;
            }
        });

        query = `
            ${query}
            WHERE id = ${id}
        `;

        return db.query(query);
    }

    delete(id) {
        const query = `
            DELETE FROM users WHERE id = $1
        `;

        return db.query(query, [id]);
    }
}

module.exports = new User();
