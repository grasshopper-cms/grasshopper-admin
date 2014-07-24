define(['masseuse', 'resources'],
    function (masseuse, resources) {
    'use strict';

    var Model = masseuse.MasseuseModel;

    return Model.extend({
        defaults : {
            resources : resources
        }
    });

});
