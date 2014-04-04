define(['./utilities/localStorage', './utilities/validation', './utilities/cleanCollection'],
    function(localStorage, validation, cleanCollection) {
    'use strict';
    return {
        localStorage : localStorage,
        validation : validation,
        cleanCollection : cleanCollection
    };
});