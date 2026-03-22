import { randomUUID } from "node:crypto";
import { productStore } from "../db/store";
import { CreateProductDto, Product, UpdateProductDto } from "../models/product.model";


var isValidUUID = (id: string): boolean => {
    var uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(id);
}

class BadRequestError extends Error {
    statusCode = 400;
}

class NotFoundError extends Error {
    statusCode = 404;
}

export var productService = {
    getAll: (): Product[] => {
        return productStore.getAll();
    },

    getById: (id: string): Product => {
        if (!isValidUUID(id)) {
            throw new BadRequestError("Invalid productId (not UUID)");
        }

        var product = productStore.getById(id);

        if (!product) {
            throw new NotFoundError("Product not found");
        }

        return product;
    },

    create: (data: CreateProductDto): Product => {
        var product: Product = {
            id: randomUUID(),
            ...data,
        };

        productStore.create(product);

        return product;
    },

    update: (id: string, data: UpdateProductDto): Product => {
        if (!isValidUUID(id)) {
            throw new BadRequestError("Invalid productId (not UUID)");
        }

        var existing = productStore.getById(id);

        if (!existing) {
            throw new NotFoundError("Product not found");
        }

        var updatedProduct: Product = {
            id,
            ...data,
        };

        productStore.update(id, updatedProduct);

        return updatedProduct;
    },

    delete: (id: string): void => {
        if (!isValidUUID(id)) {
            throw new BadRequestError("Invalid productId (not UUID)");
        }
        var deleted = productStore.delete(id);
        if (!deleted) {
            throw new NotFoundError("Product not found");
        }
    },
};