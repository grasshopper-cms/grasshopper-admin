/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery',
    'plugins/richtext/fileBrowser/view', 'plugins/richtext/ckeditorConfig'],
    function (GrasshopperBaseView, _, $,
              FileBrowserView, ckeditorConfig) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            remove : remove
        });

        function afterRender() {
            if(this.model.get('inSetup')) {

            } else {
                _startCkeditor.call(this)
                    .done(
                        _setEditorValue.bind(this),
                        _setEditorEventHandling.bind(this),
                        _overRideWindowOpen.bind(this)
                    );
            }

        }

        function _startCkeditor() {
            var $deferred = new $.Deferred(),
                self = this;

            _toggleLoadingSpinner.call(this);

            require(['ckeditorAdapter'], function() {

                self.ckeditor = self.$('#ckeditor' + self.model.cid).ckeditor(ckeditorConfig,
                    function() {
                        _toggleLoadingSpinner.call(self);
                        $deferred.resolve();
                    }).editor;
            });

            return $deferred.promise();
        }

        function _setEditorValue() {
            console.log('setEditorValue was called');
            if(!_.isUndefined(this.model.get('value'))) {
                this.ckeditor.setData(this.model.get('value'));
            }
        }

        function _setEditorEventHandling() {
            console.log('setEditorValue event handling');
            this.ckeditor.on('change', _setContentValue.bind(this));
        }

        function _setContentValue() {
            console.log('setEditorValue get value');
            console.log(this.ckeditor.getData());
            this.model.set('value', this.ckeditor.getData());
        }

        function _overRideWindowOpen() {
            this.oldWindowOpen = window.open;

            window.open = window.opener = _startFileBrowser.bind(this);
        }

        function remove() {
            if(!this.model.get('inSetup')) {
                window.open = this.oldWindowOpen;
                window.CKEDITOR.instances['ckeditor' + this.model.cid].destroy();
            }

            GrasshopperBaseView.prototype.remove.apply(this, arguments);
        }

        function _toggleLoadingSpinner() {
            this.model.toggle('loading');
        }

        function _startFileBrowser() {
            _fireFileBrowserModal.call(this)
                .done(_setUrlOfFile.bind(this));
        }

        function _fireFileBrowserModal() {
            var $deferred = new $.Deferred(),
                fileBrowserView = new FileBrowserView(
                {
                    modelData : {
                        _id : '0'
                    },
                    $deferred : $deferred
                }
            );

            fileBrowserView.start();

            return $deferred.promise();
        }

        function _setUrlOfFile(selectedFile) {
            window.CKEDITOR.tools.callFunction(
                window.CKEDITOR.instances['ckeditor' + this.model.cid], selectedFile);
        }

    });