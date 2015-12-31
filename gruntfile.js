module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';\n'
            },
            js: {
                src: ['/src/*.js'],
                dest: 'public/<%= pkg.name %>.js'
            },
            html: {
                src: ['src/*.html'],
                dest: 'public/<%= pkg.name %>.html'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        htmllint: {
            all: ["/src/*.html"]
        },
        csslint: {
            strict: {
                src: ['src/assets/css/*.css']
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        browserSync: {
            bsFiles: {
                src: 'src/assets/css/*.css'
            },
            options: {
                server: {
                    baseDir: "./src/"
                }
            }
        }
    });

    // Minify, Concat & Lint   
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'htmlmin', 'cssmin']);
    grunt.registerTask('lintme', ['jshint', 'htmllint', 'csslint']);

};