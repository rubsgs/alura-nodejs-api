const customExpress = require('./config/custom-express');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');
conexao.connect((erro) => {
    if(erro) {
        console.log(erro);
    } else {
        Tabelas.init(conexao);
        app = customExpress();
        
        app.listen(3000, () => {
            console.log(`servidor em execução`);
        });
    }
});