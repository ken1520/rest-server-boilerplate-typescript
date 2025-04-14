# RESTful API Server Boilerplate - Typescript

A RESTful API server boilerplate built with TypeScript, Express and Mongoose that provides endpoints.

## System Requirements

- **Node.js** version 23.6.0 or later
- **npm** (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ken1520/rest-server-boilerplate-typescript.git
cd rest-server-boilerplate-typescript
```

2. Install dependencies:

```bash
npm ci
```

## Running the App

```bash
# In production mode
npm run start

# In development mode
npm run dev
```

## Configuration

### Environment Variables

The application uses a `.env` file to manage environment variables. You can create a `.env` file by copying from the `.env.example` in the root directory to customize settings without changing the code.

```bash
# create a .env file
cp .env.example .env

# You can customize the settings in .env but NOT recommended
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

| Variable    | Description                             | Example Values           |
| ----------- | --------------------------------------- | ------------------------ |
| `PORT`      | Port number for the server to listen on | 3000, 8080, 5000         |
| `NODE_ENV`  | Environment mode                        | development, production  |
| `LOG_LEVEL` | Logging verbosity level                 | info, debug, warn, error |

### API Routes & Middlewares

#### Routes

Follow the pattern if you would like to add a route:

```
HTTP_METHOD URI Middlewares Controller.action
```

Do it in the `./src/config/paths.ts` file.

#### Middleware

You can add multiple middleware functions for each routes. Make sure you put the middleware functions in the `./src/middlewares/` folder.

For example:

```typescript
"GET /users foo bar hello users.index";
```

Make sure your middleware module exports a default function ONLY.

For example:

```typescript
import type { Request, Response, NextFunction } from "express";

const hello = (req: Request, res: Response, next: NextFunction) => {
  console.log("hello world");

  next();
};

export default hello;
```

### Validation

There is a generic validating function using [Joi](https://github.com/hapijs/joi) in this project. Add the key word **`validate`** to the middleware part of the routes where validation needed first.

For example:

```typescript
const routes: string[] = ["GET /users validate users.index"];
```

Then, name the [Joi schema](https://joi.dev/api/?v=17.13.3#general-usage) same with your controller action and name the file same with your controller.

Put the file into the `./src/validations` and name it as `{CONTROLLER_NAME}.validator.ts`

Let's take the above `/users` route as an example. The schema should look like:

```typescript
// ./src/validations/users.validator.ts
import Joi from "joi";

export const index = Joi.object({
  query: Joi.object().keys({
    sortBy: Joi.string(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
});
```

## Acknowledgements

This project was inspired by and builds upon ideas from the [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate) and [shoplineapp/sl-express](https://github.com/shoplineapp/sl-express) repository. Special thanks to the authors for their excellent work, which guided the structure and design of this project.
