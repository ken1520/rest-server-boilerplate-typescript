import paths from "#config/paths.ts";
import logger from "#config/logger.ts";
import express from "express";
import type { Router, RequestHandler } from "express";
import validateRequest from "#middlewares/validator.ts";

const router: Router = express.Router();

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options";

paths.forEach(async (path: string) => {
  const tokens = path.split(" ");

  // Ensure we have at least method, route, controller.action (3 tokens)
  if (tokens.length < 3) {
    logger.error(`Invalid path format for: '${path}'`);
    return;
  }

  const method = tokens[0].toLowerCase() as Lowercase<HttpMethod>;
  const route = tokens[1];
  const controllerWithAction = tokens[tokens.length - 1];

  // Extract controller and action names
  const controller = controllerWithAction.split(".")[0];
  const controllerName = `${controller}.controller`;

  const actionName = controllerWithAction.split(".")[1];

  // Middlewares (if any) are any tokens between the route and controller tokens
  const middlewareNames = tokens.slice(2, tokens.length - 1);

  try {
    const targetController = await import(`#controllers/${controllerName}.ts`);

    if (!router[method]) {
      throw new Error(`Unsupported method '${method}' for path '${path}'`);
    }

    if (!targetController) {
      throw new Error(`Cannot load controller ${controllerName}`);
    }

    if (!targetController[actionName]) {
      throw new Error(
        `Cannot load controller action ${controllerName}.${actionName}`,
      );
    }

    // Load middleware functions if any are specified
    const middlewareFns = middlewareNames.map(async (mwName: string) => {
      // Handle validation middleware
      if (mwName === "validate") {
        try {
          const schema = await import(
            `#validations/${controller}.validator.ts`
          );
          return validateRequest(schema[actionName]);
        } catch (schemaErr) {
          logger.error(
            `Validation schema not found for ${controllerName}.${actionName} (skipping validation)`,
          );
          return (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction,
          ) => next();
        }
      }

      // Load regular middleware
      try {
        const mw: RequestHandler = await import(`.#middlewares/${mwName}.ts`);
        if (typeof mw !== "function") {
          throw new Error(`Middleware '${mwName}' is not a function`);
        }
        return mw;
      } catch (mwErr) {
        logger.error(`Failed to load middleware '${mwName}': ${mwErr}`);
        return (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction,
        ) => next();
      }
    });

    // Await resolution of all middleware functions
    const resolvedMiddlewares = await Promise.all(middlewareFns);

    // Register the routes
    router[method](route, ...resolvedMiddlewares, targetController[actionName]);

    logger.info(`Registered route: ${method.toUpperCase()} ${route}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Path error for '${path}': ${error.message}`);
    } else {
      logger.error(`Unknown error configuring route '${path}'`);
    }
  }
});

export default router;
