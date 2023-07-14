import express  from "express";

import RoleController from '@controllers/role.controller';
import validator from "@middlewares/validator.middleware";
import {createRole,updateRole,deleteRole} from "@validators/role.validator"
const route=express.Router();

route.get('/search', RoleController.search);
route.get('/datatable',RoleController.datatable)
route.get('/count',RoleController.count)
route.get('/',RoleController.getRoles)
route.get('/:id',RoleController.getRole)
route.post('/',validator(createRole),RoleController.createRole)
route.patch('/:id',validator(updateRole),RoleController.updateRole)
route.delete('/:id',validator(deleteRole),RoleController.deleteRole)

export default route;

