module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          './styles.css': 'less/styles.less'
        }
      }
    },

    sass: {
      style: {
        options: {
          sourcemap: 'inline',
          lineNumbers: true,
        },
        files: {
          './styles.css': 'sass/styles.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: [
          './less/**/*.*',
          './index.html'
        ],
        tasks: ['less']
      },
      sass: {
        files: [
          './sass/**/*.*',
          './index.html'
        ],
        tasks: ['sass']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          open: {
            target: 'http://localhost:9001'
          }
        }
      }
    }
  });

  grunt.registerTask('serve', ['sass', 'connect', 'watch:sass']);
};
