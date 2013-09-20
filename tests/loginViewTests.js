/*global describe:false, it:false, beforeEach:false*/
define(['underscore', 'chai', 'squire', 'mocha', 'sinon', 'sinonChai'], function (_, chai, Squire, mocha, sinon, sinonChai) {

    'use strict';
    var VIEW1_NAME = "testView1",
        injector = new Squire(),
        should = chai.should();


    require(['underscore', 'sinonCall', 'sinonSpy']);
    // Using Sinon-Chai assertions for spies etc. https://github.com/domenic/sinon-chai
    chai.use(sinonChai);
    mocha.setup('bdd');


    describe("An instance of the loginView", function () {


        //-----------Setup-----------
        var LoginView,
            viewInstance;

        beforeEach(function (done) {
            injector.require(['loginView'], function (loginView) {
                    LoginView = loginView;
                    viewInstance = new LoginView({
                        name : VIEW1_NAME
                    });
                    done();
                },
                function () {
                    console.log('loginView error.')
                });
        });

        //-----------Tests-----------
        it("should exist", function () {
            should.exist(LoginView);
        });
    });

});