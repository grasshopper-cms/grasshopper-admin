/*global define:false*/
define(['grasshopperBaseView', 'plugins/richtext/fileBrowser/config'],
    function (GrasshopperBaseView, config) {

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
            _fetchChildNodes.call(this)
                .done(_toggleNodeTree.bind(this),
                    $deferred.resolve);
        }

        function afterRender() {
            this.$el.foundation();
        }

        function _fetchChildNodes() {
            return this.model.get('children').fetch();
        }

        function _toggleNodeTree() {
            this.model.toggle('showTree');
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function confirmModal () {
            this.$deferred.resolve(this.model.get('selectedFile'));
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