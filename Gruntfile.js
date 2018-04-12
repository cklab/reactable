var markdownlint = require('markdownlint');
const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.registerMultiTask('markdownlint', function task() {
        var done = this.async();
        markdownlint(
            { "files": this.filesSrc },
            function callback(err, result) {
                var resultString = err || ((result || '').toString());
                if (resultString) {
                    grunt.fail.warn('\n' + resultString + '\n');
                }
                done(!err || !resultString);
            });
    });

    grunt.initConfig({
        watch: {
            build: {
                files: ['src/**/*.jsx'],
                tasks: ['build']
            },
            test: {
                files: ['src/**/*.jsx', 'tests/*.jsx'],
                tasks: ['testOnce']
            }
        },
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: false }, webpackConfig)
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        markdownlint: {
            readme: {
                "src": [ "README.md" ]
            }
        }
    });

    grunt.registerTask('testOnce', ['build', 'karma']);
    grunt.registerTask('test', ['testOnce', 'watch:test']);
    grunt.registerTask('ci', ['testOnce', 'markdownlint:readme']);

    grunt.registerTask('build', ['webpack']);
    grunt.registerTask('default', ['build', 'watch:build']);
    grunt.loadNpmTasks('grunt-webpack');
};

