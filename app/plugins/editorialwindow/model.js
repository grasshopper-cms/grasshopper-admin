define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            validFrom : '',
            validTo : ''
        }
    });

    function initialize() {
        this.on('change:validTo', function() {
            console.log(arguments);
        });
        this.on('change:validFrom', function() {
            console.log(arguments);
        });
    }

});