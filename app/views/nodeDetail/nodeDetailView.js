/*global define:false*/
define(['grasshopperBaseView', 'nodeDetailViewConfig', 'nodeWorker', 'mixins/handleRowClick'],
    function (GrasshopperBaseView, nodeDetailViewConfig, nodeWorker, handleRowClick) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : nodeDetailViewConfig,
            afterRender : afterRender,
            prepareToDeleteNode : prepareToDeleteNode,
            prepareToEditContentTypes : prepareToEditContentTypes,
            editNodeName : editNodeName,
            editContentTypes : editContentTypes
        }).extend(handleRowClick);

        function afterRender() {
            if(this.model.isNew()) {
                this.model.save()
                    .done(editContentTypes.bind(this));
            }
        }

        function prepareToDeleteNode (e) {
            e.stopPropagation();
            nodeWorker.deleteNode.call(this);
        }

        function editNodeName(e) {
            e.stopPropagation();
            nodeWorker.editName.call(this);
        }

        function prepareToEditContentTypes(e) {
            e.stopPropagation();
            this.editContentTypes();
        }

        function editContentTypes() {
            nodeWorker.editContentTypes.call(this);
        }

    });