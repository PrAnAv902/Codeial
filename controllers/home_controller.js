module.exports.home= function(req,res){
   console.log(req.cookies);
   res.cookie('dd',25);
    return res.render('home',{
        title:"Home"
    });
}

// module.exports.actionName = function(req,res){}