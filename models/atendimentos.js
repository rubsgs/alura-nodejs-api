const moment = require('moment');
const conexao = require('../infraestrutura/conexao');
class Atendimentos {
    adiciona(atendimento){
        const data = moment(atendimento.data, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');

        return new Promise((resolve, reject) => {
            if(moment(data).isSameOrAfter(dataCriacao)){
                const atendimentoDtCriacao = { ...atendimento, dataCriacao, data }
                const sql = 'INSERT INTO atendimentos SET ?';
                conexao.query(sql, atendimentoDtCriacao, (erro, resultados) => {
                    if(erro){
                        console.log(erro);
                        reject(erro)
                    } else {
                        console.log("atendimento criado com sucesso");
                        resolve(resultados);
                    }
                });
            } else {
                reject({'erro': 'A data do atendimento não pode ser anterior a data atual'});
            }

        });
    }
}

module.exports = new Atendimentos;