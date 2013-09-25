/*
 * grunt-banish-jasmine-iit-ddescribe
 *
 */

'use strict';

module.exports = function (grunt) {

    function checkForIitAndDdesribe(file) {
        var toReturn = { messages: []};
        var matchMap = {iit: /iit/g, ddescribe: /ddescribe/g}

        for (var match in matchMap) {
            var numMatches = file.match(matchMap[match]);
            if (numMatches) {
                toReturn.messages.push("found " + numMatches.length + " " + match);
            }
        }
        return toReturn;
    }

    grunt.registerMultiTask("banish-iit-ddescribe", "Raises errors if Jasmine tests contain iit or ddescribe", function () {

        var verbose = grunt.verbose;

        var options = this.options();

        var path = require("path");

        if (options.banishIitDdescribe) {
            var externalOptions = grunt.file.readJSON(options.banishIitDdescribe);
        }

        // merge external options with options specified in gruntfile
        options = grunt.util._.extend(options, externalOptions);


        var hadErrors = 0;
        this.filesSrc.forEach(function (filepath) {

            var file = grunt.file.read(filepath),
                message = "Checking " + filepath + "...",
                result;

            // skip empty files
            if (file.length) {
                result = checkForIitAndDdesribe(file);

                verbose.write(message);
                if (result.messages.length) {
                    verbose.or.write(message);
                    hadErrors++;
                    grunt.log.error().error(result.messages);
                } else {
                    verbose.ok();
                }

            } else {
                grunt.log.writeln("Skipping empty file " + filepath);
            }

        });


        if (hadErrors) {
            return false;
        }

        grunt.log.ok(this.filesSrc.length + " files free of iit and ddescribe free.");
    });
};
