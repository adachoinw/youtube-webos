#!/usr/bin/env node

const fs = require('fs');

const suffix = process.argv[2];
if (!suffix) throw new Error('Usage: rename-ipk <suffix>');

const appinfo = require('../assets/appinfo.json');
const pkgJson = require('../package.json');

const built = `${appinfo.id}_${pkgJson.version}_all.ipk`;
const renamed = `${appinfo.id}_${pkgJson.version}_all${suffix}.ipk`;

fs.renameSync(built, renamed);
console.log(`Renamed ${built} to ${renamed}`);
