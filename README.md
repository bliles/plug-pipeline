# Plug

A promise based task runner inspired by the task organization features of gulp.

The goal of this project is to provide a way to organize and run tasks that are simply
JS promises in a build pipeline. The project makes no assumptions about the tasks you
need to run in your pipeline.

## Setup

Create a pipeline.js file with your tasks.

```JS
import plug from 'plug-pipeline';

plug.task('clean', async () => {
    // ...
});

plug.task('build:js', async () => {
    // ...
});

plug.task('build:styles', async () => {
    // ...
});

plug.task('default', plug.series('clean', plug.parallel('build:js', 'build:styles')));
```
