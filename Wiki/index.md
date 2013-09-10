# Grasshopper Admin

## Routes
* General Concept
    * `controller/method/variable`
    * CRED:
        * `create`,`remove`,`edit`,`display`

* Specific Implementations
    * `/login`
    * `/logout`
    * `/forgot-password`
    * `/about`

    * `/content/[CED]/[slug or id]`
    * `/user/[CED]/[slug or id]/`
    * `/node/[CED]/[slug or id]/`
    * `/content-type/CED/[slug or id]/`

    * List:
        * `/list/user/`
        * `/list/content-type/`
        * `/list/[node]/`

    * `/search/basic/params`
    * `/search/advanced/params`


## Dev Install

* PHPStorm
    * Start from command line to run commands through phpstorm
* [Bower](http://bower.io/)
* Squire or manually for managing tests through requirejs
* Sinon
    * http://sinonjs.org/
    * http://sinonjs.org/docs/#server
* Use chai.should


## Versioning

* [Semantic Versionining](http://semver.org/)
    * x.y.z
        * x backward incompatible changes
        * y new features
        * z bug fixes
    * x.y.z-abc
        * this comes before x.y.z

## NPM

* [package.json](https://npmjs.org/doc/json.html)

## Notes:

* Create grunt init template for SOLID projects (e.g. https://github.com/pajtai/grunt-init-reveal-jade)
