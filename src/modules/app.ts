import Fastify from "fastify";
import { productRoutes } from "./routes/product.routes";
import { ZodError } from "zod";

export var makeFastifyApp = () => {
    var app = Fastify({ logger: true });

    app.register(productRoutes, { prefix: "/api/products" });
    app.setNotFoundHandler((request, reply) => {
        reply.status(404).send({
            message: "Route not found",
        });
    });

    app.setErrorHandler((error, request, reply) => {
        app.log.error(error);

        if (error instanceof ZodError) {
            return reply.status(400).send({
                message: "Validation failed",
                issues: error.issues,
            });
        }

        if (error instanceof Error) {
            if ("statusCode" in error && typeof error.statusCode === "number") {
                return reply.status(error.statusCode).send({
                    message: error.message,
                });
            }
        }

        reply.status(500).send({
            message: "Internal server error",
        });
    });

    return app;
}