import { Request, Response } from "express";

import UserService from '@services/user.service'
import StorageService from '@services/storage.service'
import Controller from "@libs/controller";
export default class UserController extends Controller {

static async  count (req: Request, res: Response) {
    let userService=new UserService();
    const result = await userService.count()
    res.status(result.statusCode).json(result);
}

static async getUsers(req: Request, res: Response)  {
  let userService=new UserService();
  const record = await userService.list();
  res.status(record.statusCode).json(record);
}

static async getUser(req: Request, res: Response) {
  let id = req.params.id
  let userService=new UserService();
  const records = await userService.retrieve(id)
  res.status(records.statusCode).json(records);
}

static async createUser(req: Request, res: Response) {
    const data=req.body
    let userService=new UserService();
    const result = await userService.create(data)
    res.status(result.statusCode).json(result);
}

static async uploadCurriculumVitae(req: Request, res: Response) {
  const file=req.file
  let storageService=new StorageService();
  const result:any = await storageService.create(file,'document')
  console.log(result);
  const path = result.data.path;
  let userService = new UserService();
  const id = req.params.id;
  const user = await userService.updateCurriculumVitae(id,path);
  res.status(user.statusCode).json(user);
}
static async uploadCertificate(req: Request, res: Response) {
  const file=req.file
  let storageService=new StorageService();
  const result:any = await storageService.create(file,'document')
  const path = result.data.path;
  let userService = new UserService();
  const id = req.params.id;
  const user = await userService.updateCertificate(id,path);
  res.status(user.statusCode).json(user);
}

static async uploadAvatar(req: Request, res: Response) {
  const file=req.file
  let storageService=new StorageService();
  const result:any = await storageService.create(file,'document')
  const path = result.data.path;
  let userService = new UserService();
  const id = req.params.id;
  const user = await userService.updateAvatar(id,path);
  res.status(user.statusCode).json(user);
}
static  async updateBasicInfo(req: Request, res: Response) {
  const id =req.params.id;
  const data=req.body
  let userService=new UserService();
  const result = await userService.updateBasicInfo(id,data)
  res.status(result.statusCode).json(result);
}
static  async updateAddress(req: Request, res: Response) {
  const id =req.params.id;
  const data=req.body
  let userService=new UserService();
  const result = await userService.updateAddress(id,data)
  res.status(result.statusCode).json(result);
}
static  async updateEducation(req: Request, res: Response) {
  const id =req.params.id;
  const data=req.body
  let userService=new UserService();
  const result = await userService.updateEducation(id,data)
  res.status(result.statusCode).json(result);
}

static  async updateWorkExperience(req: Request, res: Response) {
  const id =req.params.id;
  const data=req.body
  let userService=new UserService();
  const result = await userService.updateWorkExperience(id,data)
  res.status(result.statusCode).json(result);
}

static  async updateSkillSets(req: Request, res: Response) {
  const id =req.params.id;
  const data=req.body
  let userService=new UserService();
  const result = await userService.updateSkillSets(id,data)
  res.status(result.statusCode).json(result);
}
static  async updateConfirmStatus(req: Request, res: Response) {
  const id =req.params.id;
  const data=req.body
  let userService=new UserService();
  const result = await userService.updateConfirmStatus(id,data)
  res.status(result.statusCode).json(result);
}

static  async updateUser(req: Request, res: Response) {
    const id =req.params.id;
    const data=req.body
    let userService=new UserService();
    const result = await userService.update(id,data)
    res.status(result.statusCode).json(result);
}

static async deleteUser(req: Request, res: Response)  {
    let id = req.params.id;
    let userService=new UserService();
    const result = await userService.delete(id)
    res.status(result.statusCode).json(result);
}

static  async datatable(req: Request, res: Response) {
    const data = req.query;
    let userService=new UserService();
    const records = await userService.datatable(data)
    res.status(records.statusCode).json(records);
  }

    static async search(req: Request, res: Response) {
    const query = req.query.q;
    let userService=new UserService();
    const results = await userService.searchUsers(query);
    res.status(results.statusCode).json(results);
     
  }
}
