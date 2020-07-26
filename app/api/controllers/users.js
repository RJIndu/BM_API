const userModel = require('../models/users');
const bcrypt=require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');				
const { check, validationResult } = require('express-validator');

module.exports = {
	create: function(req, res, next) {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		var newuserObj=new userModel();
		newuserObj.name=req.body.title?req.body.name:'';
		newuserObj.email=req.body.email?req.body.email:'';
		newuserObj.password=req.body.password?req.body.password:'';
		newuserObj.address=req.body.address?req.body.address:'';
		newuserObj.phone=req.body.phone?req.body.phone:'';
		
		userModel.findOne({'email':newuserObj.email},function(err,user){
			if(err){
				
				next(err);
			}
			if(user){
				
				return res.status(500).json({status:"error"
				, message: "Already registered with this email id",email:newuserObj.email
				});						
				
			}

			userModel.create(newuserObj, function (err, result) {
				  if (err) 
				  	next(err);
				  else
					  res.json({status: "success", 
					  message: "User added successfully!!!",
					  userinfo: newuserObj});				  
				});
		});
	},

	authenticate: function(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
