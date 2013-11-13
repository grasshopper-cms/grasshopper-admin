module.exports = {
    dist : {
        files : [
            {
                expand : true,
                cwd : 'temp/images',
                src : '{,*/}*.{png,jpg,jpeg}',
                dest : 'build/images'
            }
        ]
    }
};