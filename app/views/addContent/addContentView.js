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
                data = [{_id: 1234, helpText: 'HELP TEXT', label: 'First ContentType'}, {_id: 23456, helpText: 'HELP TEXT 2', label: 'Second ContentType'}, {_id: 45454, helpText: 'HELP TEXT 3', label: 'second ContentType'}];
                self.displayModal(
                    {
                        msg: resources.contentType.selectContentType,
                        data: data,
                        type: 'radio'
                    })
                    .done(function(modalData) {
                        self.model.set('contentTypeId', modalData.selectedType);
                        $deferred.resolve();
                    })
                    .fail(function() {
                        $deferred.reject();
                        navigateBack.call(self, true);
                    });
            })
            .fail(function(data) {
                $deferred.reject();
                console.log(data);
            });
    }

    function createContentInRoot($deferred) {
        var self = this;
        this.displayModal(
            {
                msg: resources.contentType.contentInRoot
            })
            .always(function() {
                $deferred.reject();
                navigateBack.call(self, true);
            });
    }

    function navigateBack(trigger) {
        this.app.router.navigateBack(trigger);
        this.app.router.removeThisRouteFromBreadcrumb();
//        this.remove();
    }

});