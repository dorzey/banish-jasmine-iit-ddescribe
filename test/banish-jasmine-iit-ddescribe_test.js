/*jslint node: true */
'use strict';

var path = require('path');
var banish = require('../tasks/lib/banish');

var fixtures = path.join(__dirname, 'fixtures');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.test = {

    should_pass: function(test) {
        test.expect(1);
        var filepath = [path.join(fixtures, 'jasmine_spec_without_itt_or_ddescribe.js')];
        var expectedResult = { messages: [] };

        var result = banish.checkForIitAndDdescribe(filepath); 
        test.deepEqual(result, expectedResult);
        test.done();
    },

    should_find_one_ddescribe: function(test) {
        test.expect(1);
        var filepath = [path.join(fixtures, 'jasmine_spec_with_ddescribe.js')];
        var expectedResult = { messages: ["found 1 ddescribe"] };

        var result = banish.checkForIitAndDdescribe(filepath); 
        test.deepEqual(result, expectedResult);
        test.done();
    },

    should_find_one_iit: function(test) {
        test.expect(1);
        var filepath = [path.join(fixtures, 'jasmine_spec_with_iit.js')];
        var expectedResult = { messages: ["found 1 iit"] };

        var result = banish.checkForIitAndDdescribe(filepath); 
        test.deepEqual(result, expectedResult);
        test.done();
    },

    should_find_multiple_errors: function(test) {
        test.expect(1);
        var filepath = [path.join(fixtures, 'jasmine_spec_with_multiple_failures.js')];
        var expectedResult = { messages: ["found 2 iit", "found 1 ddescribe"] };

        var result = banish.checkForIitAndDdescribe(filepath); 
        test.deepEqual(result, expectedResult);
        test.done();
    },
};
