const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,		
		required: false,
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	address: {
		type: String,
		trim: true,
		required: false
	},
	phone: {
		type: String,
		trim: true,
		required: false
	},
	isadmin: {
		type: Boolean,
		trim: true,
		required: false
	}
});

UserSchema.pre('save', function(next){	
this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(5),null);
next();
});

module.exports = mongoose.model('Users', UserSchema);