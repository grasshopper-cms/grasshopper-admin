/*global define:false*/
define(['grasshopperBaseView', 'userDetailViewConfig', 'resources', 'userWorker', 'constants'],
    function (GrasshopperBaseView, userDetailViewConfig, resources, userWorker, constants) {
        'use strict';
        return GrasshopperBaseView.extend({
            defaultOptions : userDetailViewConfig,
            beforeRender : beforeRender,
            updateModel : updateModel,
            toggleEnabled : toggleEnabled,
            handleRowClick : handleRowClick
        });

        function beforeRender ($deferred) {

            // It is checking to see if the current model's ID is the same as Logged in user, the API endpoints are
            // different for Admin editing their own (/user) and admin editing someone else (/users/id)
            if (this.model.get('_id') === this.app.user.get('_id')) {
                this.model.url = constants.api.user.url;
            } else {
                this.model.urlRoot = constants.api.users.url;
            }

            if (this.model.has('role')) {
                $deferred.resolve();
            } else {
                this.model.fetch()
                    .done($deferred.resolve);
            }
        }

        function updateModel () {
            this.model.save()
                .done(_handleSuccessfulSave.bind(this))
                .fail(_handleFailedSave.bind(this));

            return false;
        }

        function toggleEnabled () {
            var enabled = this.model.get('enabled');
            this.model.set('enabled', (enabled) ? false : true);
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

    });