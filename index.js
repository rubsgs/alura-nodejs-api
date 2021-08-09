const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log(`servidor em execução`);
});

app.get('/atendimentos', (req, res) => {
    res.send('Você está na rota de atendimentos e está realizando um GET');
});