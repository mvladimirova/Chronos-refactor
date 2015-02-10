/**
 * Created by Marianna on 07-Feb-15.
 */

"use strict";

var q = require('q');

exports.checkDate = function(timeCard){
    var deferred = q.defer();

    if(typeof timeCard['start'] === null || typeof timeCard['start'] === 'undefined' || typeof timeCard['end'] === null ||
        typeof timeCard['end'] === 'undefined'){
        deferred.resolve(false);
    }


    return deferred.promise();
};