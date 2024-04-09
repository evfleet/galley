import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export function validate(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      res.locals = schema.parse(req.body);

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.errors.map(({ message, code, path }) => {
          return {
            message,
            code,
            field: path.join("."),
          };
        });

        return res.status(400).json({
          message: "Validation error",
          errors,
        });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
