import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { productController } from "../controllers/product.controller";

export var productRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get("/", productController.getAll);        // GET /api/products
    app.get("/:id", productController.getById);    // GET /api/products/:id
    app.post("/", productController.create);       // POST /api/products
    app.put("/:id", productController.update);     // PUT /api/products/:id
    app.delete("/:id", productController.delete);  // DELETE /api/products/:id
}