const localStrategy=require('passport-local').Strategy;
var User=require('../backend/models/Users.js');


module.exports = function(passport){
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });

  passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
      done(err,user);
    });
  });
  passport.use('local-login',new localStrategy({usernameField:'email',passwordField:'password',passReqToCallback:true},function(req,email,password,done){
    User.findOne({'email':email},function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null,false,{message:"该用户不存在"});
      }
      if(!user.validPassword(password)){
        return done(null,false,{message:'密码错误'});
      }
      return done(null,user);

    })
  }) //login strategy
)};
