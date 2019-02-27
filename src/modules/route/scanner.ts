import * as glob from "glob";

import { App } from "../../app/App";

export class Scanner {

    private fixPathName(pathName: string): string {
        return pathName.replace("route/../", "");
    }

    public scanControllers(app: App) {

        const files: string[] = glob.sync(__dirname + "/../**/*.controller.js");
        files.map((file) => this.fixPathName(file))
             .forEach((file) => {
                const exports = require(file);
                Object.keys(exports).forEach((key) => {
                    // tslint:disable-next-line
                    new exports[key](app);
                });
            });
    }
}
