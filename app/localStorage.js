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

//define (require) ->
//class LocalStorage
//constructor: (@_name) ->
//if MFRAppConfig.env
//    @_name = MFRAppConfig.env + '_' + @_name
//
//get: ->
//    @_value ||= window.localStorage.getItem(@_name)
//@_value
//
//set: (@_value) ->
//window.localStorage.setItem(@_name, @_value)
//
//remove: ->
//    @_value = null
//window.localStorage.removeItem(@_name)