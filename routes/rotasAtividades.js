const { Router } = require('express');

const { getAtividades, addAtividade, updateAtividade, deleteAtividade, getAtividadePorCodigo } = require('../controllers/atividadeController');
const { verificaJWT } = require('../controllers/segurancaController');
const rotasAtividades = new Router();

rotasAtividades.route('/atividade')
   .get(verificaJWT , getAtividades)
   .post(verificaJWT , addAtividade)
   .put(verificaJWT , updateAtividade)

rotasAtividades.route('/atividade/:codigo')
   .get(verificaJWT , getAtividadePorCodigo)
   .delete(verificaJWT , deleteAtividade)

module.exports = { rotasAtividades };