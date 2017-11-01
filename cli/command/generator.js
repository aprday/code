import {
    api
} from 'dva-ast';
import upperCamelCase from 'simple-uppercamelcase';
import {
    basename,
    dirname,
    join
} from 'path';
import {
    statSync,
    readFileSync
} from 'fs';
import pathExists from 'path-exists';
import leftPad from 'left-pad';
import chalk from 'chalk';

function generator(type) {
    switch (type) {
        case 'model':
            (() => {
                const modelPath = `./models/${name}`;
                const filePath = `${base}/models/${name}.js`;
                const entry = program.entry || defaultEntry;
                info('create', `model ${name}`);
                info('register', `to entry ${entry}`);
            })();
            break;
        case 'route':
            (() => {
                const componentName = upperCamelCase(name);
                const componentPath = `${base}/routes/${componentName}.js`;
                const componentCSSPath = `${base}/routes/${ }.css`;
                const withCSS = program.css ?
                    `, ${componentCSSPath}` :
                    '';
                info('create', `routeComponent ${componentPath}${withCSS}`);
                api('routeComponents.create', {
                    sourcePath: cwd,
                    filePath: componentPath,
                    componentName,
                    css: program.css
                });
                info('create', `route ${name} with ${componentPath}`);
                api('router.createRoute', {
                    filePath: program.router || defaultRouter,
                    sourcePath: cwd,
                    path: `/${name}`,
                    component: {
                        componentName,
                        filePath: componentPath
                    }
                });
            })();
            break;
        case 'componet':
            (() => {
                const componentName = upperCamelCase(name);
                const componentPath = `${base}/routes/${componentName}.js`;
                const componentCSSPath = `${base}/routes/${componentName}.css`;
                const withCSS = program.css ?
                    `, ${componentCSSPath}` :
                    '';
                info('create', `routeComponent ${componentPath}${withCSS}`);
                api('routeComponents.create', {
                    sourcePath: cwd,
                    filePath: componentPath,
                    componentName,
                    css: program.css
                });
                info('create', `route ${name} with ${componentPath}`);
                api('router.createRoute', {
                    filePath: program.router || defaultRouter,
                    sourcePath: cwd,
                    path: `/${name}`,
                    component: {
                        componentName,
                        filePath: componentPath
                    }
                });
            })();
            break;
    }
}

export default (pwd) => {
    console.log(pwd);
}