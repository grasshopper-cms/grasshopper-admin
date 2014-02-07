define(['api', 'constants', 'jquery'], function (Api, constants, $) {
    'use strict';

    return {
        contentBreadcrumb : contentBreadcrumb
    };

    function contentBreadcrumb($deferred) {
        var label = this.model.get('label'),
            nodeId = this.model.get('node._id'),
            self = this;

        _getNodeDetailRecursively.call(this, nodeId)
            .done(function() {
                self.breadcrumbs.push({
                    text: label,
                    href: constants.internalRoutes.contentDetail.replace(':id', self.model.get('_id'))
                });
                $deferred.resolve();
            });
    }

    function _getNodeDetailRecursively(nodeId) {
        var $deferred = new $.Deferred(),
            self = this;

        Api.getNodeDetail(nodeId)
            .done(function(nodeDetail) {
                self.breadcrumbs.push({
                    text: nodeDetail.label,
                    href: constants.internalRoutes.nodeDetail.replace(':id', nodeDetail._id)
                });
                if(nodeDetail.ancestors.length) {
                    _getNodeDetailRecursively.call(null, nodeDetail.ancestors[0]);
                } else {
                    $deferred.resolve();
                }
            });

        return $deferred.promise();
    }

});