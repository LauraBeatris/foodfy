const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const db = require('./database');

module.exports = session({
    cookie: {
        store: db,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    secret: process.env.APP_SECRET,
    store: new PgSession({
        pool: db,
        tableName: 'session',
    }),
});
