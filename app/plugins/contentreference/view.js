/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'api', 'contentTypeWorker', 'jquery',
    'masseuse', 'mixins/itemSelectModal'],
    function (GrasshopperBaseView, _, Api, contentTypeWorker, $,
              masseuse, itemSelectModal) {

        'use strict';

//        var ProxyProperty = masseuse.ProxyProperty;

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            setAvailableContentTypes : setAvailableContentTypes,
            setRootAsDefaultNode : setRootAsDefaultNode,
            fireSelectContentModal : fireSelectContentModal,
            setSelectedNode : setSelectedNode
        }).extend(itemSelectModal);

        function beforeRender() {
            if(this.model.get('inSetup')) {
//                this.model.get('children').fetch()
//                    .then(_getSelectedNode.bind(this))
//                    .then(_getAvailableContentTypes.bind(this));
            } else {
                _getSelectedContent.call(this);
                this.model.on('change:value', _getSelectedContent.bind(this));
            }
        }

        function _getSelectedContent() {
            var contentId = this.model.get('value'),
                $deferred = new $.Deferred();

            if (contentId) {
                _getContentDetails.call(this, contentId)
                    .done(_setSelectedContent.bind(this), $deferred.resolve);
            } else {
                $deferred.resolve();
            }

            return $deferred.promise();
        }

        function _getContentDetails(contentId) {
            return Api.getContentDetail(contentId);
        }

        function _setSelectedContent(contentDetails) {
            this.model.set('contentDetails', contentDetails);
        }

//        function _getSelectedNode() {
//            var $deferred = new $.Deferred(),
//                defaultNode = this.model.get('options.defaultNode');
//
//            if (defaultNode && defaultNode !== '0') { // default is not root
//                Api.getNodeDetail(defaultNode)
//                    .done(setSelectedNode.bind(this, $deferred));
//            } else if (defaultNode && defaultNode === '0') { // default is root
//                setSelectedNode.call(this, $deferred, { label : 'Root'});
//            } else {
//                $deferred.resolve();
//            }
//
//            return $deferred.promise();
//        }

        function setSelectedNode($deferred, nodeDetails) {
            this.model.set('selectedNodeLabel', nodeDetails.label);
            $deferred && $deferred.resolve();
        }

//        function _getAvailableContentTypes() {
//            var $deferred = new $.Deferred();
//
//            contentTypeWorker.getAvailableContentTypes()
//                .done(_setPreSelectedTypes.bind(this, $deferred));
//
//            return $deferred.promise();
//        }

//        function _setPreSelectedTypes($deferred, availableTypes) {
//            var allowedTypes = this.model.get('options.allowedTypes');
//
//            _.each(availableTypes, function(type) {
//                if(_.contains(allowedTypes, type._id)) {
//                    type.checked = true;
//                } else {
//                    type.checked = false;
//                }
//            });
//
//            this.model.set('availableTypes', availableTypes);
//            $deferred.resolve();
//        }

        function afterRender() {
            window.contentRefView = this;
            this.model.set('showTree', true);
            this.$el.foundation();
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function setAvailableContentTypes() {
            var availableTypes = this.model.get('availableTypes'),
                checkedTypes = _.pluck(_.where(availableTypes, { checked : true }), '_id');

            this.model.set('options.allowedTypes', checkedTypes);
        }

        function setRootAsDefaultNode(e) {
            this.model.set('selectedNodeLabel', 'Root');
            this.model.set('options.defaultNode', '0');
            e.preventDefault();
        }

        function fireSelectContentModal() {
            _startModalView.call(this)
                .done(_contentReferenceSelected.bind(this));
        }

        function _contentReferenceSelected(selectedContentId) {
            this.model.set('value', selectedContentId);
        }

        function _startModalView() {
            this.model.set('inSetup', false);

            return this.fireItemSelectModal();
        }

    });