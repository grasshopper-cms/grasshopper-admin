define(['./collections/paginatedCollection', './utilities/localStorage', './utilities/validation'],
    function(PaginatedCollection, localStorage, validation) {
    'use strict';
    return {
        localStorage : localStorage,
        PaginatedCollection : PaginatedCollection,
        validation : validation
    };
});