/*global define:false*/
define(['grasshopperBaseView', 'nodeDetailViewConfig', 'nodeWorker'],
    function (GrasshopperBaseView, nodeDetailViewConfig, nodeWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : nodeDetailViewConfig,
            afterRender : afterRender,
            prepareToDeleteNode : prepareToDeleteNode,
            prepareToEditContentTypes : prepareToEditContentTypes,
            handleRowClick : handleRowClick,
            editNodeName : editNodeName,
            editContentTypes : editContentTypes
        });

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

        function handleRowClick () {
            this.app.router.navigateTrigger(this.model.get('href'));
            return false;
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