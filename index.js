const customExpress = require('./config/custom-express');
app = customExpress();

app.listen(3000, () => {
    console.log(`servidor em execução`);
});