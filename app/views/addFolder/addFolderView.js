/*global define:false*/
define(['grasshopperBaseView', 'resources', 'underscore',
    'nodeDetailView', 'nodeDetailViewConfig', 'text!views/nodeDetail/_nodeDetailRow.html'],
    function (GrasshopperBaseView, resources, _,
              NodeDetailView, nodeDetailViewConfig, nodeDetailRowTemplate) {
        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender () {
            _getNewFolderName.call(this);
        }

        function _getNewFolderName() {
            var self = this;

            this.displayModal(
                {
                    msg : resources.node.enterName,
                    type : 'input'
                })
                .done(function (modalData) {
                    self.channels.views.trigger('activateTab', 'contentTab');
                    _appendNodeDetailRow.call(self, modalData.data);
                })
                .always(_navigateBack.bind(this));
        }

        function _appendNodeDetailRow(nodeName) {
            var nodeDetailView = new NodeDetailView(_.extend({}, nodeDetailViewConfig,
                {
                    name : 'nodeDetailRow',
                    modelData : {
                        label: nodeName,
                        parent: this.model.get('nodeId')
                    },
                    el : '#nodeDetailRow',
                    template : nodeDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                }));
            nodeDetailView.start();
        }

        function _navigateBack (trigger) {
            this.app.router.navigateBack(trigger);
            this.app.router.removeThisRouteFromBreadcrumb();
            this.remove();
        }

    });