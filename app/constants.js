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
            url : 'http://localhost:8080/user'
        },
        users : {
            url : 'http://localhost:8080/users'
        },
        newUser : {
            url : 'http://localhost:8080/users'
        },
        contentTypes : {
            url : 'http://localhost:8080/contenttypes'
        }
    },
    routes: {
        user : '#user',
        users : '#users',
        newUser : '#addUser',
        contentTypes : '#item/types',
        newContentType : '#item/types/new',
        content : '#items',
        home : '#home',
        login : '#login',
        logout : '#logout',
        about : '#about'
    },
    defaults : {
        theme: 'blue-dashboard'
    },
    userCollection : {
        pageSize : 5,
        page : 1,
        skipPages : 0,
        pageLink : '#users/page/',
        showLink : '/show/',
        pageLimits : {
            start : 5,
            stop : 50,
            step : 10
        }
    }
});