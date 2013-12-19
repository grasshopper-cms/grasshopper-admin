/*global define:false*/
define(['grasshopperBaseView', 'jquery', 'nodeIndexView', 'nodeIndexViewConfig', 'assetIndexView',
    'assetIndexViewConfig', 'underscore', 'contentIndexView', 'contentIndexViewConfig', 'api', 'constants'],
    function (GrasshopperBaseView, $, NodeIndexView, nodeIndexViewConfig, AssetIndexView, assetIndexViewConfig, _, ContentIndexView, contentIndexViewConfig, Api, constants) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            afterRender : afterRender,
            addChildIndexViews : addChildIndexViews,
            refreshIndexViews : refreshIndexViews,
            activateTab : activateTab
        });

        function beforeRender ($deferred) {
            if (this.model.get('nodeId')) {
                buildMastheadBreadcrumb.call(this)
                    .done(function () {
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

            this.addChildIndexViews();
        }

        function addChildIndexViews () {
            addNodeIndexView.call(this);
            addAssetIndexView.call(this);
            addContentIndexView.call(this);
        }

        function refreshIndexViews () {
            this.refreshChildren();
        }

        function addNodeIndexView () {
            var nodeIndexView = new NodeIndexView(_.extend({}, nodeIndexViewConfig,
                {
                    nodeId : this.model.get('nodeId'),
                    mastheadButtons : null
                }
            ));
            this.addChild(nodeIndexView);
        }

        function addAssetIndexView () {
            var assetIndexView = new AssetIndexView(_.extend({}, assetIndexViewConfig,
                {
                    nodeId : this.model.get('nodeId'),
                    mastheadButtons : null
                }
            ));
            this.addChild(assetIndexView);
        }

        function addContentIndexView () {
            if (!this.model.get('nodeId')) {
                this.model.set('inRoot', true);
            } else {
                this.model.set('inRoot', false);
                var contentIndexView = new ContentIndexView(_.extend({}, contentIndexViewConfig,
                    {
                        nodeId : this.model.get('nodeId'),
                        mastheadButtons : null
                    }));
                this.addChild(contentIndexView);
            }
        }

        function buildMastheadBreadcrumb () {
            var self = this,
                crumb = [],
                $deferred = new $.Deferred();

            Api.getNodeDetail(this.model.get('nodeId'))
                .done(function (data) {
                    if (data.ancestors) {
                        crumb.push(self.options.breadcrumbs);
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