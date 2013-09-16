/*global describe:false, it:false, beforeEach:false*/
define(['chai', 'squire', 'mocha'], function (chai, Squire, mocha) {

    'use strict';
    var VIEW1_NAME = "testView1",
        injector = new Squire(),
        should = chai.should();

    mocha.setup('bdd');

    describe("An instance of the BaseView", function () {


        //-----------Setup-----------
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

        //-----------Tests-----------
        it("should exist", function () {
            should.exist(BaseView);
        });

        describe("start method", function () {
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
            describe("promise", function () {
                // Using done as a spy. If it is not called, the test will fail.
                it('should be resolved after start runs', function (done) {
                    viewInstance.start().done(done);
                });
            });
            describe("render method", function () {
                it("should exist", function () {
                    should.exist(viewInstance.render);
                });
                it('should be a function', function () {
                    viewInstance.render.should.be.a('function');
                });
                it("should trigger the onRender event on the view's channel", function (done) {
                    viewInstance.channels.views.on(VIEW1_NAME + ":onRender", function () {
                        done();
                    });
                    viewInstance.start();
                });

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

    describe("An instance of extending the BaseView", function () {

        //-----------Setup-----------
        var BaseView,
            AsyncExtendedBaseView,
            SyncExtendedBaseView,
            asyncInstance,
            syncInstance,
            $beforeRenderDeferred,
            $afterRenderDeferred;


        beforeEach(function (done) {
            injector.require(['baseView'], function (BaseViewIn) {

                    BaseView = BaseViewIn;
                    AsyncExtendedBaseView = BaseView.extend({
                        beforeRender : function (deferred) {
                            $beforeRenderDeferred = deferred;
                        },
                        afterRender : function (deferred) {
                            $afterRenderDeferred = deferred;
                        }
                    });
                    SyncExtendedBaseView = BaseView.extend({
                        beforeRender : function () {
                        },
                        afterRender : function () {
                        }
                    });

                    asyncInstance = new AsyncExtendedBaseView({
                        name : VIEW1_NAME
                    });
                    syncInstance = new SyncExtendedBaseView({
                        name : VIEW1_NAME
                    });

                    done();
                },
                function () {
                    console.log('BaseView error.')
                });
        });

        describe("beforeRender method, if implemented", function () {
            it("should trigger the onBeforeRender event on the view's channel during start()", function (done) {
                syncInstance.channels.views.on(VIEW1_NAME + ":onBeforeRender", function () {
                    done();
                });
                syncInstance.start();
            });
            // NOTE: xing out a describe or it will disable it and highlight it blue
            xdescribe("with zero arguments", function () {
                // sync tests
            });
            describe("with one argument", function () {
                it("will fail the start method if its deferred is rejected", function (done) {
                    asyncInstance.start().fail(done);
                    $beforeRenderDeferred.reject();
                });
                xit("will not call the afterRender method if its deferred is rejected", function () {
                    // TODO: implement using a spy
                });
            });
        });

        describe("afterRender method, if implemented", function () {
            it("should trigger the onAfterRender event on the view's channel during start()", function (done) {
                syncInstance.channels.views.on(VIEW1_NAME + ":onAfterRender", function () {
                    done();
                });
                syncInstance.start();
            });
            xdescribe("with zero arguments", function () {
                // sync tests
            });
            describe("with one argument", function () {
                it("will fail the start method if its deferred is rejected", function (done) {
                    asyncInstance.start().fail(done);
                    $beforeRenderDeferred.resolve();
                    $afterRenderDeferred.reject();
                });
                xit("will not call the afterRender method if its deferred is rejected", function () {
                    // TODO: implement using a spy
                });
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