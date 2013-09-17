define(['underscore', 'backbone'], function(_, Backbone) {

    "use strict";
    var user = Backbone.Model.extend({
        //known properties
        login : null,
        role : null,
        password : null,
        name : null,
        enabled : null,
        email : null
    });

});
