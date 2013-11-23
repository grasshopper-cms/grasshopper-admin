module.exports = {
    // TODO: target build copy tasks
    app : {
        files : [
            {
                expand : true,
                cwd : 'app/',
                src: [
                    '**',
                    '!vendor/**',
                    '!dependencies/**'
                ],
                dest : 'temp/'
            }
        ]
    },
    vendor : {
        files : [
            {
                expand : true,
                cwd : 'app/',
                src : [
                    // created dynamically
                ],
                dest : 'temp'
            }
        ]
    },
    dependencies : {
        files : [
            {
                expand : true,
                cwd : 'app/dependencies/',
                src : [
                    'definition/*.js',
                    'implementation/**/<%= platform %>.*'
                ], dest : 'temp/dependencies/'}
        ]
    },
    build : {
        files : [
            {
                expand : true,
                cwd : 'temp/',
                src : [
                    '**',
                    '!**/*.scss', // ignore all SCSS files
                    '!**/*.jade', // ignore all jade files
                    '!paths.json'
                ],
                dest : 'build'
            }
        ]
    },
    redo : {
        files : [
            {
                expand : true,
                cwd : 'app/',
                src : [
                    '!**/*.scss',
                    '!**/*.jade'
                ],
                dest : 'build'
            }
        ]
    }
};