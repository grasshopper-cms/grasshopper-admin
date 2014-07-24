/*global define:false*/
define(['grasshopperBaseView', 'plugins/filereference/modal/config', 'jquery'],
    function (GrasshopperBaseView, config, $) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : config,
            beforeRender : beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            confirmModal : confirmModal,
            cancelModal : cancelModal,
            setSelectedNode : setSelectedNode
        });

        function beforeRender($deferred) {
            $.when(_fetchChildNodes.call(this),
                    _fetchChildFiles.call(this),
                    _fetchCurrentNode.call(this))
                .done(_toggleLoadingSpinner.bind(this), $deferred.resolve);
        }

        function afterRender() {
            this.$el.foundation();
        }

        function _fetchChildNodes() {
            return this.model.get('children').fetch();
        }

        function _fetchChildFiles() {
            var $deferred = new $.Deferred();

            if(this.model.get('inRoot')){
                $deferred.resolve();
            } else {
                this.model.get('content').fetch()
                    .done($deferred.resolve);
            }

            return $deferred.promise();
        }

        function _fetchCurrentNode() {
            return this.model.fetch();
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
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

        function setSelectedNode() {
            return false;
        }

    });
