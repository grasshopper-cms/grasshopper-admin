/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery',
    'plugins/richtext/fileBrowser/view', 'plugins/richtext/ckeditorConfig'],
    function (GrasshopperBaseView, _, $,
              FileBrowserView, ckeditorConfig) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender() {
            if(this.model.get('inSetup')) {

            } else {
                _startCkeditor.call(this)
                    .done(
                        _setEditorValue.bind(this),
                        _setEditorEventHandling.bind(this)
                    );
            }

        }

        function _startCkeditor() {
            var $deferred = new $.Deferred(),
                self = this;

            _overRideWindowOpen.call(this);
            _toggleLoadingSpinner.call(this);

            require(['ckeditorAdapter'], function() {
                self.ckeditor = self.$('#ckeditor').ckeditor(ckeditorConfig,
                    function() {
                        console.log('this callback fired');
                        _toggleLoadingSpinner.call(self);
                        $deferred.resolve();
                    }).editor;
            });

            return $deferred.promise();
        }

        function _setEditorValue() {
            console.log('editor value was fired');
            if(!_.isUndefined(this.model.get('value'))) {
                this.ckeditor.setData(this.model.get('value'));
            }
        }

        function _setEditorEventHandling() {
            console.log('event handling was fired');
            this.ckeditor.on('blur', _setContentValue.bind(this));
        }

        function _setContentValue() {
            console.log('this fired');
            console.log(this.ckeditor.getData());
            this.model.set('value', this.ckeditor.getData());
        }

        function _overRideWindowOpen() {
            this.oldWindowOpen = window.open;

            window.open = window.opener = _startFileBrowser.bind(this);
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
            window.CKEDITOR.tools.callFunction(0, selectedFile);
        }

    });