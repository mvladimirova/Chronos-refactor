/**
 * Created by Bozhidar on 17.1.2015 г..
 */

"use strict";

var userModel = require('../db/models').user,
    security = require('./core.userEngine.security'),
    q = require('q'),
    jwt = require('jsonwebtoken'),
    fs = require('fs');

var expirationTime = 1200,
    configFile = JSON.parse(fs.readFileSync('server.json', 'utf8')),
    secret = configFile.secret;

exports.createUser = function(userObject){
    var deferred = q.defer();
    security.hashPassword(userObject['password'])
        .then(function(passwordObject){
            var newUser = new userModel({
                userName: userObject['userName'],
                email: userObject['email'],
                name: userObject['name'],
                password: passwordObject,
                groups: null
            });

            newUser.save(function(err, newUser){
                if(err){
                    deferred.reject(err);
                }
                deferred.resolve(newUser);
            });
        });

    return deferred.promise;
};

// The function checks the user information and it is valid it returns the
// token for the cache if not it returns null
var login = function(loginInformation, redisClient){
    var deferred = q.defer();

    userModel.findOne({$or:[{userName: loginInformation.userName}, {email: loginInformation.userName}]})
        .exec()
        .then(function(document){
            return cacheIfValid(document, loginInformation, redisClient);
        })
        .then(function(newToken){
            if(newToken === null){
                deferred.reject('Invalid User Name or Password');
            }
            deferred.resolve(newToken);
        });

    return deferred.promise;
};

var cacheIfValid = function (document, loginInformation, redisClient){
    var deferred = q.defer();

    security.validatePassword(loginInformation.password, document.password.password, document.password.salt)
        .then(function(result){
            if(result === false){
                deferred.resolve(null)
            }

            var profile = {
                firstName: document.name.firstName,
                lastName: document.name.lastName,
                userName: document.userName,
                email: document.email
            };

            var newToken = createToken(profile);
            redisClient.hmset(newToken, profile, function(err){
                if(err){
                    deffer.reject(err);
                }
                else{
                    redisClient.expire(newToken, expirationTime);
                }
            });

            deferred.resolve(newToken);
        })
        .catch(function (error){
            deferred.reject(error);
        });

    return deferred.promise;
};

var createToken = function(profileInformation){
    return jwt.sign(profileInformation, secret, { expiresInMinutes: expirationTime });
};

var isLogedIn = function(token, redisClient){
    var deferred = q.defer();

    redisClient.hgetall(token, function(error, reply){
        if(error){
            deferred.reject(error)
        } else{
          deferred.resolve(reply);
        }
    });

    return deferred.promise;
};

exports.isLogedIn = isLogedIn;
exports.login = login;