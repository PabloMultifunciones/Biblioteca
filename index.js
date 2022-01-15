const express = require('express');
const app = express();

const session = require('express-session');

app.set('view engine','ejs');

app.use(session({
    secret: 'clave',
    resave: false,
    saveUninitialized: true
}));


//ESTO ES VITAL PARA PODER RECIBIR PETICIONES POST
app.use(express.urlencoded({extended:false}));


app.use('/',require('./routes/web.js'));

app.listen(5000,() => {
    console.log("El servidor esta iniciado: http://localhost:5000");
});