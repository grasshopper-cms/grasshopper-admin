/*global define:false*/
define(['grasshopperBaseView', 'api', 'constants', 'underscore', 'contentDetailView', 'contentDetailViewConfig',
    'text!views/contentDetail/_contentDetailRow.html'],
    function (GrasshopperBaseView, Api, constants, _, ContentDetailView, contentDetailViewConfig,
              contentDetailRowTemplate) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender
        });

        function beforeRender ($deferred) {
            _getContent.call(this, $deferred);
        }

        function _getContent($deferred) {
            var self = this;
            Api.makeQuery(
                {
                    nodes : this.nodeId,
                    types : [],
                    filters : [],
                    options : {
                        fake : true
                    }
                })
                .done(function (data) {
                    _handleSuccessfulContentQuery.call(self, data, $deferred);
                })
                .fail(function() {
                    _handleFailedContentQuery.call(self, $deferred);
                });
        }

        function _handleSuccessfulContentQuery(data, $deferred) {
            var self = this;

            this.model.set('nodeContent', data);
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
            var contentDetailView = new ContentDetailView(_.extend({}, contentDetailViewConfig,
                {
                    name : 'nodeDetailRow',
                    modelData : content,
                    el : '#contentDetailRow',
                    templateHtml : contentDetailRowTemplate,
                    mastheadButtons : this.mastheadButtons
                }));
            this.addChild(contentDetailView);
        }

    });