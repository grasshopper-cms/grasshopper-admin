/*global define:false*/
define(['grasshopperBaseView', 'userDetailViewConfig', 'resources', 'constants', 'breadcrumbWorker'],
    function (GrasshopperBaseView, userDetailViewConfig, resources, constants, breadcrumbWorker) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : userDetailViewConfig,
            beforeRender : beforeRender,
            updateModel : updateModel,
            toggleEnabled : toggleEnabled,
            handleRowClick : handleRowClick
        });

        function beforeRender ($deferred) {

            // Checking to see if the current model's ID is the same as Logged in user, the API endpoints are
            // different for Admin editing their own (/user) and admin editing someone else (/users/id)
            // TODO: this can be refactored, URL's are a function, I can do the switching there.
            if (this.model.get('_id') === this.app.user.get('_id')) {
                this.model.url = constants.api.user.url;
            } else {
                this.model.urlRoot = constants.api.users.url;
            }


            if (this.model.has('role')) {
                _updateMastheadBreadcrumbs.call(this, $deferred);
            } else {
                this.model.fetch()
                    .done(_updateMastheadBreadcrumbs.bind(this, $deferred));
            }

        }

        function updateModel () {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this))
                .fail(_handleFailedSave.bind(this));

            return false;
        }

        function toggleEnabled () {
            this.model.toggle('enabled');
            this.model.trigger('change:enabled');
            this.updateModel();
        }

        function handleRowClick (e) {
            e.stopPropagation();
            this.app.router.navigateTrigger(this.model.get('href'), {}, true);
        }

        function _handleSuccessfulSave (model) {
            this.displayTemporaryAlertBox(
                {
                    msg : resources.user.successfullyUpdated,
                    status : true
                }
            );
            _updateNameInHeader.call(this, model);
        }

        function _handleFailedSave (xhr) {
            this.displayAlertBox(
                {
                    msg : xhr.responseJSON.message
                }
            );
        }

        function _updateNameInHeader (model) {
            if (this.app.user.get('_id') === model._id) {
                this.app.user.set(model);
            }
        }

        function _updateMastheadBreadcrumbs($deferred) {
            breadcrumbWorker.userBreadcrumb.call(this, $deferred);
        }

    });