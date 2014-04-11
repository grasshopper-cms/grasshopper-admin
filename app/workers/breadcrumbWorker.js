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
        var nodeId = this.model.get('meta.node'),
            self = this;

        _getNodeDetailRecursively.call(this, nodeId)
            .then(function() {
                if(isNew) {
                    _addIsNewScope.call(self, $deferred, nodeId);
                } else {
                    _addCurrentScope.call(self, $deferred);
                }
            });
    }

    function contentTypeBreadcrumb($deferred, isNew) {
        if (isNew) {
            _addIsNewScope.call(this, $deferred, 'new');
        } else {
            _addCurrentScope.call(this, $deferred);
        }
    }

    function contentBrowse($deferred) {
        var nodeId = this.model.get('nodeId');

        _getNodeDetailRecursively.call(this, nodeId)
            .then($deferred.resolve);
    }

    function userBreadcrumb($deferred, isNew) {
        if(isNew) {
            _addIsNewScope.call(this, $deferred, 'new');
        } else {
            this.breadcrumbs.push({
                text: this.model.get('fullname'),
                href: this.model.get('href')
            });
            _finishBreadcrumb.call(this, $deferred);
        }
    }

    function _addIsNewScope($deferred, replaced) {
        this.breadcrumbs.push({
            text: resources.newWord,
            href: constants.internalRoutes[this.name].replace(':id', replaced)
        });
        _finishBreadcrumb.call(this, $deferred);
    }

    function _addCurrentScope($deferred) {
        this.breadcrumbs.push({
            text: this.model.get('label'),
            href: constants.internalRoutes[this.name].replace(':id', this.model.get('_id'))
        });
        _finishBreadcrumb.call(this, $deferred);
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

    function _finishBreadcrumb($deferred) {
        channels.views.trigger('updateMastheadBreadcrumbs', this);
        $deferred.resolve();
    }

});