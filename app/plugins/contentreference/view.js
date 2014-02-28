/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'api', 'contentTypeWorker', 'jquery',
    'plugins/contentreference/modal/view', 'masseuse'],
    function (GrasshopperBaseView, _, Api, contentTypeWorker, $,
              ModalView, masseuse) {

        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            contentReferenceSelected : contentReferenceSelected,
            defaultNodeSelected : defaultNodeSelected,
            setAvailableContentTypes : setAvailableContentTypes,
            setRootAsDefaultNode : setRootAsDefaultNode,
            fireSelectContentModal : fireSelectContentModal
        });

        function beforeRender($deferred) {
            this.model.get('children').fetch()
                .then(_getSelectedContent.bind(this))
                .then(_getSelectedNode.bind(this))
                .then(_getAvailableContentTypes.bind(this))
                .then($deferred.resolve);
        }

        function _getSelectedContent() {
            var contentId = this.model.get('value'),
                $deferred = new $.Deferred();

            if (contentId) {
                _getContentDetails.call(this, contentId)
                    .done(_setSelectedContent.bind(this, $deferred));
            } else {
                $deferred.resolve();
            }

            return $deferred.promise();
        }

        function _setSelectedContent($deferred, contentDetails) {
            this.model.set('selectedContent.label', contentDetails.label);
            this.model.set('selectedContent._id', contentDetails._id);
            $deferred.resolve();
        }

        function _getSelectedNode() {
            var $deferred = new $.Deferred(),
                defaultNode = this.model.get('options.defaultNode');

            if (defaultNode && defaultNode !== '0') { // default is not root
                Api.getNodeDetail(defaultNode)
                    .done(_setSelectedNode.bind(this, $deferred));
            } else if (defaultNode && defaultNode === '0') { // default is root
                _setSelectedNode.call(this, $deferred, { label : 'Root'});
            } else {
                $deferred.resolve();
            }

            return $deferred.promise();
        }

        function _setSelectedNode($deferred, nodeDetails) {
            this.model.set('selectedNode.label', nodeDetails.label);
            $deferred.resolve();
        }

        function _getAvailableContentTypes() {
            var $deferred = new $.Deferred();

            contentTypeWorker.getAvailableContentTypes()
                .done(_setPreSelectedTypes.bind(this, $deferred));

            return $deferred.promise();
        }

        function _setPreSelectedTypes($deferred, availableTypes) {
            var allowedTypes = this.model.get('options.allowedTypes');

            _.each(availableTypes, function(type) {
                if(_.contains(allowedTypes, type._id)) {
                    type.checked = true;
                } else {
                    type.checked = false;
                }
            });

            this.model.set('availableTypes', availableTypes);
            $deferred.resolve();
        }

        function afterRender() {
            this.model.set('showTree', true);
            this.$el.foundation();
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function contentReferenceSelected(selectedModel) {
            this.model.set('selectedContent.label', selectedModel.get('label'));
            this.model.set('value', selectedModel.get('_id'));
        }

        function _getContentDetails(contentId) {
            return Api.getContentDetail(contentId);
        }

        function defaultNodeSelected(selectedNode) {
            if (this.model.get('inSetup')) {
                this.model.set('selectedNode.label', selectedNode.get('label'));
                this.model.set('options.defaultNode', selectedNode.get('_id'));
            }
        }

        function setAvailableContentTypes() {
            var availableTypes = this.model.get('availableTypes'),
                checkedTypes = _.pluck(_.where(availableTypes, { checked : true }), '_id');

            this.model.set('options.allowedTypes', checkedTypes);
        }

        function setRootAsDefaultNode(e) {
            this.model.set('selectedNode.label', 'Root');
            this.model.set('options.defaultNode', '0');
            e.preventDefault();
        }

        function fireSelectContentModal() {
            _startModalView.call(this)
                .done()
                .fail();
        }

        function _startModalView() {
            this.model.set('inSetup', false);

            var $deferred = new $.Deferred(),
                modalView = new ModalView({
                    modelData : {
                        header : 'Select Content',
                        selectedContent : new ProxyProperty('selectedContent', this.model),
                        _id : this.model.get('options.defaultNode'),
                        allowedContentTypes : this.model.get('options.allowedTypes'),
                        availableContentTypes : this.model.get('availableTypes')
                    },
                    $deferred : $deferred
                });

            modalView.start();
            return $deferred.promise();
        }

    });