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

            self.model.get('users').fetch()
                .fail(function (jqXHR, status, error) {
                    self.model.get('users').reset([ self.app.user ]);
                    self.model.set('no_permissions', true);
                    $deferred.resolve();
                })
                .done(function () {
                    var filteredUsers = self.model.get('users').filter(function (item) {
                        return _.contains(['admin', 'editor', 'author'], item.get('role'));
                    });
                    self.model.get('users').reset(filteredUsers);
                    $deferred.resolve();
                });
        }

        function afterRender() {
            var value = this.model.get('value'),
                selectEl = this.$('select');

            selectEl.select2(
                {
                    containerCssClass : 'authorDropdownSelectContainer',
                    dropdownCssClass : 'authorDropdownSelectDrop',
                    placeholder : resources.plugins.author.selectUser,
                    allowClear : true
                })
                .on('change', _changeValue.bind(this));

            if (value && typeof(value) === 'object') {
                selectEl.select2('val', value.id);
            } else if (value && typeof(value) === 'string') {
                selectEl.select2('val', value);
            }
        }

        function _getValueStruct(id) {
            var foundUser = this.model.get('users').findWhere({ _id : id });

            if (foundUser){
                return {
                    id : id,
                    displayName : foundUser.get('displayName')
                };
            }
            // if no user found, return undefined
        }

        function _changeValue(e) {
            this.model.set('value', _getValueStruct.call(this, e.val));
        }

    });