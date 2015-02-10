/**
 * Created by Marianna on 07-Feb-15.
 */

"use strict";

var eventModel = require('../db/models').event,
    q = require('q'),
    security = require('./core.eventEngine.validations.js');

exports.createEvent = function(eventObject){
    var deferred = q.defer();
    security.checkDate(eventObject['timeCard'])
        .then(function(dateObject){
           var newEvent = new eventModel({
               name: eventObject['name'],
               place: {
                   type: eventObject['place'].type,
                   coordinates: eventObject['place'].coordinates
               },
               timeCard: dateObject,
               Tags: eventObject['tags']
           });
            newEvent.save(function(err, newEvent){
                if(err){
                    deferred.reject(err);
                }
                deferred.resoleve(newEvent);
            })
        });

    return deferred.promise;
};
