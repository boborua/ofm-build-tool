const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
require('jest-enzyme');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, '../src/config/dist.yaml'), { encoding: 'utf-8' });

process.conf = yaml.safeLoad(source);

Enzyme.configure({ adapter: new Adapter() });
