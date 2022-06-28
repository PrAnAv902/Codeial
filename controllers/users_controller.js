const { resolveInclude } = require('ejs');
const User=require('../models/user');
module.exports.profile = function(req,res){
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id,function(err,user){
        if(user){
            return res.render('users',{
                title:"User Profile",
                user: user
            });
        }
    });
   }else{
     return res.redirect('/users/sign-in');
   }
   

}
//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | SignUp"
    });
}
//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    });
}

//get the sign up data
module.exports.create=function(req,res){
      if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
      }
      User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
             
        }
      });
}
//get the sign in data and create a session for user
module.exports.createSession=function(req,res){
User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('Error in finding user in signing in');
        return;
    }
    if(user){
        if(user.password!=req.body.password){
            return res.redirect('back');
        }

        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    }
    else{
        return res.redirect('/users/sign-up');
        }
})
}
