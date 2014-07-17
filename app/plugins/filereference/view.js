/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'api', 'contentTypeWorker', 'jquery',
    'plugins/filereference/modal/view'],
    function (GrasshopperBaseView, _, Api, contentTypeWorker, $, ModalView) {

        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender: afterRender,
            stopAccordionPropagation: stopAccordionPropagation,
            setRootAsDefaultNode: setRootAsDefaultNode,
            fireSelectFileModal: fireSelectFileModal,
            setSelectedNode: setSelectedNode,
            fireFileDetailModal: fireFileDetailModal
        });

        function beforeRender () {
            if (this.model.get('inSetup')) {
                this.model.get('children').fetch()
                    .then(_getSelectedNode.bind(this));
            }
        }

        function _getSelectedNode () {
            var $deferred = new $.Deferred(),
                defaultNode = this.model.get('options.defaultNode');

            if (defaultNode && defaultNode !== '0') { // default is not root
                Api.getNodeDetail(defaultNode)
                    .done(setSelectedNode.bind(this, $deferred));
            } else if (defaultNode && defaultNode === '0') { // default is root
                setSelectedNode.call(this, $deferred, { label: 'Root'});
            } else {
                $deferred.resolve();
            }

            return $deferred.promise();
        }

        function setSelectedNode ($deferred, nodeDetails) {
            this.model.set('selectedNodeLabel', nodeDetails.label);
            $deferred && $deferred.resolve();
        }

        function afterRender () {
            this.model.set('showTree', true);
            this.$el.foundation();
        }

        function stopAccordionPropagation (e) {
            e.stopPropagation();
        }

        function setRootAsDefaultNode (e) {
            this.model.set('selectedNodeLabel', 'Root');
            this.model.set('options.defaultNode', '0');
            e.preventDefault();
        }

        function fireSelectFileModal () {
            _startModalView.call(this)
                .done(_fileReferenceSelected.bind(this));
        }

        function _startModalView () {
            this.model.set('inSetup', false);

            var $deferred = new $.Deferred(),
                modalView = new ModalView({
                    modelData: {
                        header: 'Select File',
                        selectedContent: this.model.get('selectedContent'),
                        _id: this.model.get('options.defaultNode')
                    },
                    $deferred: $deferred
                });

            modalView.start();
            return $deferred.promise();
        }

        function _fileReferenceSelected (modalModel) {
            this.model.set('selectedContentName', modalModel.selectedContentName);
            this.model.set('selectedContent', modalModel.selectedContent);
            this.model.set('value', _.last(modalModel.selectedContent.split('/'), 2).join('/'));
        }

        function fireFileDetailModal () {
            this.model.get('assetModel')
                .fetch()
                .done(_fireModalWithData.bind(this));
        }

        function _fireModalWithData(data) {
            this.displayModal(
                {
                    header: this.model.get('selectedContentName'),
                    type: 'image',
                    data: data.url
                });
        }


    });