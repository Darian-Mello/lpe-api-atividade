const { pool } = require('../config');
const Acao = require('../entities/acao')

const getAcoesDB = async () => {
    try {    
        const { rows } = await pool.query(`select p.codigo as codigo, p.nome as nome, p.descricao as descricao, p.atividade_id as atividade, c.nome as atividade_nome
        from acao p
        join atividade c on p.atividade_id = c.codigo
        order by p.codigo`);
        return rows.map((acao) => new Acao(acao.codigo, acao.nome, acao.descricao, acao.atividade, acao.atividade_nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addAcaoDB = async (body) => {
    try {   
        const { nome, descricao, atividade } = body; 
        const results = await pool.query(`INSERT INTO acao (nome, descricao, atividade_id) 
            VALUES ($1, $2, $3)
            returning codigo, nome, descricao, atividade_id`,
        [nome, descricao, atividade]);
        const acao = results.rows[0];
        return new Acao(acao.codigo, acao.nome, acao.descricao, atividade, "cavalo");
    } catch (err) {
        throw "Erro ao inserir o acao: " + err;
    }    
}

const updateAcaoDB = async (body) => {
    try {   
        const { codigo, nome, descricao, atividade }  = body; 
        const results = await pool.query(`UPDATE acao set nome = $2 , descricao = $3, atividade_id = $4 where codigo = $1 
        returning codigo, nome, descricao`,
        [codigo, nome, descricao, atividade]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const acao = results.rows[0];
        return new Acao(acao.codigo, acao.nome, acao.descricao, atividade, "");
    } catch (err) {
        throw "Erro ao alterar o acao: " + err;
    }      
}

const deleteAcaoDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM acao where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Acao removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o acao: " + err;
    }     
}

const getAcaoPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select p.codigo as codigo, p.nome as nome, p.descricao as descricao, p.atividade_id as atividade, c.nome as atividade_nome
        from acao p
        join atividade c on p.atividade_id = c.codigo where p.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const acao = results.rows[0];
            return new Acao(acao.codigo, acao.nome, acao.descricao, acao.atividade, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar o acao: " + err;
    }     
}

module.exports = {
    getAcoesDB, addAcaoDB, updateAcaoDB, deleteAcaoDB, getAcaoPorCodigoDB
}
