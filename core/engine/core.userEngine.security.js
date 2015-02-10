/**
 * Created by Bozhidar on 27.12.2014 г..
 */
"use strict";

var crypto = require('crypto'),
    q = require('q');

var keylen = 16;

exports.hashPassword = function(password){
    var deferred = q.defer(),
        salt = crypto.randomBytes(16).toString('base64');

    crypto.pbkdf2(password, salt, 512, keylen, function(err, hashedPassword){
        if(err){
            deferred.reject(err);
        }
        deferred.resolve({password: hashedPassword.toString('base64'), salt: salt});
    });

    return deferred.promise;
};

exports.validatePassword = function(password, passwordHash, passwordSalt) {
    var deferred = q.defer();

    if(typeof password === null || typeof password === 'undefined'){
        deferred.resolve(false);
    }

    crypto.pbkdf2(password, passwordSalt, 512, keylen, function(err, hashedPassword){
        if(err){
            deferred.reject(err);
        }

        deferred.resolve(hashedPassword.toString('base64') === passwordHash);
    });

    return deferred.promise;
};
