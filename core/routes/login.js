/**
 * Created by Bozhidar on 23.12.2014
 * Contains the login and create new user functionality
 */
"use strict";
var userEngine = require('../engine/core.userEngine'),
    userValidations = require('../engine/core.engine.validations').userValidations;

exports.login = function(redisClient, secret){
    return function(req, res){
        console.log(req.body);
        console.log(req.headers);
        var loginInformation = req.body.loginInformation;
        userEngine.login(loginInformation, redisClient)
            .then(function(token){
                res.json({ token: token });
                res.status(200);
                res.send(token);
            })
            .catch(function(err){
                res.status(401);
                res.send(err);
            });
    }
};

exports.createNewUser = function(req, res){
    var userObject = req.body.user;

    if(typeof userObject === 'undefined') {
        res.status(500).send('Invalid user context');
    }

    if(userValidations.validatePassword(userObject['password']) === false){
        res.status(500).send("Password is not secure enough!");
    }

    userEngine.createUser(userObject)
        .then(function(context){
            res.status(200).send("New user successfully created!");
        })
        .catch(function(error){
            res.status(500).send('User failed to register');
        });
};