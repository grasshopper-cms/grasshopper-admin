define([], function() {

    return {
        get : get,
        set : set,
        remove : remove
        };

    function get(name) {
        return window.localStorage.getItem(name);
    }

    function set(name, value) {
        return window.localStorage.setItem(name, value);
    }

    function remove(name) {
        return window.localStorage.removeItem(name);
    }

});