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

* 0.0.3 - 14-02-23 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.0.3_14-02-23.md)
* 0.1.0 - 14-02-24 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.1.0_14-02-24.md)
* 0.2.0 - 14-02-24 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.2.0_14-02-24.md)
* 0.2.7 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.2.7_14-02-25.md)
* 0.3.0 - 14-02-25 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.0_14-02-25.md)
* 0.3.1 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.1_14-02-25.md)
* 0.3.2 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.2_14-02-25.md)
* 0.3.3 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.3_14-02-25.md)
* 0.3.4 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.4_14-02-25.md)
* 0.3.5 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.5_14-02-25.md)
* 0.3.6 - 14-02-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.3.6_14-02-25.md)
* 0.4.0 - 14-02-26 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.4.0_14-02-26.md)
* 0.4.1 - 14-02-26 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.4.1_14-02-26.md)
* 0.5.0 - 14-02-28 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.5.0_14-02-28.md)
* 0.5.1 - 14-02-28 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.5.1_14-02-28.md)
* 0.5.2 - 14-03-03 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.5.2_14-03-03.md)
* 0.6.0 - 14-03-05 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.6.0_14-03-05.md)
* 0.6.1 - 14-03-05 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.6.1_14-03-05.md)
* 0.6.2 - 14-03-05 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.6.2_14-03-05.md)
* 0.7.0 - 14-03-06 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.7.0_14-03-06.md)
* 0.8.0 - 14-03-06 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.8.0_14-03-06.md)
* 0.8.1 - 14-03-06 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.8.1_14-03-06.md)
* 0.9.0 - 14-03-11 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.0_14-03-11.md)
* 0.9.1 - 14-03-11 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.1_14-03-11.md)
* 0.9.2 - 14-03-11 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.2_14-03-11.md)
* 0.9.3 - 14-03-11 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.3_14-03-11.md)
* 0.9.4 - 14-03-11 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.4_14-03-11.md)
* 0.9.5 - 14-03-12 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.5_14-03-12.md)
* 0.9.6 - 14-03-12 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.9.6_14-03-12.md)
* 0.10.0 - 14-03-12 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.10.0_14-03-12.md)
* 0.11.0 - 14-03-12 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.11.0_14-03-12.md)
* 0.11.1 - 14-03-12 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.11.1_14-03-12.md)
* 0.11.2 - 14-03-12 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.11.2_14-03-12.md)
* 0.12.0 - 14-03-12 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.12.0_14-03-12.md)
* 0.12.1 - 14-02-14 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.12.1_14-02-14.md)
* 0.12.2 - 14-02-14 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.12.2_14-02-14.md)
* 0.12.3 - 14-03-16 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.12.3_14-03-16.md)
* 0.12.4 - 14-03-16 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.12.4_14-03-16.md)
* 0.13.0 - 14-03-17 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.0_14-03-17.md)
* 0.13.1 - 14-03-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.1_14-03-18.md)
* 0.13.2 - 14-03-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.2_14-03-18.md)
* 0.13.3 - 14-03-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.3_14-03-18.md)
* 0.13.4 - 14-03-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.4_14-03-18.md)
* 0.13.5 - 14.03.19 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.5_14.03.19.md)
* 0.13.6 - 14-03-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.6_14-03-20.md)
* 0.13.7 - 14-03-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.7_14-03-20.md)
* 0.13.8 - 14-03-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.8_14-03-20.md)
* 0.13.9 - 14-03-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.9_14-03-20.md)
* 0.13.10 - 14-03-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.13.10_14-03-20.md)
* 0.14.0 - 14-03-21 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.14.0_14-03-21.md)
* 0.14.1 - 14-02-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.14.1_14-02-21.md)
* 0.14.2 - 14-03-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.14.2_14-03-21.md)
* 0.14.3 - 14-03-24 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.14.3_14-03-24.md)
* 0.15.0 - 14-03-25 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.15.0_14-03-25.md)
* 0.15.1 - 14-03-25 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.15.1_14-03-25.md)
* 0.16.0 - 14-03-25 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.16.0_14-03-25.md)
* 0.16.1 - 14-03-26 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.16.1_14-03-26.md)
* 0.17.0 - 14-03-28 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.17.0_14-03-28.md)
* 0.17.1 - 14-03-28 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.17.1_14-03-28.md)
* 0.18.0 - 14-3-31 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.18.0_14-3-31.md)
* 0.19.0 - 14-04-04 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.19.0_14-04-04.md)
* 0.20.0 - 14-04-07 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.20.0_14-04-07.md)
* 0.20.1 - 14-04-09 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.20.1_14-04-09.md)
* 0.21.0 - 14-04-17 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.21.0_14-04-17.md)
* 0.22.0 - 14-04-21 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.22.0_14-04-21.md)
* 0.22.1 - 14-04-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.22.1_14-04-21.md)
* 0.22.2 - 14-04-22 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.22.2_14-04-22.md)
* 0.22.3 - 14-04-22 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.22.3_14-04-22.md)
* 0.23.0 - 14-04-22 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.23.0_14-04-22.md)
* 0.23.1 - 14-04-22 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.23.1_14-04-22.md)
* 0.23.2 - 14-04-23 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.23.2_14-04-23.md)
* 0.23.3 - 14-04-24 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.23.3_14-04-24.md)
* 0.23.4 - 14-04-24 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.23.4_14-04-24.md)
* 0.24.0 - 14-04-28 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.24.0_14-04-28.md)
* 0.24.1 - 14-04-28 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.24.1_14-04-28.md)
* 0.24.2 - 14-04-28 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.24.2_14-04-28.md)
* 0.25.0 - 14-04-30 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.25.0_14-04-30.md)
* 0.25.1 - 14-04-30 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.25.1_14-04-30.md)
* 0.25.2 - 14-04-30 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.25.2_14-04-30.md)
* 0.25.3 - 14-05-01 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.25.3_14-05-01.md)
* 0.26.0 - 14-05-01 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.0_14-05-01.md)
* 0.26.1 - 14-05-01 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.1_14-05-01.md)
* 0.26.2 - 14-06-04 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.2_14-06-04.md)
* 0.26.3 - 14-06-14 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.3_14-06-14.md)
* 0.26.4 - 14-06-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.4_14-06-21.md)
* 0.26.5 - 14-06-26 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.5_14-06-26.md)
* 0.26.6 - 14-07-11 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.6_14-07-11.md)
* 0.26.7 - 14-07-17 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.7_14-07-17.md)
* 0.26.8 - 14-07-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.8_14-07-18.md)
* 0.26.9 - 14-07-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.9_14-07-18.md)
* 0.26.10 - 14-07-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.10_14-07-21.md)
* 0.26.11 - 14-07-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.11_14-07-21.md)
* 0.26.12 - 14-07-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.12_14-07-21.md)
* 0.26.14 - 14-07-22 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.26.14_14-07-22.md)
* 0.27.0 - 14-07-22 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.0_14-07-22.md)
* 0.27.1 - 14-07-23 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.1_14-07-23.md)
* 0.27.2 - 14-07-24 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.2_14-07-24.md)
* 0.27.3 - 14-07-24 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.3_14-07-24.md)
* 0.27.4 - 14-07-28 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.4_14-07-28.md)
* 0.27.5 - 14-07-28 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.5_14-07-28.md)
* 0.27.6 - 14-07-29 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.6_14-07-29.md)
* 0.27.7 - 14-07-29 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.7_14-07-29.md)
* 0.27.8 - 14-07-29 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.8_14-07-29.md)
* 0.27.9 - 14-08-01 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.27.9_14-08-01.md)
* 0.28.0 - 14-08-04 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.28.0_14-08-04.md)
* 0.29.0 - 14-08-11 - [features](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.0_14-08-11.md)
* 0.29.1 - 14-08-13 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.1_14-08-13.md)
* 0.29.3 - 14-08-14 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.3_14-08-14.md)
* 0.29.4 - 14-08-18 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.4_14-08-18.md)
* 0.29.5 - 14-08-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.5_14-08-20.md)
* 0.29.6 - 14-08-20 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.6_14-08-20.md)
* 0.29.7 - 14-08-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.7_14-08-21.md)
* 0.29.9 - 14-08-21 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.9_14-08-21.md)
* 0.29.10 - 14-08-10 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.10_14-08-10.md)
* 0.29.11 - 14-08-26 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.11_14-08-26.md)
* 0.29.12 - 14-08-27 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.12_14-08-27.md)
* 0.29.13 - 14-08-27 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.13_14-08-27.md)
* 0.29.14 - 14-08-29 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.14_14-08-29.md)
* 0.29.15 - 14-09-02 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.15_14-09-02.md)
* 0.29.16 - 14-09-10 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.16_14-09-10.md)
* 0.29.17 - 14-09-12 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.17_14-09-12.md)
* 0.29.18 - 14-09-26 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.18_14-09-26.md)
* 0.29.19 - 14-10-07 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.19_14-10-07.md)
* 0.29.20 - 14-12-02 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.20_14-12-02.md)
* 0.29.21 - 14-12-02 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.21_14-12-02.md)
* 0.29.22 - 2014-12-08 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.22_2014-12-08.md)
* 0.29.23 - 2014-12-16 - [patches](https://github.com/Solid-Interactive/grasshopper-admin/tree/master/release_notes/0.29.23_2014-12-16.md)


_Compiled file. Do not modify directly. Created: 2014-12-16 11:50:47_