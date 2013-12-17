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
        },
        newUserAdded : 'New User Added'
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
    node : {
        deletionWarning: 'Are you sure you want to delete this folder? All of its contents will also be deleted.',
        successfullyDeletedPre: 'Folder ',
        successfullyDeletedPost: ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this folder: ',
        enterName: 'Please enter the name of the folder: ',
        errorCreating: 'folder could not be added',
        editName: 'Edit Folder name:'
    },
    contentItem : {
        deletionWarning: 'Are you sure you want to delete this content?',
        successfullyDeletedPre: 'Content ',
        successfullyDeletedPost: ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this content: '
    },
    contentType : {
        addContentTypes: 'Add Content Types: ',
        editContentTypes: 'Edit allowed Content Types',
        contentTypeAdded: 'Content Type Added',
        deletionWarning: 'Are you sure you want to delete this content type?',
        successfullyDeletedPre: 'Content Type ',
        successfullyDeletedPost: ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this content type: ',
        serverError : 'Content Types could not be retrieved.'
    },
    asset : {
        deletionWarning : 'Are you sure you want to delete this asset?',
        successfullyDeletedPre: 'Asset Name: ',
        successfullyDeletedPost: ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this asset: ',
        editFileName : 'Edit File Name',
        editNameSuccess : 'File name was successfully updated.',
        editNameFail : 'File name could not be updated.',
        uploadAssetError : 'Upload Failed',
        dragFilesHere : 'Drag and Drop Files Here. Or Click to Select.'
    },
    contentBrowse : {
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
    close : 'Close',
    confirm : 'Confirm',
    content : 'Content',
    contentTypes : 'Content Types',
    currentlySignedIn : 'You are currently signed in.',
    dashboard : 'Dashboard',
    download : 'Download',
    edit : 'Edit',
    email : 'Email',
    enabled : 'Enabled',
    falseText: 'False',
    home : 'Home',
    login : 'Login',
    log_in : 'Log In',
    log_out : 'Log Out',
    menu : 'Menu',
    name : 'Name',
    next : 'Next',
    previous : 'Previous',
    profile : 'Profile',
    retry : 'Retry',
    role : 'Role',
    save : 'Save',
    settings : 'Settings',
    siteName : 'Grasshopper',
    status : 'Status',
    thisIsNotImplemented : 'This is not yet implemented.',
    trueText: 'True',
    type: 'Type',
    types : 'Types',
    upload : 'Upload',
    user_name : 'User Name',
    users : 'Users',
    welcomeBack : 'Welcome Back'
});