const db = require('../../config/database');

class User {
    async findOne(filters) {
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

    async create(values) {
        const query = `
            INSERT INTO users (
                name,
                email,
                is_admin
            ) VALUES (
                $1,
                $2,
                $3
            ) RETURNING id
        `;

        const userValues = [values.name, values.email, !!values.is_admin];

        return db.query(query, userValues);
    }

    async update(values) {
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
}

module.exports = new User();
