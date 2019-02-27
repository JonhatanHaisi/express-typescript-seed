import * as configs from "./config";
import { IConfigOptions } from "./config.options";

const env = process.env.NODE_ENV;

if (!configs[env]) {
    throw new Error(`Impossible to load configurations for environment: ${env}`);
}

export const config = configs[env] as IConfigOptions;
