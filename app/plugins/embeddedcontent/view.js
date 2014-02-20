/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            embeddedContentSelected : embeddedContentSelected
        });

        function beforeRender($deferred) {
            this.model.get('children').fetch()
                .done($deferred.resolve);
        }

        function afterRender() {
            this.model.set('showTree', true);
            this.$el.foundation();
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function embeddedContentSelected(selectedModel) {
            this.model.set('selectedContent.label', selectedModel.get('label'));
            this.model.set('selectedContent._id', selectedModel.get('_id'));
        }
    });