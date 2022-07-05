# Plug

A promise based task runner inspired by the task organization features of gulp.

The goal of this project is to provide a way to organize and run tasks that are simply
JS promises in a build pipeline. The project makes no assumptions about the tasks you
need to run in your pipeline.

## Setup

Create a `pipeline.js` file with your tasks.

```JS
import plug from '@bliles/plug-pipeline';

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

## Running your pipeline

Install the package globally to have plug available on the command line.

```sh
npm install -g @bliles/plug-pipeline
```

Then you can simply run `plug` in the path with your `pipeline.js` file.

Alternatively you can add an npm script that references the local node_modules:

```json
{
...
  "scripts": {
    "plug": "node ./node_modules/.bin/plug",
  }
...
```
