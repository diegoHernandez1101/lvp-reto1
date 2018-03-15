'use strict';

module.exports = function (grunt) {

  // Carga automáticamente las tareas de Grunt.
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates'
//    cdnify: 'grunt-google-cdn'
  });

  // Rutas configurables de la app.
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Configuración de las tareas.
  grunt.initConfig({

    // Configuraciones del proyecto.
    yeoman: appConfig,

    // Vigila los archivos y busca cambios en ellos que pudiera disparar una tarea de Grunt.
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      sass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass:dist','postcss:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Configuraciones del servidor de grunt.
    connect: {
      options: {
        port: 9001,
        // Cambiar a 0.0.0.0 si se va a conectar a un servidor externo.
        hostname: 'localhost',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // plugin que notifica de los errores obvios de programación como ";" faltantes, etc., en su mayoría errores de sintaxis al escribir.
    //IMPORTANTE: no dejará que se levante el proyecto en caso de haber alguno de estos errores.
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ]
      },
      test: {
        src: ['test/spec/**/*.js']
      }
    },

    // Vacía las carpetas para empezar de cero.
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/**/*',
            '!<%= yeoman.dist %>/.git**/*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Añade los estilos predefinidos de vendor.
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Inyecta automáticamente los componentes de bower a la app.
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compila los archivos de SASS/SCSS a CSS  y genera los archivos de ser requeridos.
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          '.tmp/styles/main.css': '<%= yeoman.app %>/styles/main.scss'
        }
      }
    },

    // Renombra los archivos para su lectura por el servidor.
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/**/*.js',
          '<%= yeoman.dist %>/styles/**/*.css',
          '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Lee HTML para habilidar las builds inteligentes que automáticamente concatenan, minifican y revisan archivos.
    // Crea configuración en memoria, de este modo, otras tareas pueden operar sobre ellas.
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    // Reescribe los archivos basados en las configuraciones de las tareas filerev y useminPrepare.
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      js: ['<%= yeoman.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'lvpBusquedaProductosApp',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/**/*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    //ng-annotate trata de asegurar el código para la minificación automática, utilizando la forma larga para la inyección de dependencias.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Reemplaza las referencias de GCDN
/*    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },*/

    // Copia los archivos restantes a lugares donde otras tareas pueden utilizarlas.
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'images/**/*.{webp}',
            'styles/external/*.css'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        },
          {
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap',
          src: ['fonts/*'],
          dest: '<%= yeoman.dist %>'
        },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/font-awesome',
            src: ['fonts/*'],
            dest: '<%= yeoman.dist %>/plugins'
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/summernote/dist',
            src: ['font/*'],
            dest: '<%= yeoman.dist %>/plugins/summernote'
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Corre algunas tareas en paralelo pra acelerar el proceso de construcción.
    concurrent: {
      server: [
        //'compass:server'
        'sass'
      ],
      test: [
        //'compass'
        'sass'
      ],
      dist: [
        //'compass:dist',
        'sass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Configuración de testeo.
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('live', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt live` to start a server.');
    grunt.task.run(['live:' + target]);
  });

  grunt.registerTask('serve', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `serve` task has been deprecated. Use `grunt live` to start a server.');
    grunt.task.run(['live:' + target]);
  });
  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
//    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);
};
