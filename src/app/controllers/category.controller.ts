import { Request, Response } from "express";

import CategoryService from '@services/category.service'
import Controller from "@libs/controller";
export default class CategoryController extends Controller {

static async  count (req: Request, res: Response) {
    let categoryService=new CategoryService();
    const result = await categoryService.count()
    res.status(result.statusCode).json(result);
}

static async getCategorys(req: Request, res: Response)  {
  let categoryService=new CategoryService();
  const record = await categoryService.list();
  res.status(record.statusCode).json(record);
}

static async getCategory(req: Request, res: Response) {
  let id = req.params.id
  let categoryService=new CategoryService();
  const records = await categoryService.retrieve(id)
  res.status(records.statusCode).json(records);
}

static async createCategory(req: Request, res: Response) {
    const data=req.body
    let categoryService=new CategoryService();
    const result = await categoryService.create(data)
    res.status(result.statusCode).json(result);
}


static  async updateCategory(req: Request, res: Response) {
    const id =req.params.id;
    const data=req.body
    let categoryService=new CategoryService();
    const result = await categoryService.update(id,data)
    res.status(result.statusCode).json(result);
  }

static async deleteCategory(req: Request, res: Response)  {
    let id = req.params.id;
    let categoryService=new CategoryService();
    const result = await categoryService.delete(id)
    res.status(result.statusCode).json(result);
}

static  async datatable(req: Request, res: Response) {
    const data = req.query;
    let categoryService=new CategoryService();
    const records = await categoryService.datatable(data)
    res.status(records.statusCode).json(records);
  }

    static async search(req: Request, res: Response) {
    const query = req.query.q;
    let categoryService=new CategoryService();
    const results = await categoryService.searchCategorys(query);
    res.status(results.statusCode).json(results);
     
  }
}
