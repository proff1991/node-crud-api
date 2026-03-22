import cluster from "node:cluster";
import os from "node:os";
import http from "node:http";

import { getEnv } from "./modules/config/env";
import { makeFastifyApp } from "./modules/app";
import { handleClusterMessage, isClusterMessage } from "./modules/db/store";

var BASE_PORT = getEnv().PORT;
var numCPUs = os.availableParallelism();
var isMulti: boolean = process.argv.includes("--multi") && !(process.argv.includes("--multi=false")) && !(process.argv.includes("--multi false"));

; (async () => {
    if (isMulti && cluster.isPrimary) {
        console.log(`Master ${process.pid} started`);

        var workersMap = new Map<number, number>();
        var workersPorts: number[] = [];

        for (var i = 0; i < Math.max(1, numCPUs - 1); i++) {
            var port = BASE_PORT + i + 1;

            var worker = cluster.fork({
                PORT: String(port),
            });

            workersMap.set(worker.id, port);
            workersPorts.push(port);

            worker.on("message", (message) => {
                for (var id in cluster.workers) {
                    cluster.workers[id]?.send(message);
                }
            });
        }

        if (workersPorts.length === 0) {
            throw new Error("No workers started");
        }

        cluster.on("exit", (worker) => {
            console.log(`Worker ${worker.process.pid} died`);

            var port = workersMap.get(worker.id);

            if (!port) {
                console.error("No port found for worker");
                return;
            }

            var newWorker = cluster.fork({
                PORT: String(port),
            });

            workersMap.set(newWorker.id, port);

            newWorker.on("message", (message) => {
                for (var id in cluster.workers) {
                    cluster.workers[id]?.send(message);
                }
            });
        });

        var current = 0;

        var getNextPort = () => {
            var port = workersPorts[current];
            current = (current + 1) % workersPorts.length;
            return port;
        };

        var server = http.createServer((req, res) => {
            var targetPort = getNextPort();

            console.log(`→ Forwarding request to ${targetPort}`);

            var options = {
                hostname: "localhost",
                port: targetPort,
                path: req.url,
                method: req.method,
                headers: {
                    ...req.headers,
                    connection: "close",
                },
            };

            var proxy = http.request(options, (proxyRes) => {
                res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            });

            req.pipe(proxy, { end: true });

            proxy.on("error", () => {
                res.writeHead(500);
                res.end("Proxy error");
            });
        });

        server.listen(BASE_PORT, () => {
            console.log(`Load balancer running on port ${BASE_PORT}`);
        });
    } else {

        process.on("message", (message) => {
            if (isClusterMessage(message)) {
                handleClusterMessage(message);
            }
        });

        var port = Number(process.env.PORT);


        var app = makeFastifyApp();

        await app.listen({ port });
        console.log(`Worker ${process.pid} running on port ${port}`);
        console.log(`Worker running on port ${port}`);

    }
})();