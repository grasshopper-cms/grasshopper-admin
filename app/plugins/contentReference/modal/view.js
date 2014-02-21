/*global define:false*/
define(['grasshopperBaseView', 'plugins/contentreference/modal/config'],
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
            this.model.get('children').fetch()
                .done($deferred.resolve);
        }

        function afterRender() {
            this.$el.foundation();
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function confirmModal () {
            _removeModal.call(this);
        }

        function cancelModal () {
            _removeModal.call(this);
        }

        function _removeModal () {
            this.remove();
        }

    });
