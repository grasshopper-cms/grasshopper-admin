/*global define:false*/
define(['grasshopperBaseView', 'plugins/embeddedcontent/nodeTree/config', 'underscore'],
    function (GrasshopperBaseView, NodeTreeConfig, _) {
        'use strict';

        return GrasshopperBaseView.extend({
            defaultOptions : NodeTreeConfig,
            beforeRender : beforeRender,
            toggleFolderOpenCloseIcon : toggleFolderOpenCloseIcon
        });

        function beforeRender($deferred) {
            if(_.isNull(this.model.get('parent'))) {
                _fetchChildren.call(this, $deferred);
            } else {
                $deferred.resolve();
            }
        }

        function _fetchChildren($deferred) {
            var self = this;
            _toggleLoadingSpinner.call(this);
            this.model.get('children').fetch()
                .done(function() {
                    $deferred.resolve();
                    _toggleLoadingSpinner.call(self);
                });
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

        function toggleFolderOpenCloseIcon() {
            this.model.toggle('folderOpen');
        }

    });