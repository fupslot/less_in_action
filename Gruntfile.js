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
    }
  })
};
