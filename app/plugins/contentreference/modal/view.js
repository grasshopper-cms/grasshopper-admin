/*global define:false*/
define(['grasshopperBaseView', 'plugins/contentreference/modal/config', 'jquery'],
    function (GrasshopperBaseView, config, $) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            beforeRender : beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            selectContent : selectContent,
            confirmModal : confirmModal,
            cancelModal : cancelModal
        });

        function beforeRender($deferred) {
            $.when(_fetchChildNodes.call(this),
                   _fetchChildContent.call(this),
                   _fetchCurrentNode.call(this))
                .done($deferred.resolve);
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

        function afterRender() {
            this.$el.foundation();
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function selectContent(e, context) {
            this.model.set('selectedContent', context.item);
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
