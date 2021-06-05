module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            folder: ['build/grunt/']
        },
        concat: {
            css: {
                src: [
                    '../shared/bootstrap-4.6.0-dist/css/bootstrap.min.css',
                    '../shared/jquery.fancybox.min.css'
                ],
                dest: 'build/grunt/css/style.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
            },
            main: {
                expand: true,
                flatten: true,
                src: 'build/grunt/css/style.css',
                dest: 'build/grunt/css/'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/grunt/js/main.min.js': ['js/jquery-3.3.1.min.js', 'js/popper.min.js']
                }
            }
        },
        cssmin: {
            dist: {
                src: ['<%= concat.css.dest %>'],
                dest: 'build/grunt/css/style.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: ['*'],
                    dest: 'build/grunt/img',
                }]
            }
        },
        clean: {
            css: ['<%= concat.css.dest %>'],
        },
        sprite:{
            all: {
                src: 'img/*.png',
                dest: 'build/grunt/img/sprites/sprites.png',
                destCss: 'build/grunt/img/sprites/sprites.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.registerTask('default', ['concat', 'uglify', 'autoprefixer', 'uglify', 'cssmin', 'imagemin', 'clean', 'sprite']);
};