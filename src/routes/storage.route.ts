import express  from "express";
import StorageController from '@controllers/storage.controller';
import validator from "@middlewares/validator.middleware";
import {createRole,updateRole,deleteRole} from "@validators/role.validator"

import multer from 'multer';
const route=express.Router();
// Define file upload storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.get('/datatable',StorageController.datatable)
route.get('/count',StorageController.count)
route.get('/',StorageController.getStorages)
route.get('/:id',StorageController.getStorage)
route.get('/:fileName',StorageController.getStorageByFilename)
route.post('/',upload.single('file'),StorageController.upload)
route.patch('/:id',upload.single('file'),StorageController.update)
route.delete('/:id',StorageController.delete)
export default route;

