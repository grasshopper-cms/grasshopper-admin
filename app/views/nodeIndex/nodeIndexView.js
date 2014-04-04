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
            this.model.get('childNodes').fetch()
                .done($deferred.resolve);
        }

        function afterRender() {
            this.model.get('childNodes').each(_appendNodeDetailRow.bind(this));
        }

        function _appendNodeDetailRow (model) {
            var node = model.toJSON(),
                nodeDetailView;

            nodeDetailView = new NodeDetailView({
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
            var type = context.dropbutton.type;

            switch(type) {

            case 'editName':
                nodeWorker.editName.call(this);
                break;

            case 'editContentTypes' :
                nodeWorker.editContentTypes.call(this);
                break;

            case 'deleteNode' :
                nodeWorker.deleteNode.call(this);
                break;
            }

        }
    });