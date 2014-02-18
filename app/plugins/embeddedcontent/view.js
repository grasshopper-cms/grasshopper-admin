/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender
        });

        function beforeRender($deferred) {
            var self = this;

            console.log(this);
            this.model.get('children').fetch()
                .done(function() {
                    console.log(self);
                });

            this.model.fetch()
                .done(function(children) {
                    self.model.get('children').reset(children);
                    $deferred.resolve();
                });
        }

    });