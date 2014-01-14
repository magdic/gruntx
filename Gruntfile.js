module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
     connect: {
    server: {
      options: {
        port: 9001
      }
    }
  },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit'],
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    express: {
   
    dev: {
      options: {
        script: 'server.js',
        app: 'Google Chrome'
      }
    },
  },
    open : {
      dev : {
        path: 'http://localhost:1337/',
        app: 'Google Chrome'
    }
  },

sass: {
      dist: {
        files: {
          'css/style.css' : 'sass/style.scss',
          'css/fonts.css' : 'sass/fonts.scss',
        }
      }
    },

  'bower-install': {

  target: {

    // Point to the files that should be updated when
    // you run `grunt bower-install`
    src: ['index.html', 'another.html'],

    // Optional:
    // ---------
    cwd: '',
    ignorePath: '',
    exclude: [],
    fileTypes: {}
  }
}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'open', 'watch']);

  grunt.registerTask('server', [ 'express:dev', 'open', 'watch' ]);

};