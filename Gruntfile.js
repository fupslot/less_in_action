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
          'styles/styles.css': 'styles/styles.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: [
          './less/**/*.less',
          './index.html'
        ],
        tasks: ['less']
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

  grunt.registerTask('serve', ['less', 'connect', 'watch']);
};
