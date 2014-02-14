define(['grasshopperModel'], function (Model) {
    'use strict';

    return Model.extend({
        initialize : initialize,
        defaults : {

        }
    });

    function initialize() {
        console.log(this);
    }

});