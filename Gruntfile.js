'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: {
            files: ['dist']
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'tasks/.jshintrc'
                },
                src: ['tasks/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/banish-jasmine-iit-ddescribe_test.js']
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/banish-jasmine-iit-ddescribe_test.js']
        }
    });

    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('test', ['nodeunit']);

    // Default task.
    grunt.registerTask('default', ['jshint', 'clean', 'test']);

};
