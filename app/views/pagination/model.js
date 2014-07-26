define(['masseuse', 'resources', 'constants'],
    function (masseuse, resources, constants) {
    'use strict';

    var Model = masseuse.MasseuseModel;

    return Model.extend({
        defaults : {
            constants : constants,
            resources : resources,
            contentSearchValue : '',
            pageNumbers : masseuse.ComputedProperty(['limit', 'total'], function(limit, total) {
                //TODO: array of pages
                return (total % limit === 0 ) ? (total / limit) : parseInt(total / limit) + 1;
            }, true)
        }
    });

});
