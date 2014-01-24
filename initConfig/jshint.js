/*globals module:true*/
module.exports = {
    files : [
        'app/**/*.js',
        '!app/vendor/**/*.js',
        '!app/plugins.js'
    ],
    options: {
        jshintrc: '.jshintrc'
    }
};