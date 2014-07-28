define(['./utilities/localStorage', './utilities/validation', './utilities/cleanCollection', './utilities/browserTitles'],
    function(localStorage, validation, cleanCollection, browserTitles) {
    'use strict';
    return {
        localStorage : localStorage,
        validation : validation,
        cleanCollection : cleanCollection,
        browserTitles : browserTitles
    };
});