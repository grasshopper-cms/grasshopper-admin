/* jshint loopfunc:true */
define(['fieldAccordionView'],
    function (FieldAccordionView) {
        'use strict';

        return {
            fieldaccordion : {
                bind : function() {},
                unbind : function() {
                    this.viewInstance.remove();
                },
                routine : function(el, model) {

                    this.viewInstance = new FieldAccordionView({
                        appendTo : el,
                        model : model
                    });

                    this.model.view.addChild(this.viewInstance);
                }
            }
        };

    });