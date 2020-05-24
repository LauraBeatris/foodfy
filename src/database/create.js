require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pgtools = require('pgtools');

const db = require('../config/database');

const rootDir = path.resolve(__dirname, '..', '..');
const databaseSQLFilePath = path.resolve(rootDir, 'database.sql');

const databaseConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
};

async function migrate() {
    const createDatabaseSQL = await fs
        .readFileSync(databaseSQLFilePath)
        .toString();

    await pgtools
        .dropdb(databaseConfig, process.env.DB_DATABASE)
        .catch((err) => {
            if (err.name !== 'invalid_catalog_name') {
                // eslint-disable-next-line no-console
                console.log('Failed to delete database ❌');
                process.exit(1);
            }
        });

    // eslint-disable-next-line no-console
    console.log('Creating database ...');

    await pgtools.createdb(databaseConfig, process.env.DB_DATABASE);
    await db.query(createDatabaseSQL);

    // eslint-disable-next-line no-console
    console.log('Database and tables created 🚀');
}

migrate();
