module.exports = {
    provisionFilesCopied : {
        options : {
            questions : [
                {
                    config: 'provisionConfig',
                    type: 'confirm',
                    message: 'Have you copied over provision files?'
                }
            ]
        }
    }
};