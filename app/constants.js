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
        },
        node : {
            url : 'http://localhost:8080/node'
        },
        nodes : {
            url : 'http://localhost:8080/node/:id/children'
        },
        assets : {
            url : 'http://localhost:8080/node/:id/assets'
        },
        contentQuery: {
            url : 'http://localhost:8080/content/query'
        }
    },
    internalRoutes: {
        user : '#user',
        users : '#users',
        newUser : '#addUser',
        contentTypes : '#item/types',
        newContentType : '#item/types/new',
        content : '#items',
        contentDetail : '#item/:id',
        nodeDetail : '#items/nodeid/:id',
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