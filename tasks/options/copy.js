module.exports = {
    build : {
        files : [
            {expand : true, cwd : 'app/', src : [
                '**',
                '!**/*.scss',
                '**/*.html',
                '!vendor/**'
            ], dest : 'build'}
        ]
    },
    vendor : {
        files : [
            {expand : true, cwd : 'app/', src : [
                // created dynamically
            ], dest : 'build'}
        ]
    },
    deploy : {
        files : [
            {expand : true, cwd : 'app/', src : [
                '**',
                '!**/*.scss',
                '!**/*.js',
                '!vendor/**/*'
            ], dest : 'build'}
        ]
    },
    redo : {
        files : [
            {expand : true, cwd : 'app/', src : [

            ], dest : 'build'}
        ]
    },
    vagrant : {
        files : [
            {expand : true, cwd : 'api/lib/config/configuration.test.json', src : [

            ], dest : 'api/lib/config/configuration.json'}
        ]
    }
};