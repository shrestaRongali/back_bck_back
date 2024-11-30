import { Request, Response, NextFunction } from "express";
import { CustomError } from "@AppErrors/custom-error";
import jwt from 'jsonwebtoken'
import { BadRequestError } from "@AppErrors/bad-request-error";

/**
 * Express middleware for handling errors.
 * @param {Error} err - The error object to be handled.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 */
export const requireAuth = (req: any, _res: Response, next: NextFunction): void => {
    // const validSchema = pick(schema, ['params', 'query', 'body']);

    if(!req.headers.token){
        return next(new BadRequestError("Require authentication"));
    }
    // console.log(req.headers.token.toString())
    let verify = jwt.verify(req.headers.token.toString(),"jgdgtfrtkdjahmnhoj")
    // const object = pick(req, Object.keys(validSchema));
    // const { value, error } = Joi.compile(validSchema)
    //   .prefs({ errors: { label: 'key' } })
    //   .validate(object);

    // if (error) {
    //   const errorMessage = error.details.map((details) => details.message).join(', ');
    //   return next(new BadRequestError(errorMessage));
    // }
    // Object.assign(req.user, verify);

    req.body.user = verify
    return next();
}

