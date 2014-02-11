define(['api', 'constants', 'jquery', 'resources'], function (Api, constants, $, resources) {
    'use strict';

    return {
        contentBreadcrumb : contentBreadcrumb
    };

    function contentBreadcrumb($deferred, isNew) {
        var nodeId = this.model.get('node._id');

        _getNodeDetailRecursively.call(this, nodeId)
            .then(_addCurrentScope.bind(this, $deferred, isNew));
    }

    function _addCurrentScope($deferred, isNew) {
        if(isNew) {
            this.breadcrumbs.push({
                text: resources.newWord,
                href: constants.internalRoutes.createContent
            });
        } else {
            this.breadcrumbs.push({
                text: this.model.get('label'),
                href: constants.internalRoutes.contentDetail.replace(':id', this.model.get('_id'))
            });
        }
        $deferred.resolve();
    }

    function _getNodeDetailRecursively(nodeId, $deferred) {
        var self = this;

        $deferred = ($deferred) ? $deferred : new $.Deferred();

        Api.getNodeDetail(nodeId)
            .done(function(nodeDetail) {

                self.breadcrumbs.push({
                    text: nodeDetail.label,
                    href: constants.internalRoutes.nodeDetail.replace(':id', nodeDetail._id)
                });

                if(nodeDetail.parent !== null) {
                    _getNodeDetailRecursively.call(self, nodeDetail.parent._id, $deferred);
                } else {
                    $deferred.resolve();
                }
            });

        return $deferred.promise();
    }

});