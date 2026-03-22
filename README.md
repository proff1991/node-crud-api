# CRUD API

## Description

RS.SCHOOL NodeJS 2026 Q1 Course Project "CRUD API for a Product Catalog"

## Stack

- Node.js
- TypeScript
- Fastify
- Zod
- dotenv

## Requirements

- Node.js 24.x.x version (24.10.0 or upper)
- npm 11.x (11 or upper)

## Installation

```bash
npm install
```

## Environment Variables

You need to create the .env file and set into it the PORT variable, or also you can use .env.example as main .env:

```bash
cp .env.example .env
```

## Running the project

- Development single-process mode: 
   ```bash
   npm run start:dev
   ```

- Development multi-process mode: 
   ```bash
   npm run start:multi
   ```

- Production single-process mode: 
   ```bash
   npm run start:prod
   ```

- Production multi-process mode: 
   ```bash
   npm run start:prod:multi
   ```

## API Endpoints

Base URL: http://localhost:PORT/

| Method | Path             | Description          |
|--------|----------------------|----------------------|
| ```GET```    | ```/api/products```    | Get all products     |
| ```GET```    | ```/api/products/:id```  | Get product by ID    |
| ```POST```   | ```/api/products```      | Create a new product |
| ```PUT```    | ```/api/products/:id```  | Update a product     |
| ```DELETE``` | ```/api/products/:id```| Delete a product     |

⚠️ method ```PUT``` required all fields of the body !!!


## Product Schema: 
- ```id``` — unique identifier (string, uuid) generated on the server side
- ```name``` — product name (string, required)
- ```description``` — product description (string, required)
- ```price``` — product price (number, required, must be > 0)
- ```category``` — product category (string, required, e.g. "electronics", "books", "clothing")
- ```inStock``` — whether the product is in stock (boolean, required)

⚠️ You can use the ID to retrieve information about a specific product, edit it, or delete it. You don't need to create an ID manually when creating a product in the database! The ID is automatically generated on the server and assigned to each individual product.


## Body example
```JSON
{
    "name": "Sunsong Galaktion S25 Ultra 12/256GB Titanium Black (SN-S938B)",
    "description": "A stunning new smartphone. Any resemblance to other models is purely coincidental.",
    "price": 95000,
    "category": "Phones",
    "inStock": true
}
```