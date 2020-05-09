const { check } = require('express-validator');
const Chef = require('../models/Chef');
const { parseValidationErrors } = require('../../lib/utils');
const LoadChefsService = require('../services/LoadChefsService');

class ChefValidator {
    get postFields() {
        return [
            check('name').not().isEmpty().withMessage('Digite o nome do chef'),
        ];
    }

    post(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            return res.render('admin/chefs/create', {
                validationErrorMessages,
                chef: req.body,
            });
        }

        return next();
    }

    get putFields() {
        return [
            check('name').not().isEmpty().withMessage('Digite o nome do chef'),
        ];
    }

    async put(req, res, next) {
        const validationErrorMessages = parseValidationErrors(req);

        if (Object.keys(validationErrorMessages).length > 0) {
            const chef = await new LoadChefsService({
                filters: { id: req.params.id },
            }).execute();

            return res.render('admin/chefs/edit', {
                validationErrorMessages,
                chef,
            });
        }

        return next();
    }

    async delete(req, res, next) {
        const chefRecipes = await Chef.chefRecipes(req.params.id);

        if (chefRecipes.length > 0) {
            const chef = await new LoadChefsService({
                filters: { id: req.params.id },
            }).execute();

            return res.render('admin/chefs/edit', {
                error: 'Chefs que possuem receitas não podem ser deletados',
                chef,
            });
        }

        return next();
    }
}

module.exports = new ChefValidator();
