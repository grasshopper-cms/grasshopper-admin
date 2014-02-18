/*global define:false*/
define(['grasshopperBaseView', 'jquery'],
    function (GrasshopperBaseView, $) {
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

            setTimeout(function() {
                $('#nodeTree').jstree();
            }, 2000);
        }

    });