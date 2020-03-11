const express = require('express')
const routes = express.Router()

const recipes = require('./data')

routes.get('/', (_, res) => res.render('index', { recipes }))
routes.get('/receitas', (_, res) => res.render('recipes', { recipes }))
routes.get('/receitas/:recipe_index', (req, res) => { 
    const { recipe_index } = req.params  
    const recipe = recipes[recipe_index]

    res.render('recipe', { recipe })
})
routes.get('/sobre', (_, res) => res.render('about'))


module.exports = routes