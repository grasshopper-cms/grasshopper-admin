define(['api', 'constants', 'jquery', 'resources', 'masseuse', 'underscore'],
    function (Api, constants, $, resources, masseuse, _) {
    'use strict';

    var channels = new masseuse.utilities.channels();

    return {
        contentBreadcrumb : contentBreadcrumb,
        contentTypeBreadcrumb : contentTypeBreadcrumb,
        contentBrowse : contentBrowse,
        userBreadcrumb : userBreadcrumb
    };

    function contentBreadcrumb($deferred, isNew) {
        var nodeId = this.model.get('node._id');

        _getNodeDetailRecursively.call(this, nodeId)
            .then(_addCurrentScope.bind(this, $deferred, isNew));
    }

    function contentTypeBreadcrumb($deferred, isNew) {
        _addCurrentScope.call(this, $deferred, isNew);
    }

    function contentBrowse($deferred) {
        var nodeId = this.model.get('nodeId');

        _getNodeDetailRecursively.call(this, nodeId)
            .then($deferred.resolve);
    }

    function userBreadcrumb($deferred, isNew) {
        console.log(this);
        $deferred.resolve();
        console.log(isNew);
//        _addCurrentScope.call(this, $deferred, isNew);
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
                href: constants.internalRoutes[this.name].replace(':id', this.model.get('_id'))
            });
        }
        channels.views.trigger('updateMastheadBreadcrumbs', this);
        $deferred.resolve();
    }


    function _getNodeDetailRecursively(nodeId, $deferred, depthFromEnd) {
        var self = this;

        $deferred = $deferred ? $deferred : new $.Deferred();
        depthFromEnd = depthFromEnd ? depthFromEnd : 0;

        Api.getNodeDetail(nodeId)
            .done(function(nodeDetail) {

                if(!_.isEmpty(nodeDetail)) {
                    self.breadcrumbs.splice(self.breadcrumbs.length - depthFromEnd, 0 ,{
                        text: nodeDetail.label,
                        href: constants.internalRoutes.nodeDetail.replace(':id', nodeDetail._id)
                    });

                    depthFromEnd++;

                    if(nodeDetail.parent !== null) {
                        _getNodeDetailRecursively.call(self, nodeDetail.parent._id, $deferred, depthFromEnd);
                    } else {
                        $deferred.resolve();
                    }
                } else {
                    $deferred.resolve();
                }
            });

        return $deferred.promise();
    }

});