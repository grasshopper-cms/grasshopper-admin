/*global describe:false, it:false, beforeEach:false*/
define(['underscore', 'chai', 'mocha', 'sinon', 'sinonChai'], function (_, chai, mocha, sinon, sinonChai) {

    'use strict';
    var should = chai.should();


    require(['sinonCall', 'sinonSpy']);
    // Using Sinon-Chai assertions for spies etc. https://github.com/domenic/sinon-chai
    chai.use(sinonChai);
    mocha.setup('bdd');


    describe("An instance of the loginView", function () {


        //-----------Setup-----------

        beforeEach(function () {

        });

        //-----------Tests-----------
        it("should exist", function () {

        });

        describe("properly inherits from the base view, as evidenced by", function() {
            xit("has has the initialize method", function() {

            });

            xit("has has the render method", function() {

            });

            xit("has has the start method", function() {

            });

            xit("has has the dataToJSON method", function() {

            });
        });

        describe("login method", function() {
            xit("should exist", function() {

            });

            xit("should be a function", function() {

            });

            describe("if passed a valid model", function() {
                xit("should call the loginWorker's doLogin function", function() {

                });
            });
            describe("if passed an invalid model", function() {
                xit("should not call the loginWorker's doLogin function", function() {

                });
            });
        });

        describe("should inherit properly from the validation mixin as evidenced by", function() {
            xit("should have a method called stringHasLength", function() {

            });
            xit("stringHasLength should return true if passed a string with no length", function() {

            });
            xit("stringHasLength should return false if passed a string with length", function() {})

        })
        describe("should inherit properly from the loginViewConfig, as evidenced by", function() {
            xit("has a name property", function() {

            });

            describe("its model data attribute", function() {
                xit("exists", function() {

                });

                xit("is an object", function() {

                });

                xit("has a username attribute", function() {

                });

                xit("has a password attribute", function() {

                });

                xit("has a usernameError attribute", function() {

                });

                xit("has a passwordError attribute", function() {

                });

                xit("has a hasError attribute", function() {

                });

                xit("has a loginError attribute", function() {

                });
            });

            describe("its ModelType attribute", function() {
                xit("exists", function() {

                });

                describe("its validate method", function() {
                    xit("exists", function() {

                    });
                    xit("calls attributeValidate method twice", function() {

                    });
                    xit("will set the hasError attribute if the password is too short", function() {

                    });
                    xit("will set the hasError attribute if the userName is too short", function() {

                    });
                    xit("will set the hasError attribute if both the password and the username are too short", function() {

                    });
                    xit("will clear the hasError attribute if the username and password are long enough", function() {

                    });
                });

                describe("its setErrors method", function() {
                    xit("exists", function() {

                    });
                    xit("will set fields on the model", function() {

                    });
                });

                describe("its attributeValidate method", function() {
                    xit("exists", function() {

                    });
                    xit("will check if the attribute passed to it has length", function() {

                    });
                    xit("will set the error fields when passed a failing attribute", {

                    });
                    xit("will set the error fields when passed a passing attribute", function() {

                    });
                });
            });

            describe("its el attribute", function() {
                xit("exists", function() {

                });
            });

            describe("its template attribute", function() {
                xit("exists", function() {

                });
            });

            describe("its event attribute", function() {
                xit("exists", function() {

                });
                xit("has a property click #loginButton", function() {

                });
                xit("fires the login function when clicked", function() {

                });
            });
        });
    });
});