module.exports = {
    build : {
        options : {
            questions : [
                {
                    config : 'env',
                    type : 'list', // list, checkbox, confirm, input, password
                    message : 'Which environment would you like to push the build to?',
                    default : 'staging', // default value if nothing is entered
                    choices : ['staging', 'production']
                },
                {
                    config : 'platform',
                    type : 'list', // list, checkbox, confirm, input, password
                    message : 'Which platform would you like to target?',
                    default : 'browser', // default value if nothing is entered
                    choices : ['browser', 'lg']
                }
            ]
        }
    },
    viewName : {
        options : {
            questions : [
                {
                    config : 'viewName',
                    type : 'input', // list, checkbox, confirm, input, password
                    message : 'What is the name of your new view?'
                }
            ]
        }
    },
    viewPath : {
        options : {
            questions : [
                {
                    config : 'viewPath',
                    type : 'input', // list, checkbox, confirm, input, password
                    message : 'Which folder do these view files go in? (absolute path... ie app/views/)'
                }
            ]
        }
    },
    server : {
        options : {
            questions : [
                {
                    config : 'platform',
                    type : 'list', // list, checkbox, confirm, input, password
                    message : 'Which platform would you like to target?',
                    default : 'browser', // default value if nothing is entered
                    choices : ['browser', 'lg']
                }
            ]
        }
    }
};