/*global define:false*/
define(['grasshopperBaseView', 'contentTypeWorker', 'jquery', 'underscore', 'masseuse'],
    function (GrasshopperBaseView, contentTypeWorker, $, _, masseuse) {
        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender
        });

        function beforeRender($deferred) {
            _getAvailableContentTypes.call(this)
                .done(_setActiveContentType.bind(this, $deferred));
        }

        function afterRender() {
            this.$el.foundation();
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

                _proxyValues.call(this);
            }


            $deferred.resolve();
        }

        function _proxyValues() {
            var activeContentType = this.model.get('activeContentType'),
                property,
                self = this;

            if(!this.model.get('value')) {
                _.each(activeContentType.fields, function(type) {
                    self.model.set('value.'+ type._id, undefined);
                });
            }

            for (property in this.model.get('value')) {
                this.model.set('fields.' + property, new ProxyProperty('value.' + property, this.model));
            }

            _setSubLabelsForAccordions.call(this);
        }

        function _setSubLabelsForAccordions() {
            var activeContentTypeFields = this.model.get('activeContentType.fields'),
                fieldToUseAsLabel = _.findWhere(activeContentTypeFields, {useAsLabel : true})._id,
                labelForAccordion = this.model.get('value.' + fieldToUseAsLabel);

            this.model.set('accordionLabel', labelForAccordion);
        }

    });