/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'require'],
    function (GrasshopperBaseView, _, $, require) {

        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender: beforeRender
        });

        function beforeRender($deferred) {
            var self = this;
            this.model.get('users').fetch(/*{success:function(){
                debugger;
            }}*/).fail(function (jqXHR, status, error) {
                self.model.get('users').reset(
                    [
                        {_id: self.app.user.get('_id'), displayName: self.app.user.get('displayName')}
                    ]
                );
                self.model.set('no_permissions', true);
                $deferred.resolve();
            }).done($deferred.resolve);
           /* setTimeout(function(){
                debugger;
            },3000);*/
        }


    });