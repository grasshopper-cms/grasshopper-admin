define(['UserModel', 'underscore', 'backbone'],
    function(Usermodel, _, Backbone) {

        var app = {};



        return function(){
            if (! app) {
                app.user = new UserModel();
                _.extend(app, Backbone.Events);
            }
            return app;
        };
});