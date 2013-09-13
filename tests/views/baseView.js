/*global describe:false, it:false, beforeEach:false*/
define(['chai', 'squire', 'mocha'], function (chai, Squire, mocha) {

    'use strict';
    var VIEW1_NAME = "testView1",
        injector = new Squire(),
        should = chai.should();

    mocha.setup('bdd');

    describe("The BaseView", function () {

        var BaseView,
            viewInstance;

        beforeEach(function (done) {
            injector.require(['baseView'], function (BaseViewIn) {
                    BaseView = BaseViewIn;
                    viewInstance = new BaseView({
                        name : VIEW1_NAME
                    });
                    done();
                },
                function () {
                    console.log('BaseView error.')
                });
        });

        it("should exist", function () {
            should.exist(BaseView);
        });

        describe("start method", function () {
            var TestView,
                testView,
                deferred;

            beforeEach(function() {
               TestView = BaseView.extend({
                   beforeRender : function() {
                       deferred = new $.Deferred();
                       return deferred.promise();
                   }
               });
               testView = new TestView();
            });

            it("should exist", function () {
                should.exist(viewInstance.start);
            });
            it('should be a function', function () {
                viewInstance.start.should.be.a('function');
            });
            it('should return a promise', function () {
                var promise = viewInstance.start();
                promise.should.have.property('done');
                promise.should.not.have.property('resolve');
            });
            // Using done as a spy. If it is not called, the test will fail.
            it('the promise should be resolved after start runs', function (done) {
                testView.start().done(done);
//                deferred.promise.status().should.be('completed');
            });
            it('the promise should be rejected if beforeRender fails', function (done) {
                testView.start().fail(done);
                deferred.reject();
            });
            it('the promise should be rejected if afterRender fails', function () {

            });
            describe("beforeRender method", function () {
                it("should trigger the onBeforeRender event on the view's channel", function (done) {
                    viewInstance.channels.views.on(VIEW1_NAME + ":onBeforeRender", function () {
                        done();
                    });
                    viewInstance.start();
                });
            });
            describe("render method", function () {
                it("should exist", function () {
                    should.exist(viewInstance.render);
                });
                it('should be a function', function () {
                    viewInstance.render.should.be.a('function');
                });
                it("should trigger the onRender event on the view's channel", function () {

                });
                describe("- if the beforeRender method returns a promise -", function () {
                    beforeEach(function () {
                        //TODO:create a base view that return a promise for beforeRender
                    });
                    it("the render method will only fire after the promise is resolved", function () {

                    });
                });
                describe("- if the beforeRender method doesn't return a promise-", function () {
                    it("the render method should fire immediately", function () {

                    });
                });
            });
            describe("afterRender method", function () {
                it("should trigger the onAfterRender event on the view's channel", function () {

                });
            });
        });

        describe("stop method", function () {
            // TODO: implement before after etc methods in the same was as for render
            // method should wrap View.remove
        });

        describe("channels", function () {
            it("can be triggered by one view and heard by another", function () {
                //TODO: create a second view instance
            });
        });
    });

});

// Example Methods:

// Setup Methods
// initialize (BB method)
//  afterInitialize
// start
//  bindEvents
//  beforeRender
//  render
//  beforeRenderChildren
//  renderChildren
//  afterRenderChildren
//  afterRender
// stop
//  beforeRemove
//  remove (BB method)