import  Storage  from "@models/storage.schema";
import Service from "@libs/service";
import Response from "@libs/response"
import AppDataSource from "@config/mongoose";
import * as AWS from 'aws-sdk';
import { ObjectId} from 'mongodb';

// Define the AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,

});

export default class StorageService extends Service {
  private storageModel:any;
  constructor() {
    super()
    this.storageModel = Storage;
  }
  async count():Promise<Response<any[]>> {
    try {
        const result = await this.storageModel.count()
        if(!result) {
          return new Response<any[]>(true, 200, "Record not available", result);
        }
        return new Response<any[]>(true,200, "Count operation successful",result);
      } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async list():Promise<Response<any[]>> {
    try {
      const record = await this.storageModel.find()
      if(!record) {
        return new Response<any[]>(true, 200, "Record not available", record);
      }
      return new Response<any[]>(true,200, "Read operation successful",record);
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async retrieve(pid: string):Promise<Response<any[]>> {
    try {
      const isValidObjectId = ObjectId.isValid(pid);
      if (!isValidObjectId) {
        return new Response<any[]>(false, 400, "Invalid ObjectId", undefined);
      }
      let id=new ObjectId(pid);
      const records = await this.storageModel.findOne(id);
      if (!records) {
        return new Response<any[]>(true, 200, "Record not available", records);
      }
      return new Response<any[]>(true,200, "Read operation successful",records);
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async retrieveByFilename(fileName: string):Promise<Response<any[]>> {
    try {
      const records = await this.storageModel.findOne({ where: { name: fileName } });
      const params = {
        Bucket: process.env.AWS_BUCKET || '',
        Key: fileName,
      };
      return new Promise((resolve, reject) => {
        s3.getObject(params, (err: any, response: any) => {
          if (err) {
            console.error(err);
            reject(err)
          } else {
            // res.setHeader('Content-Type', data.ContentType);
            // res.send(data.Body);
            resolve(response.Body)
          }
        })
      })
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async create(file: any, directoryname: string):Promise<Response<any[]>> {
    try {
      // Get the file content and name from the request
      const fileContent = file.buffer;
      const fileName = directoryname + "/" + file.originalname;
      const name = file.originalname;
      const params = {
        Bucket: process.env.AWS_BUCKET || '',
        Key: fileName,
        Body: fileContent,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, async (err: any, response: any) => {
          if (err) {
            console.error(err);
            reject (new Response<any[]>(false, 500, "Storage Server Error", err))
          } else {
            console.log(`File uploaded successfully. ${response.Location}`);
            const storage = new Storage();
            storage.name = name;
            storage.path = response.Location;
            const result:any = await storage.save();
            resolve (new Response<any[]>(true, 200, "Storage operation successful", result))
          }
        });
      })
      
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async createFromBuffer(buffer: any, directoryname: string, file: string):Promise<Response<any[]>> {
    try {
      // Get the file content and name from the request
      const fileContent = buffer;
      const fileName = directoryname + "/" + file;
      const name = file;
      const params = {
        Bucket: process.env.AWS_BUCKET || '',
        Key: fileName,
        Body: fileContent,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, async (err: any, response: any) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(`File uploaded successfully. ${response.Location}`);
            const storage = new Storage();
            storage.name = name;
            storage.path = response.Location;
            const result:any = await storage.save();
            resolve(new Response<any[]>(true, 200, "Storage operation successful", result));
          }
        });
      })
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async update(pid: string, data: any):Promise<Response<any[]>> {
    const fileContent = data.buffer;
    const fileName = data.originalname;
    const isValidObjectId = ObjectId.isValid(pid);
    if (!isValidObjectId) {
      return new Response<any[]>(false, 400, "Invalid ObjectId", undefined);
    }
    let id=new ObjectId(pid);
    const role = await this.storageModel.findOneBy(id);
    if(!role){
      return new Response<any[]>(true, 200, "Record not available", role);
    }
    const params = {
      Bucket: 'codegify',
      Key: fileName,
      Body: fileContent,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, async (err: any, response: any) => {
        if (err) {
          console.error(err);
          reject (new Response<any[]>(false, 500, "Storage Server Error", err))
        } else {
          try {
            console.log(`File upldated successfully. ${response.Location}`);
            const storage = await this.storageModel.findOneOrFail( id )
            storage.name = fileName;
            storage.path = response.Location;
            const result = await this.storageModel.save(storage)
            resolve (new Response<any[]>(true, 200, "Storage operation successful", result))
          } catch (error) {
            reject (new Response<any[]>(false, 500, "Storage Server Error", err))
          }
        }
      })
    })
  }

  async delete(pid: string):Promise<Response<any[]>> {
    try {
      let id=new ObjectId(pid);
      const storage = await this.storageModel.findOneOrFail(id )
      const params = {
        Bucket: 'codegify',
        Key: storage.name,
      };
      return new Promise((resolve, reject) => {
        s3.deleteObject(params, async (err: any, response: any) => {
          if (err) {
            console.error(err);
            reject(err)
          } else {
            console.log(`File deleted successfully. ${response.Location}`);
            const result = await this.storageModel.delete(id);
            resolve(result)
          }
        })
      })
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }

  async datatable():Promise<Response<any[]>> {
    try {
      const records = await this.storageModel.find({
        order: {
          id: "DESC",
        },
        skip: 0,
        take: 10,
      });
      return records
    } catch (error:any) {
        return new Response<any[]>(false,500, "Internal Server Error", undefined, undefined,error.message);
      }
  }
}