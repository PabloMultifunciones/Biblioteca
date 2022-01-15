const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js');
const middlewares = require('../middlewares.js');


router.get('/',middlewares.isLogged,indexController.index)

router.get('/delete/:id',middlewares.isLogged, indexController.delete);

router.get('/create',middlewares.isLogged, indexController.create);

router.post('/save',middlewares.isLogged, indexController.save);

router.get('/edit/:id',middlewares.isLogged, indexController.edit);

router.post('/update',middlewares.isLogged, indexController.update);

router.get('/register', indexController.register);

router.post('/register', indexController.saveRegister);

router.get('/login', middlewares.oneLogged, indexController.login);

router.post('/login', indexController.validateLogin);

router.get('/logout',middlewares.isLogged, indexController.logout);

module.exports = router;