import {Request,Response,NextFunction} from 'express';

export const notFound=(req:Request,res:Response,next:NextFunction)=>{
    const err=new Error("Not found")
    res.status(404)
    next(err)
}

export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    res.status(404)
    res.json({
        "success": false,
        "statusCode": 404,
        "message": err.message
    })
}
