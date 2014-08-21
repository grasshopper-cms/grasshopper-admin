define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources
        }
    });

    function initialize() {
        Model.prototype.initialize.apply(this, arguments);

        console.log('YEAH YEAH YEAH YEAH YEAH YEAH EYAH');
    }
});