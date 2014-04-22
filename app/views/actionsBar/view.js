/*global define:false*/
define(['grasshopperBaseView', 'actionsBarViewConfig'],
    function (grasshopperBaseView, actionsBarViewConfig) {
        'use strict';

        return grasshopperBaseView.extend({
            defaultOptions : actionsBarViewConfig,
            afterRender : afterRender
        });

        function afterRender() {
            console.log(this);
        }

    });