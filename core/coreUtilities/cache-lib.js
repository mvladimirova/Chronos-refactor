/**
 * Created by Bozhidar on 24.12.2014 г..
 */
var uuid = require('node-uuid');

function Cache(userOptions){
    this.options = setOptions(userOptions);
    this.cache = {};
    this.getId = selectIdGetter[this.options.idType.toLowerCase()]();
};

// Delete entry
Cache.prototype.remove = function(id){
    delete this.cache[id];
};

// Insert object into the cache. The id will of the inserted object will be returned
Cache.prototype.insert = function(object){
    var newId = this.getId();

    // Just a little fail-safe
    if(this.cache.hasOwnProperty(newId)){
        return 'undefined';
    }

    this.cache[newId] = object;

    cleanUpLogicBasedOnType[this.options.expirationType.toLowerCase()].call(this);
    return newId;
};

//Get object by ID
Cache.prototype.get = function(id){
    return this.cache[id];
};


// Update entry the override value is optional, if it is set to true the new object will
// completely overwrite the old one. If not the overlapping elements will be updated and the non overlapping created
Cache.prototype.update = function(id, newObject, override){
    if (!this.cache.hasOwnProperty(id)) {
        return 'undefined';
    }

    if(override === true){
        this.cache[id] = newObject;
    }
    else {
        // This should be changed to let when ES6 is out
        var target = this.cache[id];
        Object.keys(newObject).forEach(function (elem) {
            target[elem] = newObject[elem];
        });

        this.cache[id] = target;
    }
};

exports.Cache = Cache;


// Helper functions


// Functions for cleaning the cache based on expiration type
var cleanUpLogicBasedOnType = {
    'sliding': function(id){
        setTimeout(this.remove(id), this.options.expirationTime);
    },

    'none': function(id){
        return true;
    }
};

var selectIdGetter = {
    'guid': function(){
        return uuid.v4;
    },

    'number': function(){
        this.count = 0;
        return count++;
    }
};

function setOptions(userOptions){
    options = {
        expirationType: 'sliding',
        expirationTime: 600000,
        idType: 'guid'
    };

    if(typeof userOptions == 'undefined'){
        return options;
    }

    if(userOptions.hasOwnProperty('expirationType')){
        options.expirationType =  userOptions.expirationType;
    }

    if(userOptions.hasOwnProperty('expirationTime')){
        options.expirationTime = userOptions.expirationTime;
    }

    if(userOptions.hasOwnProperty('idType')){
        options.idType = userOptions.idType;
    }

    return options;
}