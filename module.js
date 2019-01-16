'use strict';

const fs                        = require('fs');
const path                      = require('path');

const installed                 = path.basename(path.resolve(__dirname, '../')) === 'node_modules';
const project                   = installed ? '../../' : './';
const newModule                 = process.argv[2] && typeof process.argv[2] === 'string' ? process.argv[2] : '';

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

if (newModule !== '') {
  if (fs.existsSync(path.resolve(__dirname, project, 'src', 'modules'))) {
    if (!fs.existsSync(path.resolve(__dirname, project, 'src', 'modules', newModule))) {
      fs.mkdirSync(path.resolve(__dirname, project, 'src', 'modules', newModule));
      fs.writeFile(path.resolve(__dirname, project, 'src', 'modules', newModule, `${newModule}.pug`), `mixin ${newModule}\r\n\t.${newModule}`, 'utf8', error => {
        if (error) return console.error('\x1b[31m%s\x1b[0m', `Error:  ${error}`);
        console.log('Success: .pug file created');
      });
      fs.writeFile(path.resolve(__dirname, project, 'src', 'modules', newModule, `${newModule}.scss`), `.${newModule} {\r\n\r\n}`, 'utf8', error => {
        if (error) return console.error('\x1b[31m%s\x1b[0m', `Error:  ${error}`);
        console.log('Success: .scss file created');
      });
      fs.writeFile(path.resolve(__dirname, project, 'src', 'modules', newModule, `${newModule}.js`), `'use strict';\r\n\r\nexport default class ${capitalize(newModule)} {\r\n\tconstructor() {\r\n\t\t\r\n\t}\r\n}`, 'utf8', error => {
        if (error) return console.error('\x1b[31m%s\x1b[0m', `Error:  ${error}`);
        console.log('Success: .js file created');
      });
    } else console.error('\x1b[31m%s\x1b[0m', 'Error: module exist already');
  } else console.error('\x1b[31m%s\x1b[0m', 'Error: modules folder not found');
} else console.error('\x1b[31m%s\x1b[0m', 'Error: enter name of module');