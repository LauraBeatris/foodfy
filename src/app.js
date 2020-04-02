require('dotenv/config');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
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
    }

    routes() {
        this.express.use(routes);
    }

    views() {
        this.express.set('view engine', 'njk');
        nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
            express: this.express,
            autoescape: false,
            watch: true,
        });
    }
}

module.exports = new App().express;
