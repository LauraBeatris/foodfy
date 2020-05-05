const express = require('express');

const routes = express.Router();

const ChefsAdminController = require('../../app/controllers/admin/ChefsController');
const ChefValidator = require('../../app/validators/ChefValidator');
const adminMiddleware = require('../../app/middlewares/admin');

const upload = require('../../app/middlewares/multer');

routes.get('/chefs', ChefsAdminController.index);
routes.get('/chefs/create', adminMiddleware, ChefsAdminController.create);
routes.get('/chefs/:id', ChefsAdminController.show);
routes.get('/chefs/:id/edit', adminMiddleware, ChefsAdminController.edit);

routes.post(
    '/chefs',
    adminMiddleware,
    upload.single('avatar'),
    ChefValidator.postFields(),
    ChefValidator.post,
    ChefsAdminController.post
);

routes.put(
    '/chefs/:id',
    adminMiddleware,
    upload.single('avatar'),
    ChefValidator.putFields(),
    ChefValidator.put,
    ChefsAdminController.put
);
routes.delete(
    '/chefs/:id',
    adminMiddleware,
    ChefValidator.delete,
    ChefsAdminController.delete
);

module.exports = routes;
