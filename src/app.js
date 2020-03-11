const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

class App { 
    constructor() { 
        this.server = express()
        this.middlewares()
        this.routes()
        this.views()
    }

    middlewares() { 
        this.server.use(express.static(path.resolve(__dirname, 'public')))
    }

    routes () { 
        this.server.use(require('./routes'))
    }

    views () { 
        this.server.set('view engine', 'njk')
        nunjucks.configure(path.resolve(__dirname, 'app', 'views'), { 
            express: this.server,
            autoescape: false, 
            watch: true
        })
    }
}

module.exports = new App().server