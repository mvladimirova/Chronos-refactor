/**
 * Created by Bozhidar on 17.1.2015 г..
 */

var should = require('should'),
    userEngine = require('../engine/core.userEngine'),
    userModel = require('../db/models').user,
    redis = require('redis'),
    mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/chronosDB');
var db = mongoose.connection;

// Connect to redis
var redisClient = redis.createClient();
redisClient.on("error", function(err){
    console.log("An error occurred with redis:" + err);
});


var testUser = {
    userName: "testUser",
    email: "testUser@mail.com",
    name: {firstName:"User", lastName: "Test"},
    password: "Password123"
}

//For these tests to run mongo should be running
//describe('TestUserCreation', function() {
//    it('testUserCreation', function(){
//        userEngine.createUser(testUser)
//            .then(function(response){
  //              response.password.should.be.ok;
  //              done();
  //          })
  //  })
//});

// Mongo and Redis should be running
// we will asume that you have the above test user added to the collection
//describe('TestUserLogin', function(){
 //   it('testLogin', function(){
        //userEngine.login(testUser, redisClient)
         //   .then(function(response){
        //        userEngine.isLogedIn('072f4357-b689-48f1-ad25-d8278e8322a7', redisClient)
        //        .then(function(res){
        //                console.log(res);
        //            res.should.be.ok;
         //           done();
         //       })

          //  })
  // })
//});