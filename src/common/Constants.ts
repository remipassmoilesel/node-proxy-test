import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

export const PACKAGE_ROOT = path.join(__dirname, '../..');
assert.ok(fs.existsSync(path.join(PACKAGE_ROOT, 'package.json')));

export class Constants {
    public static RECORDED_DIR = path.join(PACKAGE_ROOT, 'recorded');
}

assert.ok(fs.existsSync(Constants.RECORDED_DIR), Constants.RECORDED_DIR);
