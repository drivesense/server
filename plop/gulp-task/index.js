'use strict';

export default plop => {
  plop.setGenerator('gulp-task', {
    description: 'Create a new gulp task',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your gulp task name?'
      },
      {
        type: 'confirm',
        name: 'config',
        message: 'Do you want to import config?'
      }
    ],
    actions: [{
      type: 'add',
      path: 'gulp/tasks/{{name}}.js',
      templateFile: 'plop/gulp-task/template.hbs'
    }]
  });
}