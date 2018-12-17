/*
* @Author: gaopeng
* @Email:  gaopeng_hdu@163.com
* @Date:   2018-04-03 10:44:36
* @Last Modified by:   gaopeng
* @Last Modified time: 2018-04-03 14:07:32
*/

'use strict';

var mongoose = require('mongoose'),
	bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var UserSchema = mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    	if (err) return next(err);

    	// hash the password along with our new salt
    	bcrypt.hash(user.password, salt, function (err, hash) {
    		if (err) return next(err);

    		// override the cleartext password with the hashed one
            user.password = hash;
            next();
    	});
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
        cb(null, isMatch);
	});
};

UserSchema.statics.findByUsername = function (username, cb) {
  this.findOne({ username: username }, cb);
};

module.exports = mongoose.model('User', UserSchema)