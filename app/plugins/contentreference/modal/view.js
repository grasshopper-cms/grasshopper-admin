/*global define:false*/
define(['grasshopperBaseView', 'plugins/contentreference/modal/config', 'jquery', 'underscore'],
    function (GrasshopperBaseView, config, $, _) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            beforeRender : beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            confirmModal : confirmModal,
            cancelModal : cancelModal
        });

        function beforeRender($deferred) {
            $.when(_fetchChildNodes.call(this),
                    _fetchChildContent.call(this),
                    _fetchCurrentNode.call(this))
                .done(_toggleLoadingSpinner.bind(this), $deferred.resolve);
        }

        function afterRender() {
            _hydrateAllowedContentTypes.call(this);
            this.$el.foundation();
        }

        function _fetchChildNodes() {
            return this.model.get('children').fetch();
        }

        function _fetchChildContent() {
            return this.model.get('content').fetch();
        }

        function _fetchCurrentNode() {
            return this.model.fetch();
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

        function _hydrateAllowedContentTypes() {
            var allowedTypeLabels = [],
                allowedTypes = this.model.get('allowedContentTypes'),
                availableTypes = this.model.get('availableContentTypes');

            _.each(allowedTypes, function(allowedTypeId) {
                allowedTypeLabels.push(
                    _.findWhere(availableTypes, { _id : allowedTypeId}).label);
            });

            this.model.set('allowedTypeLabels', allowedTypeLabels.join(', '));
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function confirmModal () {
            this.$deferred.resolve(this.model.attributes);
            _removeModal.call(this);
        }

        function cancelModal () {
            this.$deferred.reject();
            _removeModal.call(this);
        }

        function _removeModal () {
            this.remove();
        }

    });
