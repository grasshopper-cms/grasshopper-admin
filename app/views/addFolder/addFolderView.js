/*global define:false*/
define(['baseView', 'api', 'jquery', 'resources'],
    function (BaseView, Api, $, resources) {
    'use strict';

    return BaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack,
        createFolder : createFolder
    });

    function afterRender() {
        var self = this;

        console.log(this.model.get('nodeId'));

        this.displayModal(resources.node.create.enterName, 'input')
            .done(function(data) {
                self.createFolder(data)
                    .done(function() {
                        // TODO: refresh the folder listing in the background so the new folder shows up.
                        self.displayModal('Add Content Types: ', 'addContent')
                            .done(function(data) {
                                console.log(data);
                            })
                            .always(function() {
                                self.navigateBack();
                            });
                    })
                    .fail(function() {
                        self.displayModal('POSTING THE NEW FOLDER DID NOT WORK (remember that the Slug needs to be Unique...for now..until Travis implements the auto Slug generator)')
                            .always(function() {
                                self.navigateBack();
                            });
                    });
            })
            .fail(function() {
                self.navigateBack();
            });
    }

    function navigateBack() {
        this.app.router.navigateNinja(this.app.router.breadcrumb[this.app.router.breadcrumb.length - 2]);
    }

    function createFolder(folderName) {
        var $deferred = new $.Deferred(),
            data = {
                label : folderName,
                // TODO: Slug is no longer working, double check with Travis regarding API updates.
//                slug : folderName,
                parent : this.model.get('nodeId')
            };

        Api.postNewFolder(data)
            .done(function() {
                $deferred.resolve();
            })
            .fail(function() {
                $deferred.reject();
            });

        return $deferred.promise();
    }

});