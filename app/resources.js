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
        roles : [
            'admin',
            'reader',
            'editor',
            'author',
            'none'
        ],
        successfullyUpdated : 'User was successfully updated',
        updateError : 'User was successfully updated',
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
        deletionWarning : 'Are you sure you want to delete this folder? All of its contents will also be deleted.',
        successfullyDeletedPre : 'Folder ',
        successfullyDeletedPost : ' was successfully deleted.',
        successfullyUpdated : 'Folder was successfully updated.',
        successfullyCreatedPre : 'Folder: ',
        successfullyCreatedPost : ' was successfully created.',
        errorUpdated : 'Folder could not be updated.',
        errorDeleted : 'There was an issue deleting this folder: ',
        enterName : 'Please enter the name of the folder: ',
        errorCreating : 'Folder could not be added.',
        editName : 'Edit Folder name:'
    },
    contentItem : {
        deletionWarning : 'Are you sure you want to delete this content?',
        successfullyDeletedPre : 'Content ',
        successfullyDeletedPost : ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this content: ',
        createContent : 'New content',
        statusOptions : [
            'Live',
            'Inactive'
        ],
        readonly : 'Readonly',
        labelErrorMessage : 'Label is a required field.',
        successfullyAdded : 'Content successfully added.',
        failedToAdd : 'Content could not be saved.',
        label : 'Label',
        labelRequiredMessage : 'Label is a required field.',
        author : 'Author',
        slug : 'Slug',
        status : 'Status',
        parent : 'Parent Folder',
        id : 'Content Id',
        type : 'Content Type'
    },
    contentType : {
        addContentTypes : 'Add Content Types: ',
        editContentTypes : 'Edit allowed Content Types',
        contentTypeAdded : 'Content Type Added',
        deletionWarningWithoutAssociatedContent : 'Are you sure you want to delete this content type?',
        deletionWarningWithAssociatedContent : 'WARNING. You have content associated with this content type. ' +
            'If you delete this all the following content will be deleted!!',
        successfullyDeletedPre : 'Content Type ',
        successfullyDeletedPost : ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this content type: ',
        serverError : 'Content Types could not be retrieved.',
        selectContentType : 'Which Content Type would you like to use?',
        contentInRoot : 'You cannot create content in the Root.',
        noContentTypes : 'This folder has no allowed content types.',
        fields : 'Fields',
        fieldType : 'Field Type',
        addNewField : 'Add New Field',
        successfulSave : 'Content type successfully saved.',
        failedSave : 'Content type could not be saved.',
        removeFieldWarning: 'If you delete this field. ' +
            'This field will be deleted from all content of this type.',
        addOption : 'Add Option',
        helpText : 'Help Text',
        description: 'Description',
        emptyFields : 'Click "Add new field" to add your first field.'
    },
    asset : {
        deletionWarning : 'Are you sure you want to delete this asset?',
        successfullyDeletedPre : 'Asset Name: ',
        successfullyDeletedPost : ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this asset: ',
        editFileName : 'Edit File Name',
        editNameSuccess : 'File name was successfully updated.',
        editNameFail : 'File name could not be updated.',
        uploadAssetError : 'Upload Failed',
        dragFilesHere : 'Drag and Drop Files Here. Or Click to Select.',
        uploadInRoot : 'You cannot upload assets in the Root.',
        uploadAssetModalMsg : 'Upload an Asset.'
    },
    contentBrowse : {
        author : 'Author',
        modified : 'Modified'
    },
    fileIndex : {
        files : 'Files',
        fileName : 'File Name',
        size : 'Size',
        modified : 'Modified'
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
    falseText : 'False',
    home : 'Home',
    id : 'ID',
    minimum : 'Minimum',
    label : 'Label',
    login : 'Login',
    log_in : 'Log In',
    log_out : 'Log Out',
    maximum : 'Maximum',
    menu : 'Menu',
    allowMultiple : 'Allow Multiple',
    allowMultipleSettings : 'Allow Multiple Settings',
    multiple : 'Multiple',
    name : 'Name',
    next : 'Next',
    newWord : 'New',
    no : 'No',
    options : 'Options',
    previous : 'Previous',
    profile : 'Profile',
    remove : 'Remove',
    retry : 'Retry',
    required : 'Required',
    role : 'Role',
    save : 'Save',
    settings : 'Settings',
    siteName : 'Grasshopper',
    status : 'Status',
    summary : 'Summary',
    thisIsNotImplemented : 'This is not yet implemented.',
    title : 'Title',
    trueText : 'True',
    type : 'Type',
    types : 'Types',
    upload : 'Upload',
    user_name : 'User Name',
    users : 'Users',
    validation : 'Validation',
    welcomeBack : 'Welcome Back',
    yes : 'Yes'
});