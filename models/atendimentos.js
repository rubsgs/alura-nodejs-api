const conexao = require('../infraestrutura/conexao');
class Atendimentos {
    adiciona(atendimento){
        const dataCriacao = new Date();
        const atendimentoDtCriacao = { ...atendimento, dataCriacao }
        const sql = 'INSERT INTO atendimentos SET ?';
        conexao.query(sql, atendimento, (erro, resultados) => {
            if(erro){
                console.log(erro);
            } else {
                console.log(resultados);
            }
        });
    }
}

module.exports = new Atendimentos;