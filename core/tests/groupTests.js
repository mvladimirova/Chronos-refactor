/**
 * Created by Bozhidar on 2/9/2015.
 */

var groupModel = require('../db/models').group,
    groupEngine = require('../engine/core.groupEngine.js'),
    should = require('should');

var testGroup = {
    name: "testers",
    users: ["testUser"]
};
describe('Manual Testing Of groups',function(){
    it('testAdd',function(){
        groupEngine.createGroup(testGroup)
            .then(function(document){
                console.log(document);
        })
            .catch(function(err){
            console.log(err);
        });

    })
})

