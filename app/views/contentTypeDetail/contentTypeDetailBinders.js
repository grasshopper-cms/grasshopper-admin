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

                    if (this.viewInstance) {
                        this.model.view.removeChild(this.viewInstance);
                        this.viewInstance.remove();
                    }

                    this.viewInstance = new FieldAccordionView({
                        appendTo : el,
                        model : model
                    });

                    this.model.view.addChild(this.viewInstance);
                }
            }
        };

    });