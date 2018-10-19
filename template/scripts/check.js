#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dest = './src/config/local.yaml';

const local = path.join(process.cwd(), dest);

if (!fs.existsSync(local)) {
  fs.writeFileSync(local, '');
}
