import { FastifyReply, FastifyRequest } from "fastify";
import { productService } from "../services/product.service";
import { createProductSchema, updateProductSchema } from "../models/product.model";

export var productController = {
    getAll: async (request: FastifyRequest, reply: FastifyReply) => {
        var products = productService.getAll();
        reply.status(200).send(products);
    },

    getById: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        var id = request.params.id;
        var product = productService.getById(id);
        reply.status(200).send(product);
    },

    create: async (request: FastifyRequest<{ Body: unknown }>, reply: FastifyReply) => {
        var data = createProductSchema.parse(request.body);
        var product = productService.create(data);
        reply.status(201).send(product);
    },

    update: async (request: FastifyRequest<{ Params: { id: string }; Body: unknown; }>, reply: FastifyReply) => {
        var id = request.params.id;
        var data = updateProductSchema.parse(request.body);
        var updatedProduct = productService.update(id, data);
        reply.status(200).send(updatedProduct);
    },

    delete: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        var id = request.params.id;
        productService.delete(id);
        reply.status(204).send();
    },
};