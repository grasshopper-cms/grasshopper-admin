# Grasshopper Admin

### Grasshopper is an everybody friendly, flexible, extensible CMS.

A CMS for the people, a great experience for developers, users and customers. Use Grasshopper to drastically speed up development for distributed systems. Support your clients better.

![Create, Share, Present](http://solid-interactive.github.io/grasshopper-core-nodejs/images/create-share-present.png)

By standardizing your development workflow, you can spend more time building your public facing applications and less time building backend systems, APIs and administrations.

Grasshopper focuses on user happiness, not just developer happiness. Grasshopper provides tools for everyone involved in a project, developers, content managers, clients and customers alike.

**Using Grasshopper, developers get**

* An easy to use SDK, a ready to go REST API, built in concepts like user management and permissions, an open system that is both flexible and extensible.
* High performance application stack built on Node.js. Hooks and events into the system to completely customize the handling of data and unlocking it's potential.
* Consistent tools will that help you save time and delight your users. Using Grasshopper will elimiate much of the boring, boilerplate code that you have to write for every project.
* The Grasshopper system can be run anywhere and has native cloud support that keeps growing. You can use services like Heroku or host on your own systems.

**Using Grasshopper, managers get**

* A ready to go environment to start working right away. No more technology black holes where you have to wait until the end of the project to do your job.
* Faster access to the tools you need. When developers don't have to write code to give you what you want, you will get it faster.
* Intuitive and useful content management screens that can have any definition. Any type of content can be defined, organized and managed without a developer having to write any code.
* Piece of mind knowing that you can increase client engagement by giving them something to work on sooner and give them less time to think about changes.


### Grasshopper Admin Project

---------------------------------------------------------------------------------

Front end of the [Grasshopper api](https://github.com/Solid-Interactive/grasshopper-api-js) - a Javascript / Data Management System

### Grasshopper Components

---------------------------------------------------------------------------------

![Stack](http://solid-interactive.github.io/grasshopper-core-nodejs/images/stack.png)

* [GRASSHOPPER CLI](https://github.com/Solid-Interactive/grasshopper-cli)
* [GRASSHOPPER API](https://github.com/Solid-Interactive/grasshopper-api-js)
* [GRASSHOPPER ADMIN](https://github.com/Solid-Interactive/grasshopper-admin)

### Getting Started

------------------------------------------------------------------

The best thing to do is review the [Grasshopper website](http://solid-interactive.github.io/grasshopper-core-nodejs) and review the [documentation]([official documentation](http://solid-interactive.github.io/grasshopper-core-nodejs/documentation.html)).

If you want to install grasshopper right away you should use the [CLI](https://github.com/Solid-Interactive/grasshopper-cli). Installing Grasshopper is super simple. Once your machine is configured, creating a new project is as easy as typing `grasshopper fly`.

The installation process fully configures working instances of [core](https://github.com/Solid-Interactive/grasshopper-core-nodejs), [api](https://github.com/Solid-Interactive/grasshopper-api-js) and [admin](https://github.com/Solid-Interactive/grasshopper-admin) for you.

#### Using heroku

Gh-admin comes with a `server` directory that can run grasshopper-api to server grasshopper data to you. 
If you have a heroku account, then you can deploy to it using the `grunt deploy:heroku` commands.

The heroku app will use environmental variables to load the grunt configs, so the first time you deploy you have to load the environmental variables along with doing the build:

```shell
# any truthy arguments to deploy:heroku will load env vars to heroku from ghapi.json in the root of your project 
grunt deploy:heroku:setupConfigs
```

Once the environmental variables are on heroku there is no need to load them again, unless you want to change them, so subsequent deploys can use the form:

```shell
grunt deploy:heroku
```

If loaded the environmental variables are loaded from `ghapi.json` in the root of the project.

### Manual Usage

1. install

    ```shell
    npm install grasshopper-admin
    ```

1. configure using `gha.json` in your project - you can set the endpoint and where the admin html, js, and css files are built

    ```javascript
    {
        "apiEndpoint" : "http://api.so-much-data.com",
        "buildDirectory" : "public/admin",
        "externalPluginsDirectory" : "externalPlugins"
    }
    ```

1. build

    ```shell
    ./node_modules/.bin/grasshopper build
    ```

### Release Notes

<%= releaseNotes.notes %>

_<%= warning.readme + ' Created: ' + grunt.template.today('yyyy-mm-dd hh:MM:ss') %>_