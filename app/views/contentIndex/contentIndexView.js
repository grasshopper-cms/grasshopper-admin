/*global define:false*/
define(['grasshopperBaseView', 'contentIndexViewConfig', 'api', 'constants', 'underscore', 'contentDetailView',
    'text!views/contentDetail/_contentDetailRow.html', 'jquery', 'resources'],
    function (GrasshopperBaseView, contentIndexViewConfig, Api, constants, _, ContentDetailView,
              contentDetailRowTemplate, $, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentIndexViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender
        });

        function beforeRender ($deferred) {
            _getContent.call(this, $deferred);
        }

        function afterRender() {
            var nodeContent = this.model.get('nodeContent');

            if(_.isEmpty(nodeContent)) {
                _addEmptyNodeMessage.call(this);
            }

            _.each(nodeContent, _appendContentDetailRow.bind(this));
        }

        function _getContent($deferred) {
            Api.getNodesContent(this.nodeId)
                .done(_handleSuccessfulContentQuery.bind(this, $deferred))
                .fail(_handleFailedContentQuery.bind(this, $deferred));
        }

        function _handleSuccessfulContentQuery($deferred, data) {
            this.model.set('nodeContent', data);

            _updateMastheadItemsCount.call(this);

            $deferred.resolve();
        }

        function _handleFailedContentQuery($deferred) {
            this.displayAlertBox({
                msg: 'Content Could not be retrieved in this node.'
            });
            $deferred.reject();
        }

        function _appendContentDetailRow (content) {
            var contentDetailView = new ContentDetailView({
                    name : 'contentDetailRow',
                    modelData : content,
                    appendTo : this.$el,
                    wrapper : false,
                    template : contentDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                });
            contentDetailView.start();
        }

        function _updateMastheadItemsCount() {
            this.app.router.mastheadView.model.set('itemsCount', _.size(this.model.attributes.nodeContent));
        }

        function _addEmptyNodeMessage() {
            var template = '<tr><td>[[= msg ]] <span><a href="[[= href ]]">[[= linkText ]]</a></span></td></tr>';

            $('#contentDetailRow').append(_.template(template, {
                msg : resources.node.emptyNode,
                linkText : resources.node.clickToAdd,
                href : constants.internalRoutes.addContent.replace(':id', this.nodeId)
            }));
        }

    });