class Tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criaStatusAtendimentos();
        this.criaStatusClientes();
        this.criaStatusPets();
        this.criaPets();
        this.criaClientes();
        this.criaAtendimentos();
    }

    criaStatusAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS status_atendimentos( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50) )';
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela status_atendimentos criada com sucesso');
            }
        });
    }

    criaStatusClientes() {
        const sql = 'CREATE TABLE IF NOT EXISTS status_clientes( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50) )';
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela status_clientes criada com sucesso');
            }
        });
    }

    criaStatusPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS status_pets( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(50) )';
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela status_pets criada com sucesso');
            }
        });
    }

    criaClientes() {
        const sql = 'CREATE TABLE IF NOT EXISTS clientes ( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(200), idStatus INT NOT NULL, CONSTRAINT fk_cliente_status_cliente FOREIGN KEY(idStatus) REFERENCES status_clientes(id) );';
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela clientes criada com sucesso');
            }
        });
    }

    criaPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS pets ( id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(80), idStatus INT NOT NULL, CONSTRAINT fk_pet_status_pet FOREIGN KEY(idStatus) REFERENCES status_pets(id) );';
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela atendimentos criada com sucesso');
            }
        });
    }

    criaAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos ( id INT PRIMARY KEY AUTO_INCREMENT, data DATETIME, idCliente INT NOT NULL, idPet INT NOT NULL, idStatus INT NOT NULL, observacao TEXT, dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fk_atendimento_cliente FOREIGN KEY(idCliente) REFERENCES clientes(id), CONSTRAINT fk_atendimento_pet FOREIGN KEY(idPet) REFERENCES pets(id), CONSTRAINT fk_atendimentos_status_atendimento FOREIGN KEY(idStatus) REFERENCES status_atendimentos(id) );';
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela atendimentos criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;