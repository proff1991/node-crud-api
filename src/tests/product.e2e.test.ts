import test from "node:test";
import assert from "node:assert";
import { makeFastifyApp } from "../modules/app";

test("CRUD flow (full scenario)", async () => {
  var app = makeFastifyApp();

  // 1. GET all → []
  var res = await app.inject({
    method: "GET",
    url: "/api/products",
  });

  assert.strictEqual(res.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(res.body), []);

  // 2. CREATE
  var product = {
    name: "iPhone",
    description: "Phone",
    price: 1000,
    category: "electronics",
    inStock: true,
  };

  res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: product,
  });

  assert.strictEqual(res.statusCode, 201);

  var created = JSON.parse(res.body);
  assert.ok(created.id);

  // 3. GET by id
  res = await app.inject({
    method: "GET",
    url: `/api/products/${created.id}`,
  });

  assert.strictEqual(res.statusCode, 200);

  var fetched = JSON.parse(res.body);
  assert.strictEqual(fetched.id, created.id);

  // 4. UPDATE (PUT)
  var updatedProduct = {
    name: "iPhone 15",
    description: "Updated phone",
    price: 1200,
    category: "electronics",
    inStock: false,
  };

  res = await app.inject({
    method: "PUT",
    url: `/api/products/${created.id}`,
    payload: updatedProduct,
  });

  assert.strictEqual(res.statusCode, 200);

  var updated = JSON.parse(res.body);
  assert.strictEqual(updated.name, "iPhone 15");
  assert.strictEqual(updated.inStock, false);

  // 5. DELETE
  res = await app.inject({
    method: "DELETE",
    url: `/api/products/${created.id}`,
  });

  assert.strictEqual(res.statusCode, 204);

  // 6. GET deleted → 404
  res = await app.inject({
    method: "GET",
    url: `/api/products/${created.id}`,
  });

  assert.strictEqual(res.statusCode, 404);

  await app.close();
});

test("invalid UUID returns 400", async () => {
  var app = makeFastifyApp();

  var res = await app.inject({
    method: "GET",
    url: "/api/products/123",
  });

  assert.strictEqual(res.statusCode, 400);

  await app.close();
});

test("validation error on POST returns 400", async () => {
  var app = makeFastifyApp();

  var res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "", // invalid
      description: "desc",
      price: -10,
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  await app.close();
});

test("validation: description invalid types", async () => {
  var app = makeFastifyApp();

  // wrong description, empty string
  var res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: "",
      price: 100,
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  // wrong description, number
  res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: 123,
      price: 100,
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  await app.close();
});

test("validation: price invalid types", async () => {
  var app = makeFastifyApp();

  // wrong "price", string
  var res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: "desc",
      price: "100",
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  // wrong "price", negative number
  res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: "desc",
      price: -5,
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  await app.close();
});

test("validation: inStock invalid types", async () => {
  var app = makeFastifyApp();

  // wrong "inStock", type string
  var res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: "desc",
      price: 100,
      category: "electronics",
      inStock: "true",
    },
  });

  assert.strictEqual(res.statusCode, 400);

  // число вместо boolean
  res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: "desc",
      price: 100,
      category: "electronics",
      inStock: 1,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  await app.close();
});

test("validation: missing required fields", async () => {
  var app = makeFastifyApp();

  // no name
  var res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      description: "desc",
      price: 100,
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  // no price
  res = await app.inject({
    method: "POST",
    url: "/api/products",
    payload: {
      name: "Test",
      description: "desc",
      category: "electronics",
      inStock: true,
    },
  });

  assert.strictEqual(res.statusCode, 400);

  await app.close();
});