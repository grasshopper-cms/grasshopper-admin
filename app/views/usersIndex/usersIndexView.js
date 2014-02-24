/*global define:false*/
define(['jquery', 'grasshopperBaseView', 'usersIndexViewConfig'],
    function ($, GrasshopperBaseView, usersIndexViewConfig) {

        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : usersIndexViewConfig,
            beforeRender : beforeRender
//            goToPage : goToPage,
//            checkAndSetLimit : checkAndSetLimit,
//            changeLimit : changeLimit
        });

        function beforeRender ($deferred) {
            this.model.get('users').fetch()
                .done($deferred.resolve);

//            this.goToPage(model.pageNumber || model.defaultPage, model.pageLimit || model.defaultLimit)
//                .done(function () {
//                    self.model.get('users').each(function (model) {
//                        self.appendUserRow(model);
//                    });
//                    $deferred.resolve();
//                });
        }

//        function goToPage (page, limit) {
//            var pageLimit = this.checkAndSetLimit(limit),
//                $deferred = new $.Deferred();
//
//            return userWorker.getUsers(this, {
//                data : {
//                    page : page,
//                    limit : pageLimit
//                }
//            }, $deferred);
//        }
//
//        function checkAndSetLimit (limit) {
//            if (limit) {
//                this.model.set('pageLimit', limit);
//            }
//            return this.model.get('pageLimit');
//        }
//
//        function changeLimit (event) {
//            this.goToPage(constants.userCollection.page, event.target.value);
//        }

    });