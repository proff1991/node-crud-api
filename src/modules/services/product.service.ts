import { randomUUID } from "node:crypto";
import { productStore } from "../db/store";
import { CreateProductDto, Product, UpdateProductDto } from "../models/product.model";
import { z } from "zod";


class BadRequestError extends Error {
    statusCode = 400;
}

class NotFoundError extends Error {
    statusCode = 404;
}

var uuidSchema = z.uuid();

var isValidUUID = (id: string) => {
    var result = uuidSchema.safeParse(id);
    if (!result.success) {
        throw new BadRequestError("Invalid productId (not UUID)");
    }
    return id;
};

export var productService = {
    getAll: (): Product[] => {
        return productStore.getAll();
    },

    getById: (id: string): Product => {

        isValidUUID(id);

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
        isValidUUID(id);

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
        isValidUUID(id);
        var deleted = productStore.delete(id);
        if (!deleted) {
            throw new NotFoundError("Product not found");
        }
    },
};

