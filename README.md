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