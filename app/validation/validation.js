define(function() {
    return {
        stringHasLength : function(string) {
            return !!(string && string.constructor === String);
        }
    };
});