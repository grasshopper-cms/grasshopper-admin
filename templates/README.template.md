# Grasshopper Admin

Front end of the [Grasshopper api](https://github.com/Solid-Interactive/grasshopper-api-js) - a Javascript / Data Management System

### Usage

1. install

    ```shell
    npm install grasshopper-admin
    ```

1. configure using `gha.json` in your project - you can set the endpoint and where the admin html, js, and css files are built

    ```javascript
    {
        "apiEndpoint" : "http://api.so-much-data.com",
        "buildDirectory" : "public/admin"
    }
    ```

1. build

    ```shell
    ./node_modules/.bin/grasshopper build
    ```

### Release Notes

<%= releaseNotes.notes %>

_<%= warning.readme + ' Created: ' + grunt.template.today('yyyy-mm-dd hh:MM:ss') %>_