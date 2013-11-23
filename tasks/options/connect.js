module.exports = function(grunt) {

    return {
        site : {
            options : {
                port : 9001,
                hostname : 'localhost',
                base : './build/',
                middleware : function (connect, options) {
                    return [grunt.connect.lrSnippet, grunt.connect.folderMount(connect, options.base)]
                }
            }
        },
        tests : {
            options : {
                port : 9001,
                hostname : 'localhost',
                base : './build',
                middleware : function (connect, options) {
                    return [grunt.connect.lrSnippet, grunt.connect.folderMount(connect, options.base)]
                }
            }
        }
    }
}

