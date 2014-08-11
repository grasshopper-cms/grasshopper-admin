/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery',
    'mixins/itemSelectModal', 'mixins/buildNodeRadioList'],
    function (GrasshopperBaseView, _, $,
              itemSelectModal, buildNodeRadioList) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender: afterRender,
            stopAccordionPropagation: stopAccordionPropagation,
            fireSelectFileModal: fireSelectFileModal,
            selectDefaultNode: selectDefaultNode,
            fireFileDetailModal: fireFileDetailModal
        })
            .extend(itemSelectModal)
            .extend(buildNodeRadioList);

        function afterRender () {
            if (this.model.get('inSetup')) {
                this.model.get('childNodesDeep').fetch()
                    .done(
                        this.buildNodeRadioList.bind(this, this.$('#nodeRadioList'), this.model.get('childNodesDeep')),
                        _getSelectedNode.bind(this)
                    );
            }
        }

        function _getSelectedNode () {
            var defaultNode = this.model.get('options.defaultNode'),
                $defaultNodeRadio = this.$('#selectDefaultNode').find('#'+ defaultNode);

            $defaultNodeRadio.prop('checked', true);

            this.selectDefaultNode();
        }

        function selectDefaultNode() {
            var $selectedNode = this.$('#selectDefaultNode').find('input:radio[name="nodeRadio"]:checked'),
                selectedNodeId = $selectedNode.val(),
                selectedNodeLabel = $selectedNode.attr('data-label');

            this.model.set('selectedNodeLabel', selectedNodeLabel);
            this.model.set('options.defaultNode', selectedNodeId);
        }

//        function setSelectedNode ($deferred, nodeDetails) {
//            this.model.set('selectedNodeLabel', nodeDetails.label);
//            $deferred && $deferred.resolve();
//        }

        function stopAccordionPropagation (e) {
            e.stopPropagation();
        }

//        function setRootAsDefaultNode (e) {
//            this.model.set('selectedNodeLabel', 'Root');
//            this.model.set('options.defaultNode', '0');
//            e.preventDefault();
//        }

        function fireSelectFileModal () {
            _startModalView.call(this)
                .done(_fileReferenceSelected.bind(this));
        }

        function _startModalView () {
            this.model.set('inSetup', false);

            return this.fireItemSelectModal();
        }

        function _fileReferenceSelected (selectedContentId) {
            console.log(selectedContentId);
//            this.model.set('selectedContentName', modalModel.selectedContentName);
//            this.model.set('selectedContent', modalModel.selectedContent);
//            this.model.set('value', _.last(modalModel.selectedContent.split('/'), 2).join('/'));
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