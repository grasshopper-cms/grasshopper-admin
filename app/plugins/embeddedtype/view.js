/*global define:false*/
define(['grasshopperBaseView', 'contentTypeWorker', 'jquery', 'underscore', 'masseuse'],
    function (GrasshopperBaseView, contentTypeWorker, $, _, masseuse) {
        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender,
            stopPropagation : stopPropagation,
            toggleExpandArrow : toggleExpandArrow
        });

        function beforeRender($deferred) {
            _getAvailableContentTypes.call(this)
                .done(_setActiveContentType.bind(this, $deferred));
        }

        function afterRender() {
            this.$el.foundation();
        }

        function _getAvailableContentTypes() {
            var $deferred = new $.Deferred();

            contentTypeWorker.getAvailableContentTypes()
                .always(_handleSuccessfulContentTypeRetrieval.bind(this, $deferred));

            return $deferred.promise();
        }

        function _handleSuccessfulContentTypeRetrieval($deferred, availableContentTypes) {
            this.model.set('availableContentTypes', availableContentTypes);
            $deferred.resolve();
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
                self = this;

            if(!this.model.get('value')) {
                _.each(activeContentType.fields, _setEmptyValue.bind(this));
            }

            _.each(activeContentType.fields, function(type) {
                self.model.set('fields.' + type._id, new ProxyProperty('value.' + type._id, self.model));
            });

            _setSubLabelsForAccordions.call(this);
        }

        function _setEmptyValue(type) {
            this.model.set('value.'+ type._id, undefined);
        }

        function _setSubLabelsForAccordions() {
            var activeContentTypeFields = this.model.get('activeContentType.fields'),
                fieldToUseAsLabel = _.findWhere(activeContentTypeFields, {useAsLabel : true})._id;

            this.model.set('accordionLabel', new ProxyProperty('value.' + fieldToUseAsLabel, this.model));
        }

        function stopPropagation(e) {
            e.stopPropagation();
        }

        function toggleExpandArrow(e) {
            var $toToggle;

            if(e.target.localName === 'i') {
                $toToggle = $(e.target.parentElement);
            } else {
                $toToggle = $(e.target);
            }
            $toToggle.next().slideToggle('slow');
            this.model.toggle('accordionOpen');
        }

    });