module.exports = {
    options: {
        // Start a live reload server on the default port: 35729
        livereload: false,
        nospawn: true
    },
    build: {
        options: {
            // Start a live reload server on the default port: 35729
            livereload: true
        },
        files: [
            'build/**/*'
        ]
    },
    dev: {
        options: {
            // Start a live reload server on the default port: 35729
            livereload: true
        },
        files: [
            'app/**/*',
            '!app/**/*.scss',// Exclusion order is relevant. Exclude Sass files.
            '!app/**/*.jade',
            '!app/vendor/**/*',
            'app/vendor/masseuse/app/*.js'
        ],
        tasks: [
            'jshint', 'copy:redo'
        ]
    },
    tests: {
        options: {
            // Start a live reload server on the default port: 35729
            livereload: true
        },
        files: [
            'tests/**/*.js'
        ]
    },
    sass: {
        files: [ //watch sass files for changes.
            'app/**/*.scss',
            'app/*.scss',
            '!app/vendor/**/*.scss'
        ],
        tasks: [ // array of grunt tasks to run.
            'sass:redo',
            'autoprefixer:redo'
        ]
    },
    jade: {
        files: [ //watch sass files for changes.
            'app/**/*.jade',
            'app/*.jade',
            '!app/vendor/**/*.jade'
        ],
        tasks: [ // array of grunt tasks to run.
            'setJadeFilesRedo',
            'jade:redo'
        ]
    }
};