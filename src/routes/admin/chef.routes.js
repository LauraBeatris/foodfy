const express = require('express');

const routes = express.Router();

const ChefsAdminController = require('../../app/controllers/admin/ChefsController');
const ChefValidator = require('../../app/validators/ChefValidator');

const adminMiddleware = require('../../app/middlewares/admin');
const uploadMiddleware = require('../../app/middlewares/multer');

routes
    .get('/chefs', ChefsAdminController.index)
    .get('/chefs/create', adminMiddleware, ChefsAdminController.create)
    .get('/chefs/create', adminMiddleware, ChefsAdminController.create)

    .get('/chefs/:id', ChefsAdminController.show)
    .get('/chefs/:id/edit', adminMiddleware, ChefsAdminController.edit)

    .post(
        '/chefs',
        [
            adminMiddleware,
            uploadMiddleware.single('avatar'),
            ChefValidator.postFields,
            ChefValidator.post,
        ],
        ChefsAdminController.post
    )
    .put(
        '/chefs/:id',
        adminMiddleware,
        [
            uploadMiddleware.single('avatar'),
            ChefValidator.putFields,
            ChefValidator.put,
        ],
        ChefsAdminController.put
    )
    .delete(
        '/chefs/:id',
        [adminMiddleware, ChefValidator.delete],
        ChefsAdminController.delete
    );

module.exports = routes;
