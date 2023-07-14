import { Request, Response } from "express";
import StorageService from '@services/storage.service'
import Controller from "@libs/controller";
export default class RoleController extends Controller {

static async  count (req: Request, res: Response) {
    let storageService=new StorageService();
    const result = await storageService.count()
    res.status(result.statusCode).json(result);
}

static async getStorages(req: Request, res: Response)  {
  let storageService=new StorageService();
  const record = await storageService.list()
  res.status(record.statusCode).json(record);
}

static async getStorage(req: Request, res: Response) {
  let id = req.params.id
  let storageService=new StorageService();
  const records = await storageService.retrieve(id)
  res.status(records.statusCode).json(records);
}
static async getStorageByFilename(req: Request, res: Response) {
  let fileName = req.params.fileName
  let storageService=new StorageService();
  const records = await storageService.retrieveByFilename(fileName)
  res.status(records.statusCode).json(records);
}

static async upload(req: Request, res: Response) {
    const file=req.file
    let storageService=new StorageService();
    const result = await storageService.create(file,'document')
    res.status(result.statusCode).json(result);
}

static async delete(req: Request, res: Response)  {
    let id = req.params.id;
    let storageService=new StorageService();
    const result = await storageService.delete(id)
    res.status(result.statusCode).json(result);
}

static  async update(req: Request, res: Response) {
    const id = req.params.id;
    const file=req.file
    let storageService=new StorageService();
    const result = await storageService.update(id,file)
    res.status(result.statusCode).json(result);
  }

static  async datatable(req: Request, res: Response) {
    let storageService=new StorageService();
    const records = await storageService.datatable()
    res.status(records.statusCode).json(records);
  }
}
