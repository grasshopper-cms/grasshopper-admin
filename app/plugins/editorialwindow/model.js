define(['grasshopperModel', 'resources', 'moment'], function (Model, resources, moment) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {
            resources : resources,
            orderError : false,
            value : {
                validFrom : '',
                validTo : ''
            }
        }
    });

    function initialize() {
        this.on('change:value', _ensureEndIsAlwaysAfterStart.bind(this));
    }

    function _ensureEndIsAlwaysAfterStart() {
        var validFrom = this.get('value.validFrom'),
            validTo = this.get('value.validTo');

        if(!moment(validTo).isAfter(validFrom)) {
            this.set('orderError', true);
        } else {
            this.set('orderError', false);
        }
    }

});
