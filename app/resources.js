/*global define*/
define({

    api : {
        base : {
            errors : {
                400 : 'Bad Request',
                401 : 'Unauthorized',
                403 : 'Forbidden',
                404 : 'Not Found',
                405 : 'Method Not Allowed',
                408 : 'Request Timeout',
                500 : 'Server Error',
                503 : 'Service Unavailable'
            }
        },
        login : {
            errors : {
                400 : 'Bad Request',
                401 : 'Incorrect Username Or Password',
                403 : 'Forbidden',
                404 : 'Not Found',
                405 : 'Method Not Allowed',
                408 : 'Request Timeout',
                500 : 'Server Error',
                503 : 'Service Unavailable'
            }
        }
    },

    user : {
        userDetailHeaderText : 'Profile for: ',
        loggedInAs : 'Logged in as',
        attributeTitles : {
            name : 'USER NAME:',
            firstName : 'FIRST NAME',
            lastName : 'LAST NAME',
            role : 'USER ROLE',
            enabled : 'ENABLED?',
            email : 'EMAIL',
            login : 'LOGIN',
            password : 'PASSWORD'
        },
        statusTitles : {
            enabled : 'enabled',
            disabled : 'disabled'
        },
        statusOptions : {
          enabled : true,
          disabled : false
        },
        roles : {
            admin : 'admin',
            reader : 'reader',
            editor : 'editor',
            author : 'author',
            none : 'none'
        },
        successfullyUpdated : 'User was successfully updated',
        updateError: 'User was successfully updated',
        errors : {
            403 : 'You do not have adequate permissions to view/edit this profile.'
        }
    },
    site : {
        about : 'About Grasshopper'
    },
    mastheadButtons : {
        createContent : 'Create Content',
        uploadFile : 'Upload File',
        createFolder : 'Create Folder',
        actions : 'Actions',
        addNewUser : 'Add New User',
        addContentType : 'New Content Type'
    },
    contentType : {
        deletionWarning: 'Are you sure you want to delete this content type?',
        successfullyDeletedPre: 'Content Type ',
        successfullyDeletedPost: ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this content type: '
    },
    contentIndex : {
        author: 'Author',
        modified: 'Modified'
    },
    fileIndex : {
        files: 'Files',
        fileName: 'File Name',
        size: 'Size',
        modified: 'Modified'
    },
    // General Text (reusable) - try to keep it alphabetized
    actions : 'Actions',
    add : 'Add',
    addNewUser : 'Add New User',
    cancel : 'Cancel',
    confirm : 'Confirm',
    content : 'Content',
    contentTypes : 'Content Types',
    edit : 'Edit',
    email : 'Email',
    enabled : 'Enabled',
    home : 'Home',
    login : 'Login',
    log_in : 'Log In',
    log_out : 'Log Out',
    menu : 'Menu',
    name : 'Name',
    next : 'Next',
    previous : 'Previous',
    profile : 'Profile',
    role : 'Role',
    save : 'Save',
    settings : 'Settings',
    siteName : 'Grasshopper',
    status : 'Status',
    type: 'Type',
    types : 'Types',
    user_name : 'User Name',
    users : 'Users'
});