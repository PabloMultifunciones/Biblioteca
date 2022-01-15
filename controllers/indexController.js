const conexion = require('../database/config.js');

const bcryptjs = require('bcryptjs');

exports.index = (req,res) => {
    conexion.query('SELECT * FROM libros',(error,result) => {
        if(error){
            throw error;
        }else{
            res.render('index',{books: result});
        }
    });
}

exports.delete = (req,res) => {
    const id = req.params.id;
    conexion.query(`DELETE FROM libros WHERE id = ${id}`, (error,result) => {
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    });
}

exports.create = (req,res) => {
    res.render('create');
}

exports.save = (req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const specimens = req.body.specimens;
    
    conexion.query("INSERT INTO libros SET ?",{title : title, description: description, author: author, specimens: specimens}, (error,result) => {
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    });
}

exports.edit = (req,res) => {
    const id = req.params.id;
    
    conexion.query(`SELECT * FROM libros WHERE id = ${id}`, (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('edit',{book : results[0]})
        }
    })
}

exports.update = (req,res) => {
    const id = req.body.id;
    const title  = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const specimens = req.body.specimens;
    
    conexion.query(`UPDATE libros SET ? WHERE id = ${id}`,{title: title, description: description, author: author, specimens: specimens}, (error, result) =>{
        if(error){
            throw error;
        }else{
            res.redirect('/');
        }
    })

}

exports.register = (req,res) => {
    res.render('register');
}

exports.saveRegister = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const passwordhash = await bcryptjs.hash(password,8);
    conexion.query('INSERT INTO users SET ?',{username: username, password: passwordhash},(error,results) => {
        if(error){
            throw error;
        }else{
            req.session.logged = true;
            res.redirect('/');
        }
    });
}

exports.login = (req,res) => {
    res.render('login');
}

exports.validateLogin = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        conexion.query("SELECT * FROM users WHERE username = ?",[username], async(error,results) => {
            if(results.length == 0 || !(await bcryptjs.compare(password,results[0].password))){
                res.redirect('login');
            }else{
                req.session.logged = true;
                res.redirect('/');
            }
        });
    }else{
        res.send("INGRESE USER Y PASSWORD")
    }
}

exports.logout = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}