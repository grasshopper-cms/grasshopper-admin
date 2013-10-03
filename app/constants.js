/*global define*/
define({
    api : {
        base : {
            url : 'http://localhost:8080'
        },
        login : {
            url : 'http://localhost:8080/token'
        },
        user : {
            url : 'http://localhost:8080/user',
            shortUrl : 'user/'
        },
        users : {
            url : 'http://localhost:8080/users',
            shortUrl : 'users/'
        }
    },
    defaults : {
    }
});