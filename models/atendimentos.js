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
                        resolve(atendimento);
                    }
                });
            } else {
                reject({'erro': 'A data do atendimento não pode ser anterior a data atual'});
            }

        });
    }

    lista() {
        const sql = 'SELECT * FROM atendimentos;';
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resultados) => {
                if(erro){
                    reject(erro);
                }
                resolve(resultados);
            });
        });
    }

    buscaPorId(id){
        const sql = `SELECT * FROM atendimentos WHERE id=${+id}`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resultado) => {
                if(erro){
                    reject(erro);
                }
                resolve(resultado[0]);
            });
        });
    }

    altera(id, valores) {
        if(valores.data){
            const data = moment(valores.data, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            valores.data = data;
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, [valores, id], (erro, resultado) => {
                if(erro){
                    reject(erro);
                }
                resolve({...valores, id});
            });
        });
    }

    deleta(id){
        const sql = 'DELETE FROM atendimentos WHERE id=?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (erro, resultados) => {
                if(erro){
                    reject(erro);
                }
                resolve(resultados);
            })
        });
    }
}

module.exports = new Atendimentos;