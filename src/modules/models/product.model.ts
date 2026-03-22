import { z } from "zod";

export var productSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  inStock: z.boolean(),
});

export var createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  inStock: z.boolean(),
});
export var updateProductSchema = createProductSchema;

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type Product = z.infer<typeof productSchema>;