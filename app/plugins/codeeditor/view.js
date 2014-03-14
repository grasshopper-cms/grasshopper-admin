/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'ace'],
    function (GrasshopperBaseView, _, $, ace) {

        'use strict';

        return GrasshopperBaseView.extend({
            afterRender : afterRender,
            setEditorTheme : setEditorTheme,
            setEditorMode : setEditorMode
        });

        function afterRender() {
            if(this.model.get('inSetup')) {

            } else {
                _startCodeEditor.call(this);
            }

        }

        function _startCodeEditor() {
            var self = this;

            setTimeout(function() {
                self.editor = ace.edit('codeEditor');
//                self.setEditorTheme();
//                self.setEditorMode();
                self.editor.setOptions(
                    {
                        maxLines : 500
                    }
                );
                _setEditorEventHandling.call(self);
                _setEditorValueFromContentValue.call(self);
            }, 2000);

        }

        function setEditorTheme(theme) {
            this.editor.setTheme(theme ? theme : this.model.get('defaultTheme'));
        }

        function setEditorMode(mode) {
            this.editor.getSession().setMode(mode ? mode : this.model.get('defaultMode'));
        }

//        function _setEditorValue() {
//            if(!_.isUndefined(this.model.get('value'))) {
//                this.ckeditor.setData(this.model.get('value'));
//            }
//        }

        function _setEditorEventHandling() {
            this.editor.on('blur', _setValueFromEditor.bind(this));
        }

        function _setValueFromEditor() {
            this.model.set('value', this.editor.getValue());
        }

        function _setEditorValueFromContentValue() {
            this.editor.setValue('JorgenSpeeling');
        }

    });