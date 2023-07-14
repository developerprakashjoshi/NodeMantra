import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

const validator = (schema: ObjectSchema<any>) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await schema.validateAsync({ ...req.body, ...req.params });
      req.body = validated;
      next();
    } catch (error: any) {
      if (error.isJoi){
        let message={
            success: false,
            statusCode: 422,
            error
        }
        message.error=error.details.map((msg:any)=>{
          return msg
        })
        return res.status(message.statusCode).json( message);
      }
        
      next(error);
    }
  };
};
export default validator;