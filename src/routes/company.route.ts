import express  from "express";

import CompanyController from '@controllers/company.controller';
import validator from "@middlewares/validator.middleware";

import multer from 'multer';

const storage = multer.memoryStorage();
import {createCompany,updateCompany,deleteCompany} from "@validators/company.validator"
const route=express.Router();
const upload = multer({ storage });

route.get('/datatable',CompanyController.datatable)
route.get('/count',CompanyController.count)
route.get('/',CompanyController.getCompanies)
route.get('/:id',CompanyController.getCompany)
route.post('/',validator(createCompany),CompanyController.createCompany)
route.patch('/ceo-avtar/:id',upload.single('file'),CompanyController.uploadCeoAvtar)
route.patch('/logo/:id',upload.single('file'),CompanyController.uploadCompanyLogo)
route.patch('/photo/:id',upload.single('file'),CompanyController.uploadPhoto)
route.patch('/:id',validator(updateCompany),CompanyController.updateCompany)
route.delete('/:id',validator(deleteCompany),CompanyController.deleteCompany)
export default route;

