const { Router } = require('express');

const {  getAcoes, addAcao, updateAcao, deleteAcao, getAcaoPorCodigo } = require('../controllers/acaoController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasAcoes = new Router();

rotasAcoes.route('/acao')
   .get(verificaJWT , getAcoes)
   .post(verificaJWT , addAcao)
   .put(verificaJWT , updateAcao)

rotasAcoes.route('/acao/:codigo')
   .get(verificaJWT , getAcaoPorCodigo)
   .delete(verificaJWT , deleteAcao)

module.exports = { rotasAcoes };