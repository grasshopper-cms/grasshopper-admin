/*global module:false, require:false*/
module.exports = function (grunt) {

    "use strict";

    var _ = grunt.util._;


    grunt.registerTask('checkDependencies', 'Test that package.json dependencies were installed correctly.', function() {
        var pkg = grunt.file.readJSON('package.json');
        var total = 0;

        ['dependencies', 'devDependencies'].forEach(function(key) {
            var deps = pkg[key];
            if (!deps) { return; }
            grunt.verbose.subhead(key);
            Object.keys(deps).forEach(function(name) {
                total++;
                var msg = 'Checking "' + name + '" dependency...';
                grunt.verbose.write(msg);
                try {
                    console.log(name);
                    require(name);
                    grunt.verbose.ok();
                } catch(err) {
                    grunt.verbose.or.write(msg);
                    grunt.log.error().error(err.message);
                }
            });
        });

        if (this.errorCount > 0) {
            grunt.fail.fatal('Errors were encountered. Did you "npm install" first?');
        } else {
            grunt.verbose.writeln();
            grunt.log.ok(total + ' dependencies installed correctly.');
        }
    });

};


