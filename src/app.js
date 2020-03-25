const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const bodyParser = require('body-parser')

class App { 
    constructor() { 
        this.server = express()
        this.middlewares()
        this.routes()
        this.views()
    }

    middlewares() { 
        this.server.use(express.static(path.resolve(__dirname, 'public')))
        this.server.use(bodyParser.urlencoded({extended: true}))
    }

    routes () { 
        this.server.use(require('./routes'))
    }

    views (req, res) { 
        this.server.set('view engine', 'njk')
        nunjucks.configure(path.resolve(__dirname, 'app', 'views'), { 
            express: this.server,
            autoescape: true, 
            watch: true
        })
    }
}

module.exports = new App().server