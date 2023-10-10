const { getAcoesDB, addAcaoDB, updateAcaoDB, deleteAcaoDB, getAcaoPorCodigoDB } = require('../usecases/acaoUseCases')

const getAcoes = async (request, response) => {
    await getAcoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os acaos: ' + err
        }));
}

const addAcao = async (request, response) => {
    await addAcaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Acao criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateAcao = async (request, response) => {
    await updateAcaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Acao alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteAcao = async (request, response) => {
    await deleteAcaoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getAcaoPorCodigo= async (request, response) => {
    await getAcaoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getAcoes, addAcao, updateAcao, deleteAcao, getAcaoPorCodigo
}

