/*global define:false*/
define(['grasshopperBaseView'],
    function (GrasshopperBaseView) {
        'use strict';

        return GrasshopperBaseView.extend({
            beforeRender : beforeRender,
            addOptionToDropdown : addOptionToDropdown,
            reduceCollection : reduceCollection
        });

        function beforeRender() {
            this.collection.reset(this.model.get('options'));
            console.log(this);
        }

        function addOptionToDropdown() {
            this.collection.add({ _id: 'newoption', label: ''});
        }

        function reduceCollection() {
            var collection = [],
                self = this;

            this.collection.each(function(model) {
                var option = model.toJSON();

                if(!option.label) {
                    self.collection.remove(model);
                } else {
                    option._id = option.label.replace(/ /g,'').toLowerCase();
                    collection.push(option);
                }
            });
            this.model.set('options', collection);
        }

    });