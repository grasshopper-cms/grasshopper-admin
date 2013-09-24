define(['UserModel'],
    function(Usermodel) {
        // TODO: app is not a global, it will return a new Usermodel with each dependency inclusion
        // For things that are shared among just a few views, inject the dependency on initialize
        // For things that are shared among all view, add the dependency to the prototype during an initial
        // customization method (see CustomizeBackbone in Focus@Will for examples)
        var app = {
            user: new Usermodel()
        };

        return app;
});