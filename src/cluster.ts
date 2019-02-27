import { CpuInfo, cpus } from "os";

import * as cluster from "cluster";

import { logger } from "./infra/logger";

class Clusters {

    private cpus: CpuInfo[];

    constructor() {
        this.cpus = cpus();
        this.init();
    }

    private init(): void {
        if (cluster.isMaster) {

            this.cpus.forEach(() => cluster.fork());

            cluster.on("listening", (worker: cluster.Worker) => {
                logger.info("Cluster %d connected", worker.process.pid);
            });

            cluster.on("disconect", (worker: cluster.Worker) => {
                logger.info("Cluster %d disconnected", worker.process.pid);
            });

            cluster.on("exit", (worker: cluster.Worker) => {
                logger.info("Cluster %d exited", worker.process.pid);
                cluster.fork();
            });

        } else {
            require("./index");
        }
    }

}

export default new Clusters();
