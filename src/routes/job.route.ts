import express  from "express";

import JobController from '@controllers/job.controller';
import validator from "@middlewares/validator.middleware";
import {createJob,updateJob,deleteJob} from "@validators/job.validator"
const route=express.Router();

route.get('/datatable',JobController.datatable)
route.get('/count',JobController.count)
route.get('/',JobController.getJobs)
route.get('/:id',JobController.getJob)
route.post('/',validator(createJob),JobController.createJob)
route.patch('/:id',validator(updateJob),JobController.updateJob)
route.delete('/:id',validator(deleteJob),JobController.deleteJob)
export default route;

