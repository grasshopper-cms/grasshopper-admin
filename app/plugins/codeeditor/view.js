/*global define:false*/
define(['grasshopperBaseView', 'underscore', 'jquery', 'require'],
    function (GrasshopperBaseView, _, $, require) {

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

            require(['ace/editor', 'ace/virtual_renderer'], function(editor, virtualRenderer) {
                var Editor = editor.Editor,
                    VirtualRenderer = virtualRenderer.VirtualRenderer;

                self.editor = new Editor(new VirtualRenderer(self.$('#codeEditor')[0]));
                self.setEditorTheme();
                self.setEditorMode();
                self.editor.setOptions(
                    {
                        maxLines : 500,
                        minLines : 10
                    }
                );
                self.editor.setShowPrintMargin(false);
                self.editor.getSession().setUseWrapMode(true);
                _setEditorEventHandling.call(self);
                _setEditorValueFromContentValue.call(self);
            });

        }

        function setEditorTheme() {
            this.editor.setTheme(this.model.get('currentThemeLocation'));
        }

        function setEditorMode() {
            this.editor.getSession().setMode(this.model.get('currentModeLocation'));
        }

        function _setEditorEventHandling() {
            this.editor.on('blur', _setValueFromEditor.bind(this));
        }

        function _setValueFromEditor() {
            this.model.set('value', this.editor.getValue());
        }

        function _setEditorValueFromContentValue() {
            var value = this.model.get('value');
            if(!_.isUndefined(value)) {
                this.editor.setValue(value);
            }
        }

    });