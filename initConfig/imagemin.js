module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: 'app/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: 'build/images'
        }]
    }
};


