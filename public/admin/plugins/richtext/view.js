/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery',
    'plugins/richtext/fileBrowserModal/view', 'plugins/richtext/ckeditorConfig', 'require'],
    function (GrasshopperBaseView, _, $,
              FileBrowserView, ckeditorConfig, require) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            remove : remove,
            sortStart : sortStart,
            stopSort : stopSort
        });

        function afterRender() {
            if(this.model.get('inSetup')) {

            } else {
                _prepareCkeditor.call(this)
                    .done(
                        _setEditorValue.bind(this),
                        _setEditorEventHandling.bind(this),
                        _overRideWindowOpen.bind(this)
                    );
            }

        }

        function _prepareCkeditor() {
            var $deferred = new $.Deferred();

            _toggleLoadingSpinner.call(this);

            require(['ckeditorAdapter'], _startEditor.bind(this, $deferred));

            return $deferred.promise();
        }

        function _startEditor($deferred) {
            var self = this;

            this.ckeditor = this.$('#ckeditor' + this.model.cid).ckeditor(ckeditorConfig,
                function() {
                    _toggleLoadingSpinner.call(self);
                    $deferred && $deferred.resolve();
                }).editor;
        }

        function _setEditorValue() {
            if(!_.isUndefined(this.model.get('value'))) {
                this.ckeditor.setData(this.model.get('value'));
            }
        }

        function _setEditorEventHandling() {
            this.ckeditor.on('change', _setContentValue.bind(this));
        }

        function _setContentValue() {
            this.model.set('value', this.ckeditor.getData());
        }

        function _overRideWindowOpen() {
            this.oldWindowOpen = window.open;

            window.open = window.opener = _startFileBrowser.bind(this);
        }

        function remove() {
            if(!this.model.get('inSetup')) {
                window.open = this.oldWindowOpen;
                this.ckeditor.destroy();
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
            window.CKEDITOR.tools.callFunction(this.ckeditor._.filebrowserFn, selectedFile);
        }

        function sortStart() {
            var textBox = this.$('#ckeditor' + this.model.cid),
                ckeClone = this.$('#cke_ckeditor' + this.model.cid).clone().addClass('cloned');

            _setContentValue.call(this);
            textBox.after(ckeClone);
            this.ckeditor.destroy();
            textBox.hide();
        }

        function stopSort() {
            this.$('cloned').remove();
        }

    });