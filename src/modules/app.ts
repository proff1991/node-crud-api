import Fastify from "fastify";
import { productRoutes } from "./routes/product.routes";

export var makeFastifyApp = () => {
    var app = Fastify({ logger: true });

    app.register(productRoutes, { prefix: "/api/products" });
    // app.get("/", async (request, reply) => {
    //     return { hello: "world" };
    // });
    return app;
}