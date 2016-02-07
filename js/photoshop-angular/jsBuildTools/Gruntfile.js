/**
 * Created by Rob on 11/8/2014.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {
                    "../../../public/photoshop-angular/css/app.css": "../src/less/app.less"
                }
            }
        },

        watch: {
            scripts: {
                files: ['../src/app/**/!(*.spec).js','../src/less/*.less'],
                tasks: ['concat', 'less', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },

        concat: {
            basic_and_extras: {
                files: {
                    '../../../public/photoshop-angular/js/app.js': ['../src/app.js','../src/app/**/!(*.spec).js'],
                    '../../../public/photoshop-angular/js/lib.js': [
                        '../src/libs/angular/angular.js',
                        '../src/libs/angular-mocks/angular-mocks.js',
                        '../src/libs/bower-angular-resource-master/angular-resource.js',
                        '../src/libs/angular-route/angular-route.js',
                        '../src/libs/angular-ui-router.js',
                        '../src/libs/ui-bootstrap-tpls-0.12.0.js',
                        '../src/libs/lodash.js'
                    ]
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            js: {
                files: {
                    '../../../public/photoshop-angular/js/lib-min.js': ['../../../public/photoshop-angular/js/lib.js'],
                    '../../../public/photoshop-angular/js/app-min.js': ['../../../public/photoshop-angular/js/app.js']
                }
            }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['concat', 'less', 'uglify' ]);


};



