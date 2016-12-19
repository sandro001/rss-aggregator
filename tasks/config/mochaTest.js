module.exports = function(grunt) {

    grunt.config.set('mochaTest', {
        test: {
            options: {
                reporter: 'spec',
                timeout:5000,
                quiet: false, // Optionally suppress output to standard out (defaults to false)
                clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            },
            src: ['tests/**/*.js']
        }

    });

    grunt.loadNpmTasks('grunt-mocha-test');
};