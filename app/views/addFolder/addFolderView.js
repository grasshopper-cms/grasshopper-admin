/*global define:false*/
define(['baseView', 'api', 'jquery', 'resources'],
    function (BaseView, Api, $, resources) {
    'use strict';

    return BaseView.extend({
        afterRender : afterRender,
        navigateBack : navigateBack
    });

    function afterRender() {
        var self = this;

        this.displayModal(resources.node.create.enterName, 'input')
            .done(function(data) {
                _createFolder(data)
                    .done(function() {
                        // TODO: somehow refesh the folder listing in the background so the new folder shows up.
                        self.displayModal('Add Content Types: ', 'addContent')
                            .done(function() {

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

    function _createFolder(folderName) {
        var $deferred = new $.Deferred(),
            data = {
                label : folderName,
                slug : 'sfdsafdsdsaoer',
                parent : '5261781556c02c072a000007'
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