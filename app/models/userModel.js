define(['underscore', 'backbone'], function(_, Backbone) {

    "use strict";
    return Backbone.Model.extend({
        //known properties
        login : null,
        role : null,
        password : null,
        name : null,
        enabled : null,
        email : null
    });

});
