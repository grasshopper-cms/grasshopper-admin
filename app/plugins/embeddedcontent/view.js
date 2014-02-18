/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender
        });

        function beforeRender($deferred) {
            this.model.get('children').fetch()
                .done($deferred.resolve);
        }

        function afterRender() {
            this.model.set('showTree', true);
        }

    });