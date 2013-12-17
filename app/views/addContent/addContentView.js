/*global define:false*/
define(['grasshopperBaseView', 'resources', 'contentTypeWorker'],
    function (GrasshopperBaseView, resources, contentTypeWorker) {
    'use strict';

    return GrasshopperBaseView.extend({
        beforeRender : beforeRender
    });

    function beforeRender($deferred) {
        if(this.model.get('nodeId') !== '0'){
            handleCreateContent.call(this, $deferred);
        } else {
            createContentInRoot.call(this, $deferred);
        }
    }

    function handleCreateContent($deferred) {
        var self = this;
        contentTypeWorker.getNodesContentTypes(this.model.get('nodeId'))
            .done(function(data) {
                console.log(data);
                self.displayModal(
                    {
                        msg: resources.thisIsNotImplemented,
                        data: data,
                        type: 'radio'
                    })
                    .done(function() {})
                    .fail(function() {
                        $deferred.resolve();
                        navigateBack.call(self, true);
                    })
                    .always(function() {
                        $deferred.resolve();
                    });
            })
            .fail(function(data) {
//                $deferred.reject();
                console.log(data);
            });
    }

    function createContentInRoot() {
        var self = this;
        this.displayModal(
            {
                msg: 'You cannot create content in the Root.'
            })
            .always(function() {
//                $deferred.resolve();
                navigateBack.call(self, true);
            });
    }

    function navigateBack(trigger) {
        this.app.router.navigateBack(trigger);
        this.app.router.removeThisRouteFromBreadcrumb();
        this.remove();
    }

});