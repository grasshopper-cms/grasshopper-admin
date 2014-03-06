/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'api', 'contentTypeWorker', 'jquery',
    'plugins/filereference/modal/view', 'masseuse'],
    function (GrasshopperBaseView, _, Api, contentTypeWorker, $,
              ModalView, masseuse) {

        'use strict';

        var ProxyProperty = masseuse.ProxyProperty;

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender : afterRender,
            stopAccordionPropagation : stopAccordionPropagation,
            setRootAsDefaultNode : setRootAsDefaultNode,
            fireSelectFileModal : fireSelectFileModal,
            setSelectedNode : setSelectedNode
        });

        function beforeRender($deferred) {
            this.model.get('children').fetch()
                .then(_getSelectedFile.bind(this))
                .then(_getSelectedNode.bind(this))
                .then($deferred.resolve);
        }

        function _getSelectedFile() {
            var fileId = this.model.get('value'),
                $deferred = new $.Deferred();

            if (fileId) {
//                _getContentDetails.call(this, fileId)
//                    .done(_setSelectedContent.bind(this, $deferred));
            } else {
                $deferred.resolve();
            }

            return $deferred.promise();
        }

//        function _getContentDetails(contentId) {
//            return Api.getContentDetail(contentId);
//        }

//        function _setSelectedContent($deferred, contentDetails) {
//            this.model.set('selectedContentLabel', contentDetails.label);
//            this.model.set('selectedContent', contentDetails._id);
//            $deferred.resolve();
//        }

        function _getSelectedNode() {
            var $deferred = new $.Deferred(),
                defaultNode = this.model.get('options.defaultNode');

            if (defaultNode && defaultNode !== '0') { // default is not root
//                Api.getNodeDetail(defaultNode)
//                    .done(setSelectedNode.bind(this, $deferred));
            } else if (defaultNode && defaultNode === '0') { // default is root
                setSelectedNode.call(this, $deferred, { label : 'Root'});
            } else {
                $deferred.resolve();
            }

            return $deferred.promise();
        }

        function setSelectedNode($deferred, nodeDetails) {
            this.model.set('selectedNodeLabel', nodeDetails.label);
            $deferred && $deferred.resolve();
        }

        function afterRender() {
            this.model.set('showTree', true);
            console.log(this);
            this.$el.foundation();
        }

        function stopAccordionPropagation(e) {
            e.stopPropagation();
        }

        function setRootAsDefaultNode(e) {
            this.model.set('selectedNodeLabel', 'Root');
            this.model.set('options.defaultNode', '0');
            e.preventDefault();
        }

        function fireSelectFileModal() {
            _startModalView.call(this)
                .done(_contentReferenceSelected.bind(this));
        }

        function _startModalView() {
            this.model.set('inSetup', false);

            var $deferred = new $.Deferred(),
                modalView = new ModalView({
                    modelData : {
                        header : 'Select File',
                        selectedFile : new ProxyProperty('selectedFile', this.model),
                        selectedFileLabel : this.model.get('selectedFileLabel'),
                        _id : this.model.get('options.defaultNode')
                    },
                    $deferred : $deferred
                });

            modalView.start();
            return $deferred.promise();
        }

        function _contentReferenceSelected(modalModel) {
            this.model.set('selectedFileLabel', modalModel.selectedFileLabel);
            this.model.set('selectedFile', modalModel.selectedFile);
            this.model.set('value', modalModel.selectedFile);
        }

    });