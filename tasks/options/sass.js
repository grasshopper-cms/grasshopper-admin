module.exports = {
    application : { // Get and compile application.scss
        options : {
            style : 'compressed',
            require : 'sass-globbing',
            sourcemap : true
        },
        files : {
            'temp/application.css' : 'app/application.scss'
        }
    },
    redo : { // Get and compile application.scss
        options : {
            style : 'compressed',
            require : 'sass-globbing',
            sourcemap : true
        },
        files : {
            'build/application.css' : 'app/application.scss'
        }
    }
}