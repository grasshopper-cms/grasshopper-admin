/*global define:false*/
define(['grasshopperBaseView', 'resources', 'addUserViewConfig',
        'breadcrumbWorker', 'contentTypeWorker', 'jquery', 'underscore'],
    function (GrasshopperBaseView, resources, addUserViewConfig,
              breadcrumbWorker, contentTypeWorker, $, _) {
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
                if(_.isUndefined(usersContentType)) {
                    $deferred.reject();
                } else {
                    self.model.set('schema', usersContentType.fields);
                    $deferred.resolve();
                }
            });

        return $deferred.promise();
    }

    function _couldNotFindUserContentType($deferred) {
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

});