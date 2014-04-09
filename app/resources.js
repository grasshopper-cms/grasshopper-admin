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
        dontHaveAccount : 'Don\'t have an account?',
        loggedInAs : 'Logged in as',
        signIn : 'Sign In',
        signInRegisteredUser : 'Sign in using your registered account:',
        signUp : 'Sign Up',
        userDetailHeaderText : 'Profile for: ',
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
        roles : [ //TODO: DELETE THIS!!!
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
        newUserAdded : 'New User Added',
        couldNotFindUserContentType : 'Could not find Users content type. Please make one.',
        addNewUser : 'Add New User'
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
        editName : 'Edit folder name',
        emptyNode : 'This folder does not contain any content.',
        clickToAdd : 'Click to add some.'
    },
    contentItem : {
        deletionWarning : 'Are you sure you want to delete this content?',
        successfullyDeletedPre : 'Content ',
        successfullyDeletedPost : ' was successfully deleted.',
        errorDeleted : 'There was an issue deleting this content: ',
        createContent : 'New content',
        readonly : 'Readonly',
        labelErrorMessage : 'Label is a required field.',
        successfullySaved : 'Content successfully saved.',
        failedToSave : 'Content could not be saved.',
        failedToFetch : 'Content could not be retrieved.',
        failedToFetchContentsContentType : 'Could not retrieve content type for this content.',
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
        deletionWarningWithAssociatedContent : 'You have :count of content associated with this content type. ' +
            'If you confirm it will all be deleted!',
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
        removeFieldWarning: 'If you delete this field it will be deleted from all content of this type.',
        addOption : 'Add Option',
        helpText : 'Help Text',
        description: 'Description',
        emptyFields : 'Click "Add new field" to add your first field.',
        switchingBetweenSimpleAndComplexTypesWarning : 'You are switching between simple and complex data types. ' +
            'If you confirm, your content may be corrupted!',
        selectOption : 'Please Select',
        thisFieldHasNoValidation : 'This field has no validations',
        addValidationType : 'Add Validation'
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
        uploadAssetModalMsg : 'Upload an Asset.',
        emptyNode : 'This folder does not contain any files.',
        clickToAdd : 'Click to add some.'
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
    nodeTree : {
        emptyFolder : {
            content : 'This folder has no content.',
            files : 'This folder has no files.'
        }
    },
    plugins : {
        codeEditor : {
            language : 'Language',
            theme : 'Theme',
            loading : 'LOADING CODE EDITOR...'
        },
        contentReference : {
            selectedContent : 'Selected Content',
            currentFolder : 'Current Folder',
            selectDefaultFolderOr : 'Select Default Folder or',
            setRootAsDefault : 'Set Root Folder as Default',
            defaultFolder : 'Default Folder',
            contentTypes : 'Content Types',
            selectContent : 'Select Content',
            viewContent : 'View Content'
        },
        dropdown : {
            selectOption : 'Please Select'
        },
        editorialWindow : {
            loading : 'Loading editorial window...',
            startAfterEnd : 'Start date is after end date',
            setToNow : 'Set to now',
            start : 'Start',
            end : 'End',
            neverExpire : 'Never Expire'
        },
        embeddedType : {
            contentType : 'Content Type'
        },
        fileReference : {
            selectedFile : 'Selected File',
            currentFolder : 'Current Folder',
            selectDefaultFolderOr : 'Select Default Folder or',
            setRootAsDefault : 'Set Root Folder as Default',
            defaultFolder : 'Default Folder',
            contentTypes : 'Content Types',
            selectFile : 'Select File',
            viewSelectedFile : 'View Selected File'
        },
        richText : {
            selectFile : 'Select File',
            loading : 'LOADING RICH TEXT...'
        },
        slug : {
            refresh : 'Refresh',
            selectField : 'Select Field'
        }
    },
    validationViews : {
        deletionWarning : 'You are about to delete a validation field. Are you sure you want to do this?'
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
    defaultValue : 'Default Value',
    download : 'Download',
    edit : 'Edit',
    email : 'Email',
    enabled : 'Enabled',
    falseText : 'False',
    from : 'From',
    home : 'Home',
    helpText : 'Help Text',
    id : 'ID',
    key: 'Key',
    minimum : 'Minimum',
    min : 'Min',
    label : 'Label',
    login : 'Login',
    log_in : 'Log In',
    log_out : 'Log Out',
    match : 'Match',
    maximum : 'Maximum',
    max : 'Max',
    menu : 'Menu',
    allowMultiple : 'Allow Multiple',
    allowMultipleSettings : 'Allow Multiple Settings',
    multiple : 'Multiple',
    name : 'Name',
    next : 'Next',
    newWord : 'New',
    no : 'No',
    options : 'Options',
    password : 'Password',
    previous : 'Previous',
    profile : 'Profile',
    remind : 'Remind',
    remove : 'Remove',
    retry : 'Retry',
    required : 'Required',
    role : 'Role',
    save : 'Save',
    selectOption : 'Please Select',
    settings : 'Settings',
    siteName : 'Grasshopper',
    status : 'Status',
    summary : 'Summary',
    thisIsNotImplemented : 'This is not yet implemented.',
    title : 'Title',
    to : 'To',
    trueText : 'True',
    type : 'Type',
    types : 'Types',
    upload : 'Upload',
    user_name : 'User Name',
    users : 'Users',
    value : 'Value',
    validation : 'Validation',
    warning : 'Warning!',
    welcomeBack : 'Welcome Back',
    yes : 'Yes'
});