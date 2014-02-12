/*global define:false*/
define(['grasshopperBaseView', 'contentIndexViewConfig', 'api', 'constants', 'underscore', 'contentDetailView',
    'text!views/contentDetail/_contentDetailRow.html', 'jquery', 'resources'],
    function (GrasshopperBaseView, contentIndexViewConfig, Api, constants, _, ContentDetailView,
              contentDetailRowTemplate, $, resources) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentIndexViewConfig,
            beforeRender : beforeRender
        });

        function beforeRender ($deferred) {
            _getContent.call(this, $deferred);
        }

        function _getContent($deferred) {
            Api.makeQuery(
                {
                    nodes : this.nodeId,
                    types : [],
                    filters : [],
                    options : {
                        fake : true
                    }
                })
                .done(_handleSuccessfulContentQuery.bind(this, $deferred))
                .fail(_handleFailedContentQuery.bind(this, $deferred));
        }

        function _handleSuccessfulContentQuery($deferred, data) {
            var self = this;

            this.model.set('nodeContent', data);

            if(_.isEmpty(data)) {
                _addEmptyNodeMessage.call(this);
            }

            _.each(data, function (content) {
                _appendContentDetailRow.call(self, content);
            });
            this.app.router.mastheadView.model.set('itemsCount', _.size(this.model.attributes.nodeContent));
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
                    name : 'nodeDetailRow',
                    modelData : content,
                    appendTo : this.$el,
                    wrapper : false,
                    template : contentDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                });
            this.addChild(contentDetailView);
        }

        function _addEmptyNodeMessage() {
            var template = '<tr><td>[[= msg ]] <span><a href="[[= href ]]">[[= linkText ]]</a></span></td></tr>';

            $('#contentDetailRow').append(_.template(template, {
                msg : resources.node.emptyNode,
                linkText : resources.node.clickToAdd,
                href : constants.internalRoutes.createContent.replace(':id', this.nodeId)
            }));
        }

    });