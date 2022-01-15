const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
});

conexion.connect((error) => {
    if(error){
        console.log("Hubo un error: "+ error);
    }else{
        console.log("Se conecto exitosamente a la base de datos");
    }
});

module.exports = conexion;