/*global define:false*/
define(['grasshopperBaseView', 'addFolderViewConfig', 'resources', 'underscore',
    'nodeDetailView', 'text!views/nodeDetail/_nodeDetailRow.html'],
    function (GrasshopperBaseView, addFolderViewConfig, resources, _,
              NodeDetailView, nodeDetailRowTemplate) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : addFolderViewConfig,
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
            var nodeDetailView = new NodeDetailView({
                    name : 'nodeDetailRow',
                    modelData : {
                        label: nodeName,
                        parent: this.model.get('nodeId')
                    },
                    appendTo : '#nodeDetailRow',
                    wrapper: false,
                    template : nodeDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                });
            nodeDetailView.start();
        }

        function _navigateBack (trigger) {
            this.app.router.removeThisRouteFromBreadcrumb();
            this.app.router.navigateBack(trigger);
            this.remove();
        }

    });