const { pool } = require('../config');
const Atividade = require('../entities/atividade');

const getAtividadesDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM atividade ORDER BY nome`);
        return rows.map((atividade) => new Atividade(atividade.codigo, atividade.nome));
    } catch (err){
        throw "Erro: " + err;
    }
}

const addAtividadeDB = async (body) => {
    try {   
        const { nome } = body; 
        const results = await pool.query(`INSERT INTO atividade (nome) 
            VALUES ($1)
            returning codigo, nome`,
        [nome]);
        const atividade = results.rows[0];
        return new Atividade(atividade.codigo, atividade.nome); 
    } catch (err) {
        throw "Erro ao inserir a atividade: " + err;
    }    
}


const updateAtividadeDB = async (body) => {
    try {   
        const { codigo, nome }  = body; 
        const results = await pool.query(`UPDATE atividade set nome = $2 where codigo = $1 
        returning codigo, nome`,
        [codigo, nome]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const atividade = results.rows[0];
        return new Atividade(atividade.codigo, atividade.nome); 
    } catch (err) {
        throw "Erro ao alterar a atividade: " + err;
    }      
}

const deleteAtividadeDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM atividade where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Atividade removida com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover a atividade: " + err;
    }     
}

const getAtividadePorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM atividade where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const atividade = results.rows[0];
            return new Atividade(atividade.codigo, atividade.nome); 
        }       
    } catch (err) {
        throw "Erro ao recuperar a atividade: " + err;
    }     
}

module.exports = {
    getAtividadesDB, addAtividadeDB, updateAtividadeDB, deleteAtividadeDB, getAtividadePorCodigoDB
}