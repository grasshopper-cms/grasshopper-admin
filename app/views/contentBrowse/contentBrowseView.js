/*global define:false*/
define(['grasshopperBaseView', 'contentBrowseViewConfig', 'jquery', 'nodeIndexView',
    'assetIndexView', 'underscore', 'contentIndexView',
    'api', 'constants'],
    function (GrasshopperBaseView, contentBrowseViewConfig, $, NodeIndexView, AssetIndexView,
              _, ContentIndexView, Api, constants) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : contentBrowseViewConfig,
            beforeRender : beforeRender,
            afterRender : afterRender,
            refreshIndexViews : refreshIndexViews,
            activateTab : activateTab
        });

        function beforeRender ($deferred) {
            if (this.model.get('nodeId')) {
                buildMastheadBreadcrumb.call(this)
                    .done(function () {
                        _addChildIndexViews.call(this);
                        $deferred.resolve();
                    })
                    .fail(function () {
                        $deferred.reject();
                    });
            } else {
                $deferred.resolve();
            }
        }

        function afterRender () {
            this.$el.foundation();
        }

        function _addChildIndexViews () {
            _addNodeIndexView.call(this);
            _addAssetIndexView.call(this);
            _addContentIndexView.call(this);
        }

        function refreshIndexViews () {
            this.refreshChildren();
        }

        function _addNodeIndexView () {
            var nodeIndexView = new NodeIndexView({
                    nodeId : this.model.get('nodeId'),
                    mastheadButtons : null
                });
            this.addChild(nodeIndexView);
        }

        function _addAssetIndexView () {
            var assetIndexView = new AssetIndexView({
                    nodeId : this.model.get('nodeId'),
                    mastheadButtons : null
                });
            this.addChild(assetIndexView);
        }

        function _addContentIndexView () {
            if (!this.model.get('nodeId')) {
                this.model.set('inRoot', true);
            } else {
                this.model.set('inRoot', false);
                var contentIndexView = new ContentIndexView({
                        nodeId : this.model.get('nodeId'),
                        mastheadButtons : null
                    });
                this.addChild(contentIndexView);
            }
        }

        // TODO: Refactor this method to use the breadcrumb worker.
        function buildMastheadBreadcrumb () {
            var self = this,
                crumb = [],
                $deferred = new $.Deferred();

            Api.getNodeDetail(this.model.get('nodeId'))
                .done(function (data) {
                    if (data.ancestors) {
                        crumb.push(self.breadcrumbs);
                        _.each(data.ancestors, function (ancestor) {
                            crumb.push({
                                text : ancestor.label,
                                href : constants.internalRoutes.nodeDetail.replace(':id', ancestor._id)
                            });
                        });
                    } else {
                        crumb.push(self.options.breadcrumbs);
                    }

                    crumb.push({
                        text : data.label,
                        href : constants.internalRoutes.nodeDetail.replace(':id', data._id)
                    });

                    self.model.set('breadcrumbs', crumb);
                    $deferred.resolve();
                })
                .fail(function () {
                    $deferred.reject();
                });

            return $deferred.promise();
        }

        function activateTab (tab) {
            $('#' + tab + ' a').click();
        }
    });