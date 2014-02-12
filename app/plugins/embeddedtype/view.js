/*global define:false*/
define(['grasshopperBaseView', 'contentTypeWorker', 'jquery'],
    function (GrasshopperBaseView, contentTypeWorker, $) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender
        });

        function beforeRender($deferred) {
            _getAvailableContentTypes.call(this)
                .done($deferred.resolve);
        }

        function _getAvailableContentTypes() {
            var $deferred = new $.Deferred(),
                self = this;

            contentTypeWorker.getAvailableContentTypes()
                .always(function(availableContentTypes) {
                    console.log(availableContentTypes);
                    self.model.set('availableContentTypes', availableContentTypes);
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

    });