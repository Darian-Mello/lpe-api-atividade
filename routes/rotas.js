const { Router } = require('express');

const { rotasAtividades } = require('./rotasAtividades');

const { rotasAcoes} = require('./rotasAcoes');

const { login } = require('../controllers/segurancaController');

const rotas = new Router();

// rota para o login
rotas.route('/login').post(login);

rotas.use(rotasAtividades);
rotas.use(rotasAcoes);

module.exports = rotas;