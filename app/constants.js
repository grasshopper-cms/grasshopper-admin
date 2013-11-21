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
        nodes : {
            url : 'http://localhost:8080/node/:id/children'
        },
        assets : {
            url : 'http://localhost:8080/node/:id/assets'
        }
    },
    internalRoutes: {
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

//child nodes in this node:   /node/:nodeid/children  root is /node/0/children

///search

//var query = {
//    nodes: "526d5179966a883540000006",  will accept a string or array of ID's,
//    types: [],
//    filters: [],
//    options: {}
//};
//request(url)
//    .post('/search')
//    .set('Accept', 'application/json')
//    .set('Accept-Language', 'en_US')
//    .set('authorization', 'Token ' + globalReaderToken)
//    .send(query)
//    .end(function(err, res) {
//    });


//assets: /node/:nodeid/assets
//nodeID will be 0 for the root.


//privileges.available = {
//    ADMIN: 0,
//    EDITOR: 1,
//    AUTHOR: 2,
//    READER: 3,
//    EXTERNAL: 3,
//    NONE: 4
//};

//permissions.allowed = function(userRole, minPermissionLevel) {
//    var userPrivLevel = privileges.available[userRole.toUpperCase()];
//
//    return (userPrivLevel <= parseInt(minPermissionLevel, 10));
//};
