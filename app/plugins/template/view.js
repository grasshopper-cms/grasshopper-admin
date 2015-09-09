/*global define:false*/
define(['pluginBaseView', 'underscore'],
    function (PluginBaseView, _) {
        'use strict';

        return PluginBaseView.extend({
            afterRender : afterRender,
            refreshTemplate : _.debounce(refreshTemplate, 300),
            beforeSave : beforeSave
        });

        function afterRender() {

        }

        function refreshTemplate(fields) {
            var template = _.template(this.model.get('options').template);

            this.model.set('value', template(fields));
        }

        function beforeSave() {

        }
    });
