define(['jquery'], function($) {

    var localStorage = window.localStorage;

    return {
        get : get,
        set : set,
        remove : remove
        };

    function get(name) {
        return localStorage.getItem(name);
    }

    function set(name, value) {
        return localStorage.setItem(name, value);
    }

    function remove(name) {
        var $deferred = new $.Deferred();

        localStorage.removeItem(name);

        checkForExistence(name, $deferred);

        return $deferred.promise();
    }

    function checkForExistence(name, $deferred) {
        if(null === localStorage.getItem(name)) {
            $deferred.resolve();
        } else {
            setTimeout(function() {
                checkForExistence(name, $deferred);
            }, 200);
        }
    }

});