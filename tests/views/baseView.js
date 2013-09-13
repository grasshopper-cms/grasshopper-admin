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

//        it("should exist", function () {
//            should.exist(BaseView);
//        });

        describe("start method", function () {
            var BOView, // Before Render Only view
                bOViewInstance, // Before Render Only view instance
                BAView, // Before and After Render View
                bAViewInstance, //Before and After Render view instance
                $deferredBeforeOnly,
                $deferredBefore,
                $deferredAfter;

            beforeEach(function() {
                BOView = BaseView.extend({
                   beforeRender : function() {
                       $deferredBeforeOnly = new $.Deferred();
                       console.log("Actual Before Render Was Called");
                       return $deferredBeforeOnly.promise();
                   }
               });
                BAView = BaseView.extend({
                    beforeRender : function() {
                        $deferredBefore = new $.Deferred();
                        console.log("Actual Before Render Was Called");
                        return $deferredBefore.promise();
                    },
                    afterRender : function() {
                        $deferredAfter = new $.Deferred();
                        console.log("Actual After Render Was Called");
                        return $deferredAfter.promise();
                    }
               });
               bOViewInstance = new BOView();
               bAViewInstance = new BAView();
            });

//            it("should exist", function () {
//                should.exist(viewInstance.start);
//            });
//            it('should be a function', function () {
//                viewInstance.start.should.be.a('function');
//            });
//            it('should return a promise', function () {
//                var promise = viewInstance.start();
//                promise.should.have.property('done');
//                promise.should.not.have.property('resolve');
//            });
            describe("promise", function() {
                // Using done as a spy. If it is not called, the test will fail.
                describe('should be resolved after start runs', function () {
                    it('if beforeRender is not implemented', function(done) {
                        bOViewInstance.start().done(done);
                        $deferredBeforeOnly.resolve();
                    });
                    it('if beforeRender is implemented and its promise is resolved', function(done) {
                        bAViewInstance.start().done(done);
                        $deferredBefore.resolve();
                        $deferredAfter.resolve();
                    });
                });
//                it('should be rejected if beforeRender fails', function (done) {
//                    testView.start().done(done);
////                    deferred.reject();
//                });
//                it('should be rejected if render fails', function (done) {
//                    testView.start().done(done);
//                    deferred.reject();
//                });
//                it('should be rejected if afterRender fails', function (done) {
//                    testView.start().fail(done);
//                    deferred.reject();
//                });
            });
            describe("beforeRender method", function () {
//                it("should trigger the onBeforeRender event on the view's channel", function (done) {
//                    viewInstance.channels.views.on(VIEW1_NAME + ":onBeforeRender", function () {
//                        done();
//                    });
//                    viewInstance.start();
//                });
            });
            describe("render method", function () {
//                it("should exist", function () {
//                    should.exist(viewInstance.render);
//                });
//                it('should be a function', function () {
//                    viewInstance.render.should.be.a('function');
//                });
//                it("should trigger the onRender event on the view's channel", function () {
//
//                });
                describe("- if the beforeRender method returns a promise -", function () {
//                    beforeEach(function () {
//                        //TODO:create a base view that return a promise for beforeRender
//                    });
//                    it("the render method will only fire after the promise is resolved", function () {
//
//                    });
                });
                describe("- if the beforeRender method doesn't return a promise-", function () {
//                    it("the render method should fire immediately", function () {
//
//                    });
                });
            });
            describe("afterRender method", function () {
//                it("should trigger the onAfterRender event on the view's channel", function () {
//
//                });
            });
        });

        describe("stop method", function () {
            // TODO: implement before after etc methods in the same was as for render
            // method should wrap View.remove
        });

        describe("channels", function () {
//            it("can be triggered by one view and heard by another", function () {
//                //TODO: create a second view instance
//            });
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