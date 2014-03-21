/*global define:false*/
define(['grasshopperBaseView', 'nodeIndexViewConfig', 'nodeDetailView', 'underscore',
    'text!views/nodeDetail/_nodeDetailRow.html', 'nodeWorker'],
    function (GrasshopperBaseView, nodeIndexViewConfig, NodeDetailView, _,
              nodeDetailRowTemplate, nodeWorker) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions: nodeIndexViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            updateCurrentNode : updateCurrentNode
        });

        function beforeRender ($deferred) {
            this.model.fetch()
                .done(_updateMastheadNodesCount.bind(this, $deferred));
        }

        function afterRender() {
            var models = _.omit(this.model.attributes, 'resources', 'nodeId');

            _.each(models, _appendNodeDetailRow.bind(this));
        }

        function _updateMastheadNodesCount($deferred) {
            this.app.router.mastheadView.model.set('nodesCount', _.size(this.model.attributes) - 2);
            $deferred.resolve();
        }

        function _appendNodeDetailRow (node) {
            var nodeDetailView = new NodeDetailView({
                    name : 'nodeDetailRow',
                    modelData : node,
                    appendTo : this.$el,
                    wrapper : false,
                    template : nodeDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                });
            nodeDetailView.start();
        }

        function updateCurrentNode(context) {
            var type = context.dropbutton.type,
                nodeId = this.model.get('nodeId');

            switch(type) {

            case 'editName':
                nodeWorker.editName(nodeId);
                break;

            case 'editContentTypes' :
                nodeWorker.editContentTypes(nodeId);
                break;

            case 'deleteNode' :
                nodeWorker.deleteNode(nodeId);
                break;
            }

        }
    });