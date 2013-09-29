/*
 * grunt-banish-jasmine-iit-ddescribe
 *
 */

/*jslint node: true */
'use strict';

module.exports = function (grunt) {
    var banish = require('./lib/banish');

    grunt.registerMultiTask("banish-iit-ddescribe", "Raises errors if Jasmine tests contain iit or ddescribe", function () {

        var verbose = grunt.verbose;
        var options = this.options();
        var externalOptions = {};

        if (options.banishIitDdescribe) {
            externalOptions = grunt.file.readJSON(options.banishIitDdescribe);
        }

        // merge external options with options specified in gruntfile
        options = grunt.util._.extend(options, externalOptions);

        var hadErrors = 0;
        this.filesSrc.forEach(function (filepath) {

            var message = "Checking " + filepath + "...";
            var result = banish.checkForIitAndDdescribe(filepath);

            if (result.isEmpty) {
                grunt.log.writeln("Skipping empty file " + filepath);
            } else {
                verbose.write(message);
                if (result.messages.length) {
                    verbose.or.write(message);
                    hadErrors++;
                    grunt.log.error().error(result.messages);
                } else {
                    verbose.ok();
                }
            }
        });

        if (hadErrors) {
            return false;
        }

        grunt.log.ok(this.filesSrc.length + " files free of iit and ddescribe free.");
    });
};
