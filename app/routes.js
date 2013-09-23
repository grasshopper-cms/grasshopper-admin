define(['backbone'], function (Backbone) {

    var Router = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        }
    });

    return Router;
});