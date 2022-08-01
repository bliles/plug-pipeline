const { existsSync } = require('fs');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const chokidar = require('chokidar');

const tasks = {};

module.exports = {
    task(name, definition) {
        if (Array.isArray(definition)) {
            tasks[name] = this.parallel(definition);
        }
        tasks[name] = definition;
    },
    series() {
        const subtasks = arguments;

        return async () => {
            for(let i = 0; i < subtasks.length; i++) {
                if (typeof subtasks[i] === "string") {
                    await this.run(subtasks[i]);
                } else {
                    await subtasks[i]();
                }
            }
        }
    },
    parallel() {
        const subtasks = arguments;
        return async () => {
            const promises = [];
            for(let i = 0; i < subtasks.length; i++) {
                if (typeof subtasks[i] === "string") {
                    promises.push(this.run(subtasks[i]))
                } else {
                    promises.push(subtasks[i]());
                }
            }
            await Promise.all(promises);
        }
    },
    run: async (name) => {
        if (!(name in tasks)) {
            console.log(`Error task ${name} not found...`);
            return;
        }

        console.log(`Starting ${name}...`);
        try {
            await tasks[name]();
        } catch(ex) {
            console.log(name);
            console.log(tasks[name]);
            console.error(ex);
        }
        console.log(`Finished ${name}...`);
    },
    copy: (src, dest, base) => {
        return new Promise((resolve, reject) => {
            glob(src, async (error, files) => {
                if (error) {
                    reject(error);
                }

                for (let i = 0; i < files.length; i++) {
                    const f = files[i];
                    const newPath = dest + "/" + (base ? f.replace(base, '') : path.basename(f));

                    const stat = await fs.lstat(f);
                    if (stat.isDirectory()) {
                        await fs.mkdir(newPath, { recursive: true });
                    } else {
                        const parent = path.dirname(newPath);
                        if (!existsSync(parent)) {
                            await fs.mkdir(parent, { recursive: true });
                        }

                        await fs.copyFile(f, newPath);
                    }
                }
                resolve();
            });
        });
    },
    watch: (path, callback) => {
        chokidar.watch(path).on('change', callback);
    },
}
