import { Request, Response as ExpressResponse,NextFunction,  } from 'express';
interface ApiResponse<T> {
    success: boolean;
    statusCode: number,
    message: string;
    data?: T;
    count?:number;
    error?:string
  }
  
 export default class Response<T> implements ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    count?: number;
    error?: string | undefined;
  
    constructor(success: boolean,statusCode: number, message: string, data?: T, count?: number, error?: string) {
      this.success = success;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.count = count;
      this.error = error;
    }
  }