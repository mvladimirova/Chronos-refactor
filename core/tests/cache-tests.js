/**
 * Created by Bozhidar on 25.12.2014 г..
 */
var should = require('should'),
    Cache = require('../coreUtilities/cache-lib').Cache;

describe('DefaultCache', function(){
    var numberCache = new Cache(),
        letterCache = new Cache(),
        testId;

    it('TestAdd',function(){
        testId = numberCache.insert({'one': 1});

        testId.should.not.equal('undefined');
    });

    it('Test separation', function(){
        var result = letterCache.get(testId);

        should.not.exist(result);
    });

    it('Test update without overwrite', function(){
        numberCache.update(testId, {'testTwo': 2});
        var value = numberCache.get(testId);

        value['one'].should.equal(1);
        value['testTwo'].should.equal(2);
    });

    it('Test update with overwrite', function(){
        numberCache.update(testId, {'TheAnswer': 42 }, true);
        var value = numberCache.get(testId);

        should.not.exist(value['one']);
        value['TheAnswer'].should.equal(42);
    });

    it('Test delete', function(){
        numberCache.remove(testId);
        var value = numberCache.get(testId);

        should.not.exist(value);
    })
});