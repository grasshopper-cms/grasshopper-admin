(function  () {
    var app;
    
    define(['UserModel', 'underscore', 'backbone'],
        function(UserModel, _, Backbone) {

            if (!app) {
                app = _.extend({
                    user: new UserModel()
                }, Backbone.Events);

                window.app = app;
            }

            return app;

        });

}());

