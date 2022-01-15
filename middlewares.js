const middlewares = {
    isLogged : function(req,res,next){
        if(req.session.logged){
            return next();
        }
        res.redirect('/login');
    },
    oneLogged : function(req,res,next){
        if(req.session.logged){
            res.redirect('/');
        }
        return next();
    }
}

module.exports = middlewares;