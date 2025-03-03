/* global module:false */
module.exports = function(grunt) {

    // closure compiler externs
    var externs = ['lazy.ext.js'];

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! 📐 Style.Tools */'
        },

        // IIFE
        iife: {
            "lazy": {
                options: {
                    useStrict: true,
                    prependSemicolon: false,
                    trimCode: true,
                    args: ['window', 'document'],
                    params: ['win', 'doc', 'undefined']
                },
                files: {
                    "tmp/lazy-iife.js": [
                        'src/lazy.js'
                    ]
                }
            },

           "lazy-poly": {
                options: {
                    useStrict: true,
                    prependSemicolon: false,
                    trimCode: true,
                    args: ['window', 'document'],
                    params: ['win', 'doc', 'undefined']
                },
                files: {
                    "tmp/lazy-poly-iife.js": [
                        'src/lazy.js',
                        'src/lazy-async-polyfill.js'
                    ]
                }
            },

           "lazy-data-attr": {
                options: {
                    useStrict: true,
                    prependSemicolon: false,
                    trimCode: true,
                    args: ['window', 'document'],
                    params: ['win', 'doc', 'undefined']
                },
                files: {
                    "tmp/lazy-data-attr-iife.js": [
                        'src/lazy.js',
                        'src/lazy-data-attr-head.js',
                        'src/lazy-data-attr.js'
                    ]
                }
            },

           "lazy-data-attr-poly": {
                options: {
                    useStrict: true,
                    prependSemicolon: false,
                    trimCode: true,
                    args: ['window', 'document'],
                    params: ['win', 'doc', 'undefined']
                },
                files: {
                    "tmp/lazy-data-attr-poly-iife.js": [
                        'src/lazy.js',
                        'src/lazy-data-attr-head.js',
                        'src/lazy-async-polyfill.js',
                        'src/lazy-data-attr.js'
                    ]
                }
            },

           "polyfill": {
                options: {
                    useStrict: true,
                    prependSemicolon: false,
                    trimCode: true,
                    args: ['window', 'document'],
                    params: ['win', 'doc']
                },
                files: {
                    "tmp/intersectionobserver-polyfill.js": [
                        'src/intersectionobserver-polyfill.js'
                    ]
                }
            }
        },

        // closure compiler
        // enhanced with --module / -- chunk
        // @link https://github.com/gmarty/grunt-closure-compiler/pull/61
        "closure-compiler": {

            "lazy": {
                closurePath: '../../closure-compiler',
                js: [
                    'src/gcc-define.js',
                    'tmp/lazy-iife.js'
                ],
                jsOutputFile: 'dist/lazy.js',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    define: ['TINY=false']
                }
            },
            "lazy-minimum": {
                closurePath: '../../closure-compiler',
                js: [
                    'src/gcc-define.js',
                    'tmp/lazy-iife.js'
                ],
                jsOutputFile: 'dist/lazy-minimum.js',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    define: ['TINY=true']
                }
            },
            "lazy-poly": {
                closurePath: '../../closure-compiler',
                js: [
                    'src/gcc-define.js',
                    'tmp/lazy-poly-iife.js'
                ],
                jsOutputFile: 'dist/lazy+polyfill.js',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    define: ['TINY=false']
                }
            },
            "lazy-data-attr": {
                closurePath: '../../closure-compiler',
                js: [
                    'src/gcc-define.js',
                    'tmp/lazy-data-attr-iife.js'
                ],
                jsOutputFile: 'dist/lazy-data-attr.js',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    define: ['TINY=false']
                }
            },
            "lazy-data-attr-poly": {
                closurePath: '../../closure-compiler',
                js: [
                    'src/gcc-define.js',
                    'tmp/lazy-data-attr-poly-iife.js'
                ],
                jsOutputFile: 'dist/lazy-data-attr+polyfill.js',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    define: ['TINY=false']
                }
            },
            "polyfill": {
                closurePath: '../../closure-compiler',
                js: 'tmp/intersectionobserver-polyfill.js',
                jsOutputFile: 'dist/intersectionobserver-polyfill.js',
                maxBuffer: 30000,
                noreport: true,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT',
                    externs: externs,
                    define: ['TINY=false']
                }
            }
        }
    });

    // Load Dependencies
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', [
        'iife',
        'closure-compiler:lazy',
        'closure-compiler:lazy-minimum',
        'closure-compiler:lazy-poly',
        'closure-compiler:lazy-data-attr',
        'closure-compiler:lazy-data-attr-poly'
    ]);

    grunt.registerTask('lazy', [
        'iife:lazy',
        'closure-compiler:lazy'
    ]);

    grunt.registerTask('tiny', [
        'iife:lazy',
        'closure-compiler:lazy-minimum'
    ]);

    grunt.registerTask('polyfill', [
        'iife:polyfill',
        'closure-compiler:polyfill'
    ]);

    grunt.registerTask('default', ['']);
};