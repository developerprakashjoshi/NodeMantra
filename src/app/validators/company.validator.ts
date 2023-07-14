import Joi from 'joi'

export const createCompany=Joi.object({
    name:Joi.string().required(),
    logo:Joi.string().required(),
    size:Joi.number().required(),
    industry:Joi.string().required(),
    ceo:Joi.string().required(),
    ceoAvatar:Joi.string().required(),
    yearOfEstd:Joi.number().required(),
    revenue:Joi.number().required(),
    website:Joi.string().required(),
    description:Joi.string().required(),
    location:Joi.string().required(),
    photos: Joi.array().items(Joi.string()).required(),
    createdBy:Joi.number().required(),
    // created_by:Joi.number().required(),

}).options({ abortEarly: false })

export const updateCompany=Joi.object({
    id:Joi.string().required(),
    name:Joi.string().optional(),
    size:Joi.string().optional(),
    industry:Joi.string().optional(),
    ceo:Joi.string().optional(),
    yearOfEstd:Joi.number().optional(),
    revenue:Joi.number().optional(),
    website:Joi.string().optional(),
    opportunity:Joi.string().optional(),
    // created_by:Joi.number().optional(),
}).options({ abortEarly: false })

export const deleteCompany=Joi.object({
    id:Joi.string().required(),
    deleteBy:Joi.number().required(),
})