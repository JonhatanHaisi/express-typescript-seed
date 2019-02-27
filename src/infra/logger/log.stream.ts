import { logger } from "./index";

export class Stream {

    constructor(
        private readonly logLevel: string,
    ) {}

    public write(message: string): void {
        logger[this.logLevel](message);
    }

}
