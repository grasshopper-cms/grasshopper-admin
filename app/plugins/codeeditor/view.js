/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'ace'],
    function (GrasshopperBaseView, _, $, Ace) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            setEditorTheme : setEditorTheme
        });

        function afterRender() {
            if(this.model.get('inSetup')) {

            } else {
                _startCodeEditor.call(this);
            }

//            _startCkeditor.call(this)
//                .done(
//                    _setEditorValue.bind(this),
//                    _setEditorEventHandling.bind(this)
//                );
        }


        function _startCodeEditor() {
            this.editor = Ace.edit('editor');
            this.setEditorTheme();

        }

        function setEditorTheme(theme) {
            this.editor.setTheme(theme ? theme : 'ace/theme/monokai');
        }

        function setEditorMode() {
            editor.getSession().setMode('ace/mode/javascript');
        }

//        function _startCkeditor() {
//            var $deferred = new $.Deferred();
//
//            this.ckeditor = this.$('#ckeditor').ckeditor(
//                {
//                    customConfig : '',
//                    filebrowserBrowseUrl : '/#filebrowser/',
//                    skin : 'moono'
//                },
//                $deferred.resolve
//            ).editor;
//
//            return $deferred.promise();
//        }
//
//        function _setEditorValue() {
//            if(!_.isUndefined(this.model.get('value'))) {
//                this.ckeditor.setData(this.model.get('value'));
//            }
//        }
//
//        function _setEditorEventHandling() {
//            this.ckeditor.on('blur', _setContentValue.bind(this));
//        }
//
//        function _setContentValue() {
//            this.model.set('value', this.ckeditor.getData());
//        }


    });