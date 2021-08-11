const Atendimento = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento
            .lista()
            .then(atendimentos => {
                res.status(200).json(atendimentos);
            })
            .catch(erro => {
                res.status(500).json(erro);
            });
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = req.params.id
        Atendimento
            .buscaPorId(id)
            .then(atendimento => {
                if(!atendimento){
                    res.status(404);
                    res.end();
                } else {
                    res.status(200).json(atendimento);
                }
            })
            .catch(erro => {
                res.status(500).json(erro);
            });
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimento
            .adiciona(atendimento)
            .then(resultado => {
                res.status(200).json(resultado);
            }).catch(erro => {
                res.status(400).json(erro);
            });
    });

    app.patch('/atendimentos/:id', (req,res) => {
        const id = +req.params.id;
        const valores = req.body;

        Atendimento
            .altera(id, valores)
            .then(resultado => {
                res.status(200).json(resultado);
            })
            .catch(erro => {
                res.status(400).json(erro);
        });
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = +req.params.id;
        Atendimento
            .deleta(id)
            .then(resultado => {
                if(resultado.affectedRows == 0){
                    res.status(404).end()
                } else {
                    res.status(200).json({id:id});
                }
            })
            .catch(erro => {
                res.status(500).json(erro);
            })
    });
}