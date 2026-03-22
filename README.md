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
|--------|------------------------|------------------------|
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

⚠️ All fields (except id) are required when you create a new product in the database. Price must be a positive number (integer or float).

⚠️ You can use the ID to retrieve information about a specific product, edit it, or delete it. You don't need to create an ID manually when creating a product in the database! The ID is automatically generated on the server and assigned to each individual product.


## Examples of interaction with the API

Here are some examples:
PORT: 4000
DOMAIN: localhost
PRODUCT ID: c59a68a3-ae51-492b-82cd-74fe886d3930

In production, replace localhost with the required domain, port 4000 with the required port, or remove it altogether (if required). The same rules apply to ID.


### Returns all the products.
```bash
GET http://localhost:4000/api/products/
```
Response:
```200 OK```: you received array of products, content: array of objects or empty array
##### Response example
```JSON
[]
```
##### Another Response example
```JSON
[
    {
      "id": "c59a68a3-ae51-492b-82cd-74fe886d3930",
      "name": "Sunsong Galaktion S25 12/256GB Titanium Black",
      "description": "A stunning new smartphone",
      "price": 95000,
      "category": "Phones",
      "inStock": true
    },
    {
      "id": "9dac4e12-23ad-44ac-88aa-4f74fc74e126",
      "name": "Horror 8 6/666GB Scary Black",
      "description": "Help!",
      "price": 13666,
      "category": "Phones",
      "inStock": true
    },
]
```




### Returns a product by ID.
```bash
GET http://localhost:4000/api/products/c59a68a3-ae51-492b-82cd-74fe886d3930/
```
Response:

```200 OK```: product found, content: object

```400 Bad Request```: invalid productId (not a UUID)

```404 Not Found```: product not found

##### Response example
```JSON
{
    "id": "c59a68a3-ae51-492b-82cd-74fe886d3930",
    "name": "Sunsong Galaktion S25 12/256GB Titanium Black",
    "description": "A stunning new smartphone",
    "price": 95000,
    "category": "Phones",
    "inStock": true
}
```





### Create a new product.
```bash
POST http://localhost:4000/api/products/c59a68a3-ae51-492b-82cd-74fe886d3930/
```
Response:

```201 Created```: product found, content: object

```400 Bad Request```: invalid data, missing required fields, etc.

##### Body example
```JSON
{
    "name": "Sunsong Galaktion S25 12/256GB Titanium Black",
    "description": "A stunning new smartphone",
    "price": 95000,
    "category": "Phones",
    "inStock": true
}
```
##### Response example
```JSON
{
    "id": "c59a68a3-ae51-492b-82cd-74fe886d3930",
    "name": "Sunsong Galaktion S25 12/256GB Titanium Black",
    "description": "A stunning new smartphone",
    "price": 95000,
    "category": "Phones",
    "inStock": true
}
```





### Update the product by id
```bash
PUT http://localhost:4000/api/products/c59a68a3-ae51-492b-82cd-74fe886d3930/
```
Response:

```200 OK```: product found and updated

```400 Bad Request```: invalid productId (not a UUID)

```404 Not Found```: product not found

##### Body example
```JSON
{
    "name": "Gugle Puxel 18 12/256GB Titanium Black",
    "description": "Wtf",
    "price": 55000,
    "category": "Phones",
    "inStock": false
}
```
##### Response example
```JSON
{
    "id": "c59a68a3-ae51-492b-82cd-74fe886d3930",
    "name": "Gugle Puxel 18 12/256GB Titanium Black",
    "description": "Wtf",
    "price": 55000,
    "category": "Phones",
    "inStock": false
}
```





#### Delete the product by id
```bash
DELETE http://localhost:4000/api/products/c59a68a3-ae51-492b-82cd-74fe886d3930/
```
Response:

```204 No Content```: product found and deleted, content is empty

```400 Bad Request```: invalid productId (not a UUID)

```404 Not Found```: product not found