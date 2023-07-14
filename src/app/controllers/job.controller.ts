import { Request, Response } from "express";

import JobService from '@services/job.service'
import Controller from "@libs/controller";
import { ObjectId } from 'mongodb';

export default class JobController extends Controller {

  static async count(req: Request, res: Response) {
    let jobService = new JobService();
    const result = await jobService.count()
    res.status(result.statusCode).json(result);
  }

  static async getJobs(req: Request, res: Response) {
    let jobService = new JobService();
    const record = await jobService.list()
    res.status(record.statusCode).json(record);
  }

  static async getJob(req: Request, res: Response) {
    let id = req.params.id
    let jobService = new JobService();
    const records = await jobService.retrieve(id)
    res.status(records.statusCode).json(records);
  }

  static async createJob(req: Request, res: Response) {
    const data = req.body
    let jobService = new JobService();
    const result = await jobService.create(data)
    res.status(result.statusCode).json(result);
  }


  static async updateJob(req: Request, res: Response) {
    const id = req.params.id
    const data = req.body
    let jobService = new JobService();
    const result = await jobService.update(id, data)
    res.status(result.statusCode).json(result);
  }

  static async deleteJob(req: Request, res: Response) {
    let id = req.params.id
    const data = req.body;
    let jobService = new JobService();
    const result = await jobService.delete(id, data)
    res.status(result.statusCode).json(result);
  }

  static async datatable(req: Request, res: Response) {
    const data = req.query
    let jobService = new JobService();
    const records = await jobService.datatable(data)
    res.status(records.statusCode).json(records);
  }
}
