/*
 * banish 
 *
 */

/*jslint node: true */
'use strict';

var grunt = require('grunt');

module.exports =  {

    checkForIitAndDdescribe : function (filepath) {
        var file = grunt.file.read(filepath);
        var toReturn = { messages: []};
        var matchMap = {iit: /iit/g, ddescribe: /ddescribe/g};

        if (file.length) {
            for (var match in matchMap) {
                var numMatches = file.match(matchMap[match]);
                if (numMatches) {
                    toReturn.messages.push("found " + numMatches.length + " " + match);
                }
            }
       } else {
           toReturn.isEmpty = true;
       }

       return toReturn;
    }
};
