const db = require('../../config/database');

class Base {
    constructor(tableName) {
        this.table = tableName;
    }

    async create(fieldsData) {
        let query = `
            INSERT INTO ${this.table}
        `;

        const columns = Object.keys(fieldsData).join(',');
        const values = Object.values(fieldsData)
            .map((value) => `'${value}'`)
            .join(',');

        query += `
            (${columns})
            VALUES (${values})
            RETURNING id
        `;

        const results = await db.query(query);
        return results.rows[0];
    }

    async update({ id, fieldsData }) {
        if (!id) throw new Error('You must provide a id');

        let query = `
            UPDATE ${this.table} SET
        `;

        const fieldsValues = Object.entries(fieldsData)
            .map(([fieldName, fieldValue]) => `${fieldName} = '${fieldValue}'`)
            .join(',');

        query = `
            ${query}
            ${fieldsValues}
            WHERE id = ${id}
            RETURNING id
        `;

        const results = await db.query(query);
        return results.rows[0];
    }

    async findAll({ filters = {}, fields = [], endOfQuery = '' }) {
        const joinedFields = fields.length === 0 ? '*' : fields.join(',');

        let query = `
            SELECT
            ${joinedFields}
            FROM
            ${this.table}
        `;

        const findClauses = Object.entries(filters).map(
            ([filterClause, filterValues]) => {
                const clause = `${filterClause}`;
                const clausesValues = Object.entries(filterValues).map(
                    ([fieldName, fieldValue]) =>
                        `${fieldName} = '${fieldValue}'`
                );

                return `
                    ${clause}
                    ${clausesValues}
              `;
            }
        );

        query += `${findClauses} ${endOfQuery}`;

        const results = await db.query(query);
        return results.rows;
    }

    async findOne({ filters, fields = [] }) {
        const results = await this.findAll({ filters, fields });
        return results[0];
    }

    async delete(id) {
        const query = `
            DELETE FROM ${this.table} WHERE id = ${id}
        `;

        return db.query(query);
    }
}

module.exports = Base;
