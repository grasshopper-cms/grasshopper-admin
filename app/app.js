define(['UserModel'],
    function(Usermodel) {
        var app = {
            user: new Usermodel()
        };

        return app;
});