/*global app:true, Backbone:false, jQuery:false, _:false */
(function (app, Backbone, $, _) {
    "use strict";
    var user = Backbone.Model.extend({
        //default properties
        login : null,
        role : null,
        password : null,
        name : null,
        enabled : null,
        email : null
    });

}(app, Backbone, jQuery, _));
