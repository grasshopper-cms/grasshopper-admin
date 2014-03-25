define(['grasshopperModel', 'resources'], function (Model, resources) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            loading : false,
            validFrom : '',
            validTo : ''
        }
    });

    function initialize() {
        var self = this;

        this.on('change:validTo', function(view, validTo) {
            self.set('value.validTo', validTo);
        });
        this.on('change:validFrom', function(view, validFrom) {
            self.set('value.validFrom', validFrom);
        });
    }

});