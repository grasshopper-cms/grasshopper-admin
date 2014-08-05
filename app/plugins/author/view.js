/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'require', 'resources'],
    function (GrasshopperBaseView, _, $, require, resources) {

        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender,
            afterRender: afterRender
        });

        function beforeRender($deferred) {
            var self = this;
            this.model.get('users').fetch().fail(function (jqXHR, status, error) {
                self.model.get('users').reset(
                    [
                        {_id: self.app.user.get('_id'), displayName: self.app.user.get('displayName')}
                    ]
                );
                self.model.set('no_permissions', true);
                $deferred.resolve();
            }).done($deferred.resolve);
        }

        function afterRender(){
            this.$('select').select2(
                {
                    containerCssClass: 'authorDropdownSelectContainer',
                    dropdownCssClass: 'authorDropdownSelectDrop',
                    placeholder: resources.selectOption
                });
        }


    });