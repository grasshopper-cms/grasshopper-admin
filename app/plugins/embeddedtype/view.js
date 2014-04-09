/*global define:false*/
define(['grasshopperBaseView', 'contentTypeWorker', 'jquery', 'underscore', 'masseuse'],
    function (GrasshopperBaseView, contentTypeWorker, $, _, masseuse) {
        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender() {
            this.model.toggle('loading');
            _getAvailableContentTypes.call(this)
                .done(_setActiveContentType.bind(this));

            this.$el.foundation();

            _initializeAccordions.call(this);
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

        function _setActiveContentType() {
            var activeTypeId = this.model.get('options'),
                activeContentType;

            if(!_.isEmpty(activeTypeId)) {
                activeContentType = _.findWhere(this.model.get('availableContentTypes'), {_id : activeTypeId});
                this.model.set('activeContentType', activeContentType);
                _proxyValues.call(this);
            }
            this.model.toggle('loading');
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
                fieldToUseAsLabel = _.first(activeContentTypeFields)._id;

            this.model.set('accordionLabel', new ProxyProperty('value.' + fieldToUseAsLabel, this.model));
        }

        function _initializeAccordions() {
            var $accordion = this.$('#embeddedTypeAccordion');

            $accordion.accordion({
                header : '.accordionHeader',
                icons : {
                    header : 'fa fa-chevron-right',
                    activeHeader : 'fa fa-chevron-down'
                },
                active : false,
                collapsible : true,
                heightStyle : 'content'
            });
        }

    });