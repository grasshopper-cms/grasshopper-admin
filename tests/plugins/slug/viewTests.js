define(['underscore', 'chai', 'mocha', 'sinon', 'sinonChai', 'jquery', 'contentTypeDetailView', 'backbone'],
    function (_, chai, mocha, sinon, sinonChai, $, ContentTypeDetailView, Backbone) {

    'use strict';
    var should = chai.should(),
        $dom,
        contentTypeDetailView,
        collection;


    require(['sinonCall', 'sinonSpy']);
    // Using Sinon-Chai assertions for spies etc. https://github.com/domenic/sinon-chai
    chai.use(sinonChai);
    mocha.setup('bdd');

    describe('Slug Plugin', function() {
        beforeEach(function() {
            collection = new Backbone.Collection();
            $dom = $('<div/>');
            contentTypeDetailView = new (ContentTypeDetailView.extend({
                beforeRender : noop,
                afterRender : noop
            }))({
                collection : collection,
                appendTo : $dom,
                template :  '<div data-rv-each-field="view:collection">' +
                                '<div data-rv-fieldform="field"></div>' +
                            '</div>',
                viewOptions : ['collection']
            });
        });
        describe('setup template', function() {
            describe('for a type with two string fields', function() {
                it('should show a drop down', function() {
                    collection.reset({
                        min : 1,
                        max : 1,
                        options : true,
                        label : '',
                        type : 'slug',
                        defaultValueType : 'text',
                        dataComplexity : 'simple',
                        required : false,
                        validation : false,
                        value : ''
                    });

                    contentTypeDetailView.start();
                    contentTypeDetailView.$('select').length.should.equal(1);
                });
            });
        });
    });

    function noop() {}
});