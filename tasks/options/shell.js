module.exports = {
    install_api_node_modules : {
        command : 'npm install',
        options : {
            failOnError : true,
            stderr : true,
            stdout : true,
            execOptions : {
                cwd : 'api'
            }
        }
    },
    gitSubmo : {
        command : 'git submodule update',
        options : {
            stdout : true
        }
    }
};