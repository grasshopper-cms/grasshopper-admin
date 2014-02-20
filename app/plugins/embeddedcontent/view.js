/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'api'],
    function (GrasshopperBaseView, _, Api) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            embeddedContentSelected : embeddedContentSelected
        });

        function beforeRender($deferred) {
            this.model.get('children').fetch()
                .done(_getSelectedContent.bind(this, $deferred));
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
            this.model.set('options', selectedModel.get('_id'));
        }

        function _getSelectedContent($deferred) {
            var options = this.model.get('options');
            if (!_.isBoolean(options)) {
                _getContentDetails.call(this, options)
                    .done(_setSelectedContent.bind(this, $deferred));
            } else {
                $deferred.resolve();
            }
        }

        function _getContentDetails(options) {
            return Api.getContentDetail(options);
        }

        function _setSelectedContent($deferred, contentDetails) {
            this.model.set('selectedContent.label', contentDetails.label);
            this.model.set('selectedContent._id', contentDetails._id);
            $deferred.resolve();
        }
    });