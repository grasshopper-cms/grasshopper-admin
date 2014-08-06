/*global define:false*/
define(['jquery', 'underscore', 'grasshopperBaseView', 'userIndexViewConfig', 'constants', 'paginationWorker'],
    function ($, _, GrasshopperBaseView, userIndexViewConfig, constants, paginationWorker) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : userIndexViewConfig,
            beforeRender : beforeRender,
            addNewUser : addNewUser,
            searchContent : searchContent
        });

        function beforeRender ($deferred) {
            $.when(this.searchContent(undefined, undefined, true))
                .done($deferred.resolve);
        }

        function addNewUser() {
            this.app.router.navigateTrigger(constants.internalRoutes.addUser);
        }

        function searchContent(e, context, isFirstQuery) {
            var users, contentSearchValue,
                $deferred = new $.Deferred();

            if (!_.isUndefined(e) && !_.isUndefined(constants.controlKeyCodeMap[e.keyCode])) {
                return false;
            }

            users = this.model.get('users');
            contentSearchValue = $.trim(this.model.get('contentSearchValue'));

            if (isFirstQuery) {
                users.searchQuery(contentSearchValue);
            } else {
                _toggleSearchSpinner.call(this);
                users.searchQuery(contentSearchValue)
                    .done(
                        paginationWorker.setUrl.bind(this, users.limit, users.skip, contentSearchValue),
                        _toggleSearchSpinner.bind(this, true),
                        $deferred.resolve()
                    )
                    .fail( $deferred.reject() );
            }
        }

        function _toggleSearchSpinner(revert) {
            var $searchIcon = this.$('.contentSearchIcon');

            if (revert) {
                $searchIcon.removeClass('fa-refresh fa-spin');
                $searchIcon.addClass('fa-search');
            } else {
                $searchIcon.removeClass('fa-search');
                $searchIcon.addClass('fa-refresh fa-spin');
            }
        }

    });