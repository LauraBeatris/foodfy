const express = require('express');

const routes = express.Router();

const ProfileController = require('../../app/controllers/admin/ProfileController');

// Rotas de perfil de um usuário logado
routes.get('/admin/profile', ProfileController.index); // Mostrar o formulário com dados do usuário logado
routes.put('/admin/profile', ProfileController.put); // Editar o usuário logado

module.exports = routes;
