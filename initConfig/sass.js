module.exports = function(grunt) {

    var buildDirectory = grunt.config.get('buildDirectory');

    return {
        application : { // Get and compile application.scss
            options : {
                style : 'compressed',
                require : 'sass-globbing',
                sourcemap : true
            },
            files : grunt.file.expandMapping(['themes/**/main.scss'], 'css', {
                cwd: 'app/',
                rename: function (dest, matched) {
                    return buildDirectory +'/'+ matched.replace(/\.scss$/, '.css');
                }
            })
        }
    }
};