'use strict';

var should = require('should'),
    validation = require('../engine/core.engine.validations'),
    userValidations = validation.userValidator;

describe('User Validations', function(){
   it('WithoutNumberTest', function(){
        userValidations.validatePassword('AsdvcSDAfds').should.equal(false);
    });

    it('WithoutUpperCaseTest', function(){
        userValidations.validatePassword('aaaassfff6').should.equal(false);
    });

    it('WithoutLowerCaseTest', function(){
        userValidations.validatePassword('SSSSSSSSS5454').should.equal(false);
    });

    it('WithoutNeededLengthTest', function(){
        userValidations.validatePassword('asS23').should.equal(false);
    });

    it('NotAStringTest', function(){
        userValidations.validatePassword(undefined).should.equal(false);
    });

    it('CorrectTest', function(){
        userValidations.validatePassword('TheAnswer is 42').should.equal(false);
    });
});