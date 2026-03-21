import Fastify from "fastify";

export var makeFastifyApp = () => {
    var app = Fastify({ logger: true });
    app.get("/", async (request, reply) => {
        return { hello: "world" };
    });
    return app;
}