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
        attributeTitles : {
            name : 'USER NAME:',
            role : 'USER ROLE:',
            enabled : 'ENABLED?:',
            email : 'EMAIL:',
            login : 'LOGIN:',
            password : 'PASSWORD:'
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
        errors : {
            403 : 'You do not have adequate permissions to view/edit this profile.'
        }
    },
    site : {
        about : 'About Grasshopper'
    },

    // General Text (reusable) - try to keep it alphabetized
    actions : 'Actions',
    add : 'Add',
    edit : 'Edit',
    email : 'Email',
    enabled : 'Enabled',
    login : 'Login',
    log_in : 'Log In',
    log_out : 'Log Out',
    name : 'Name',
    menu : 'Menu',
    profile : 'Profile',
    role : 'Role',
    save : 'Save',
    siteName : 'Grasshopper',
    user_name : 'User Name',
    users : 'Users'
});