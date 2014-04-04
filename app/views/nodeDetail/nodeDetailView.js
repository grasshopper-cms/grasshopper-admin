/*global define:false*/
define(['grasshopperBaseView', 'nodeDetailViewConfig', 'nodeWorker'],
    function (GrasshopperBaseView, nodeDetailViewConfig, nodeWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : nodeDetailViewConfig,
            afterRender : afterRender,
            prepareToDeleteNode : prepareToDeleteNode,
            handleRowClick : handleRowClick,
            editNodeName : editNodeName,
            editContentTypes : editContentTypes
        });

        function afterRender() {
            if(this.model.isNew()) {
                this.model.save()
                    .done(this.editContentTypes.bind(this));
            }
        }

        function prepareToDeleteNode () {
            nodeWorker.deleteNode.call(this);
        }

        function handleRowClick () {
            this.app.router.navigateTrigger(this.model.get('href'));
            return false;
        }

        function editNodeName() {
            nodeWorker.editName.call(this);
        }

        function editContentTypes() {
            nodeWorker.editContentTypes.call(this);
        }

    });