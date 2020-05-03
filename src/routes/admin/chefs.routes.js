const express = require('express');

const routes = express.Router();

const ChefsAdminController = require('../../app/controllers/admin/ChefsController');
const upload = require('../../app/middlewares/multer');

routes.get('/chefs', ChefsAdminController.index);
routes.get('/chefs/create', ChefsAdminController.create);
routes.get('/chefs/:id', ChefsAdminController.show);
routes.get('/chefs/:id/edit', ChefsAdminController.edit);

routes.post('/chefs', upload.single('avatar'), ChefsAdminController.post);
routes.put('/chefs/:id', upload.single('avatar'), ChefsAdminController.put);
routes.delete('/chefs/:id', ChefsAdminController.delete);

module.exports = routes;
