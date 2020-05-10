require('dotenv/config');
const express = require('express');
const i18n = require('i18n');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const session = require('./config/session');
const templateEngine = require('./config/templateEngine');
const routes = require('./routes');

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
        this.views();
    }

    middlewares() {
        this.express.use(express.static('public'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(methodOverride('_method'));
        this.express.use(session);

        i18n.configure({
            locales: ['en', 'pt'],
            defaultLocale: 'pt',
            cookie: 'foodfy:locale',
            directory: path.resolve(__dirname, 'locales'),
            queryParameter: 'lang',
            objectNotation: true,
        });
        this.express.use(cookieParser());
        this.express.use(i18n.init);
    }

    routes() {
        this.express.use(routes);
    }

    views() {
        this.express.set('view engine', 'njk');
        templateEngine.init(this.express);
    }
}

module.exports = new App().express;
