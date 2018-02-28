import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

const packageRoot = path.join(__dirname, "../..");

export class Constants {
    public static RECORDED_DIR = path.join(packageRoot, "recorded");
}

assert.ok(fs.existsSync(Constants.RECORDED_DIR), Constants.RECORDED_DIR);
