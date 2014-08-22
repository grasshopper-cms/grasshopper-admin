/*global define:false*/
define(['grasshopperBaseView', 'advancedSearch/content/config', 'jquery'],
    function (GrasshopperBaseView, config, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            beforeRender : beforeRender
        });

        function beforeRender($deferred) {
            $.when(
                this.model.get('contentTypeCollection').fetch(),
                this.model.get('nodesCollection').fetch()
            )
                .then(this.model.preparePossibleFieldComparators.bind(this.model))
                .then($deferred.resolve);
        }

    });