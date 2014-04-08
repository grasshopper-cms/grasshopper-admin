/*global define:false*/
define(['grasshopperBaseView', 'resources', 'addUserViewConfig',
        'breadcrumbWorker', 'contentTypeWorker', 'jquery'],
    function (GrasshopperBaseView, resources, addUserViewConfig,
              breadcrumbWorker, contentTypeWorker, $) {
    'use strict';

    return GrasshopperBaseView.extend({
        defaultOptions : addUserViewConfig,
        beforeRender : beforeRender,
        saveUser : saveUser
    });

    function beforeRender($deferred) {
        _getUserContentType.call(this)
            .done(_updateMastheadBreadcrumbs.bind(this, $deferred))
            .fail(_couldNotFindUserContentType.bind(this, $deferred));
    }

    function _getUserContentType() {
        var $deferred = new $.Deferred(),
            self = this;

        contentTypeWorker.getUserContentType()
            .done(function(usersContentType) {
                self.model.set('schema', usersContentType.fields);
                $deferred.resolve();
            })
            .fail($deferred.reject);

        return $deferred.promise();
    }

    function _couldNotFindUserContentType($deferred) {
        _navigateBack.call(this);
        this.displayAlertBox({
            msg: 'Could not find Users content type. Please make one.'
        });
        $deferred.reject();
    }

    function saveUser () {
        this.model.save()
            .success(_handleSuccessfulSave.bind(this))
            .error(_handleSaveError.bind(this));

        return false;
    }

    function _handleSuccessfulSave () {
        this.app.router.navigateTrigger('users');
        this.displayTemporaryAlertBox(
            {
                msg : resources.user.newUserAdded,
                status : true
            }
        );
    }

    function _handleSaveError (xhr) {
        this.displayAlertBox(
            {
                msg : xhr.responseJSON.message
            }
        );
    }

    function _updateMastheadBreadcrumbs($deferred) {
        breadcrumbWorker.userBreadcrumb.call(this, $deferred, true);
    }

    function _navigateBack (trigger) {
        this.app.router.removeThisRouteFromBreadcrumb();
        this.app.router.navigateBack(trigger);
        this.remove();
    }
});