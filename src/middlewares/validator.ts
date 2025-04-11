import type { Request, Response, NextFunction } from "express";
import { HttpException } from "#utils/http-exception.ts";
import Joi from "joi";

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  message: string;
  errors: ValidationError[];
}

// Define generic type for the schema parameter
type JoiSchema = Joi.ObjectSchema | Joi.ArraySchema;

const validateRequest = (schema: JoiSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Create a new object with separate keys for query, body, and params
    req.allParams = {
      ...(Object.entries(req.query).length > 0 && { query: req.query }),
      ...(Object.entries(req.body).length > 0 && { body: req.body }),
      ...(Object.entries(req.params).length > 0 && { params: req.params }),
    };

    // Validate the constructed object using the provided Joi schema
    const { error, value } = schema.validate(req.allParams, {
      abortEarly: false,
    });

    if (error) {
      const response: ValidationResult = {
        message: "Validation failed",
        errors: error.details.map((err: Joi.ValidationErrorItem) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };

      const validationError = new HttpException(
        400,
        JSON.stringify(response),
        "VALIDATION_ERROR",
      );

      return res.formattedError(validationError);
    }

    // Use the validated (and possibly sanitized) values
    req.allParams = value;
    next();
  };
};

export default validateRequest;
