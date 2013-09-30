/*global define*/
define({

    api : {
        base : {
            url : 'http://localhost:8080',
            errors : {
                400 : 'Bad Request',
                401 : 'Unauthorized',
                403 : 'Forbidden',
                404 : 'Not Found',
                405 : 'Method Not Allowed',
                408 : 'Request Timeout',
                500 : 'Server Error',
                503 : 'Service Unavailable'
            }
        },
        login : {
            url : 'http://localhost:8080/token',
            errors : {
                400 : 'Bad Request',
                401 : 'Incorrect Username Or Password',
                403 : 'Forbidden',
                404 : 'Not Found',
                405 : 'Method Not Allowed',
                408 : 'Request Timeout',
                500 : 'Server Error',
                503 : 'Service Unavailable'
            }
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

    user : {
        roles : {
            admin : 'admin',
            reader : 'reader'
        },
        errors : {
            403 : 'You do not have adequate permissions to view/edit this profile.'
        }
    },

    collections : {
        user : {
            defaults : {
                limit: 20,
                skip : 0
            }
        }
    }
});