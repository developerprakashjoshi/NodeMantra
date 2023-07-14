import express  from "express";
import multer from 'multer';


import UserController from '@controllers/user.controller';
import validator from "@middlewares/validator.middleware";
import {registerUser, updateBasicInfo,updateAddress,updateEducation,updateExperience, updateSkillSets,updateConfirmStatus} from "@validators/user.validator"
const route=express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.get('/search', UserController.search);
route.get('/datatable',UserController.datatable)
route.get('/count',UserController.count)
route.get('/',UserController.getUsers)
route.get('/:id',UserController.getUser)

route.post('/',validator(registerUser),UserController.createUser)
route.patch('/curriculum-vitae/:id',upload.single('file'),UserController.uploadCurriculumVitae)
route.patch('/certificate/:id',upload.single('file'),UserController.uploadCertificate)
route.patch('/avatar/:id',upload.single('file'),UserController.uploadAvatar)
route.patch('/basic-info/:id',validator(updateBasicInfo),UserController.updateBasicInfo)
route.patch('/address/:id',validator(updateAddress),UserController.updateAddress)
route.patch('/education/:id',validator(updateEducation),UserController.updateEducation)
route.patch('/experience/:id',validator(updateExperience),UserController.updateWorkExperience)
route.patch('/skill-sets/:id',validator(updateSkillSets),UserController.updateSkillSets)
route.patch('/confirm-status/:id',validator(updateConfirmStatus),UserController.updateConfirmStatus)
route.patch('/:id',validator(registerUser),UserController.updateUser)
route.delete('/:id',UserController.deleteUser)

export default route;

