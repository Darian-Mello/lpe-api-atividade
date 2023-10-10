const { getAtividadesDB, addAtividadeDB, 
    updateAtividadeDB, deleteAtividadeDB, getAtividadePorCodigoDB } 
    = require('../usecases/atividadeUseCases')

const getAtividades = async (request, response) => {
    // capturando o usuario que foi enviado pelo next do verificaJWT
    console.log('Usuario no getAtividades' + 
    JSON.stringify(request.usuario));
    await getAtividadesDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as atividades: ' + err
          }))
}

const addAtividade = async (request, response) => {
    await addAtividadeDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Atividade criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAtividade = async (request, response) => {
    await updateAtividadeDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Atividade alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAtividade = async (request, response) => {
    await deleteAtividadeDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getAtividadePorCodigo= async (request, response) => {
    await getAtividadePorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getAtividades, addAtividade, updateAtividade, deleteAtividade, getAtividadePorCodigo
}