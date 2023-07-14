import { Request, Response } from "express";

import RoleService from '@services/role.service'
import Controller from "@libs/controller";
export default class RoleController extends Controller {

static async  count (req: Request, res: Response) {
    let roleService=new RoleService();
    const result = await roleService.count()
    res.status(result.statusCode).json(result);
}

static async getRoles(req: Request, res: Response)  {
  let roleService=new RoleService();
  const record = await roleService.list();
  res.status(record.statusCode).json(record);
}

static async getRole(req: Request, res: Response) {
  let id = req.params.id
  let roleService=new RoleService();
  const records = await roleService.retrieve(id)
  res.status(records.statusCode).json(records);
}

static async createRole(req: Request, res: Response) {
    const data=req.body
    let roleService=new RoleService();
    const result = await roleService.create(data)
    res.status(result.statusCode).json(result);
}


static  async updateRole(req: Request, res: Response) {
    const id =req.params.id;
    const data=req.body
    let roleService=new RoleService();
    const result = await roleService.update(id,data)
    res.status(result.statusCode).json(result);
  }

static async deleteRole(req: Request, res: Response)  {
    let id = req.params.id;
    let roleService=new RoleService();
    const result = await roleService.delete(id)
    res.status(result.statusCode).json(result);
}

static  async datatable(req: Request, res: Response) {
    const data = req.query;
    let roleService=new RoleService();
    const records = await roleService.datatable(data)
    res.status(records.statusCode).json(records);
  }

    static async search(req: Request, res: Response) {
    const query = req.query.q;
    let roleService=new RoleService();
    const results = await roleService.searchRoles(query);
    res.status(results.statusCode).json(results);
     
  }
}
