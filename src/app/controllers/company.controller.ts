import { Request, Response } from "express";

import CompanyService from '@services/company.service'
import Controller from "@libs/controller";
import StorageService from '@services/storage.service'

export default class CompanyController extends Controller {

  static async count(req: Request, res: Response) {
    let companyService = new CompanyService();
    const result = await companyService.count()
    res.status(result.statusCode).json(result);
  }

  static async getCompanies(req: Request, res: Response) {
    let companyService = new CompanyService();
    const record = await companyService.list()
    res.status(record.statusCode).json(record);
  }

  static async getCompany(req: Request, res: Response) {
    let id = req.params.id
    let companyService = new CompanyService();
    const records = await companyService.retrieve(id)
    res.status(records.statusCode).json(records);
  }

  static async createCompany(req: Request, res: Response) {
    const data = req.body
    let companyService = new CompanyService();
    const result = await companyService.create(data)
    res.status(result.statusCode).json(result);
  }

  static async uploadCompanyLogo(req: Request, res: Response) {
    const file=req.file
  let storageService=new StorageService();
  const result:any = await storageService.create(file,'document')
  const path = result.data.path;
  let companyService = new CompanyService();
  const id = req.params.id;
  const company = await companyService.uploadCompanyLogo(id,path);
  res.status(company.statusCode).json(company);
  }

  static async uploadCeoAvtar(req: Request, res: Response) {
    const file=req.file
  let storageService=new StorageService();
  const result:any = await storageService.create(file,'document')
  const path = result.data.path;
  let companyService = new CompanyService();
  const id = req.params.id;
  const company = await companyService.uploadCeoAvtar(id,path);
  res.status(company.statusCode).json(company);
  }

  static async uploadPhoto(req: Request, res: Response) {
    const file=req.file
  let storageService=new StorageService();
  const result:any = await storageService.create(file,'document')
  const path = result.data.path;
  let companyService = new CompanyService();
  const id = req.params.id;
  const company = await companyService.uploadPhoto(id,path);
  res.status(company.statusCode).json(company);
  }


  static async updateCompany(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body
    let companyService = new CompanyService();
    const result = await companyService.update(id, data)
    res.status(result.statusCode).json(result);
  }

  static async deleteCompany(req: Request, res: Response) {
    let id = req.params.id;
    const data = req.body;
    let companyService = new CompanyService();
    const result = await companyService.delete(id, data)
    res.status(result.statusCode).json(result);
  }

  
  static async datatable(req: Request, res: Response) {
    const data = req.query;
    let companyService = new CompanyService();
    const records = await companyService.datatable(data)
    res.status(records.statusCode).json(records);
  }
}
