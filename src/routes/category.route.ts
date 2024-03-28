import express  from "express";

import CategoryController from '@controllers/category.controller';
import validator from "@middlewares/validator.middleware";
import {createCategory,updateCategory,deleteCategory} from "@validators/category.validator"
const route=express.Router();

route.get('/search', CategoryController.search);
route.get('/datatable',CategoryController.datatable)
route.get('/count',CategoryController.count)
route.get('/',CategoryController.getCategorys)
route.get('/:id',CategoryController.getCategory)
route.post('/',validator(createCategory),CategoryController.createCategory)
route.patch('/:id',validator(updateCategory),CategoryController.updateCategory)
route.delete('/:id',validator(deleteCategory),CategoryController.deleteCategory)

export default route;

