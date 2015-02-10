/**
 * Created by Bozhidar on 2/9/2015.
 */
"use strict";

var groupModel = require('../db/models').group,
    q = require('q');

function getAllGroups(page, size){
    var deferred = q.defer();

    groupModel.find({}).skip((page-1) * size).limit(size)
        .then(function(err, documents){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(documents);
            }
        });

    return deferred.promise();
}

function createGroup(group){
    var deferred = q.defer();

    //check if group exists
    groupModel.findOne().where('users').all(group.users, function(document){
        if(document !== null && typeof document === 'undefined'){
            deferred.reject('This group of people already exists: ' + document.name );
        }

        var newGoup = new groupModel({
            _id: group.name,
            users: group.users
        });

        newGoup.save(function(err, group){
            if(err){
                deferred.reject(err);
            }
            deferred.resolve(group);
        });
    });

    return deferred.promise;
}

function deleteGroup(name){
    var deferred = q.defer();

    groupModel.findOneAndRemove({'_id': name}, function(err){
        if(err){
            deferred.reject(err);
        }
        deferred.resolve(true);
    });

    return deferred.promise;
}

exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;