/*global define:false*/
define(['grasshopperBaseView', 'contentTypeWorker', 'jquery', 'underscore'],
    function (GrasshopperBaseView, contentTypeWorker, $, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender
        });

        function beforeRender($deferred) {
            _getAvailableContentTypes.call(this)
                .done(_setActiveContentType.bind(this, $deferred));
        }

        function _getAvailableContentTypes() {
            var $deferred = new $.Deferred(),
                self = this;

            contentTypeWorker.getAvailableContentTypes()
                .always(function(availableContentTypes) {
                    self.model.set('availableContentTypes', availableContentTypes);
                    $deferred.resolve();
                });

            return $deferred.promise();
        }

        function _setActiveContentType($deferred) {
            var activeTypeId = this.model.get('options'),
                activeContentType;
            if(!_.isEmpty(activeTypeId)) {
                activeContentType = _.findWhere(this.model.get('availableContentTypes'), {_id : activeTypeId});
                this.model.set('activeContentType', activeContentType);
            }
            $deferred.resolve();
        }

    });