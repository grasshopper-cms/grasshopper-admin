/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery',
    'plugins/richtext/fileBrowser/view'],
    function (GrasshopperBaseView, _, $,
              FileBrowserView) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender
        });

        function afterRender() {
            _startCkeditor.call(this)
                .done(
                    _setEditorValue.bind(this),
                    _setEditorEventHandling.bind(this)
                );
        }

        function _startCkeditor() {
            var $deferred = new $.Deferred();

            _overRideWindowOpen.call(this);

            this.ckeditor = this.$('#ckeditor').ckeditor(
                {
                    customConfig : '',
                    filebrowserBrowseUrl : 'dummylocation',
                    skin : 'moono'
                },
                $deferred.resolve
            ).editor;

            return $deferred.promise();
        }

        function _setEditorValue() {
            if(!_.isUndefined(this.model.get('value'))) {
                this.ckeditor.setData(this.model.get('value'));
            }
        }

        function _setEditorEventHandling() {
            this.ckeditor.on('blur', _setContentValue.bind(this));
        }

        function _setContentValue() {
            this.model.set('value', this.ckeditor.getData());
        }

        function _overRideWindowOpen() {
            this.oldWindowOpen = window.open;

            window.open = window.opener = _startFileBrowser.bind(this);
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