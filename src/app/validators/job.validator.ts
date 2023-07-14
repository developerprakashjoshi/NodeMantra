import Joi from 'joi'

export const createJob=Joi.object({
    title:Joi.string().required(),
    reportToWork:Joi.number().required(),
    reportAddress:Joi.string().required(),
    jobType:Joi.string().required(),
    schedule:Joi.string().required(),
    isStartPlanned:Joi.number().required(),
    startDate:Joi.date().required(),
    payRange:Joi.string().required(),
    min:Joi.string().required(),
    max:Joi.string().required(),
    perMonth:Joi.string().required(),
    supplementalPay:Joi.string().required(),
    benefitsOffer:Joi.string().required(),
    description:Joi.string().required(),
    isCVRequired:Joi.boolean().required(),
    isDeadlineApplicable:Joi.boolean().required(),
    deadlineDate:Joi.date().required(),
    noOfHiring:Joi.number().required(),
    hiringSlot:Joi.string().required(),
    aboutCompany:Joi.string().required(),
    educationLevel:Joi.number().required(),
    yearOfExperience:Joi.number().required(),
    createdBy:Joi.number().required(),
    status:Joi.number().required(),


}).options({ abortEarly: false })

export const updateJob=Joi.object({
    id:Joi.string().required(),
    title:Joi.string().required(),
    reportToWork:Joi.number().optional(),
    reportAddress:Joi.string().optional(),
    jobType:Joi.string().optional(),
    schedule:Joi.string().optional(),
    isStartPlanned:Joi.number().optional(),
    startDate:Joi.date().optional(),
    payRange:Joi.string().optional(),
    min:Joi.string().optional(),
    max:Joi.string().optional(),
    perMonth:Joi.string().optional(),
    supplementalPay:Joi.string().optional(),
    benefitsOffer:Joi.string().optional(),
    description:Joi.string().optional(),
    isCVRequired:Joi.boolean().optional(),
    isDeadlineApplicable:Joi.boolean().optional(),
    deadlineDate:Joi.date().optional(),
    noOfHiring:Joi.number().optional(),
    hiringSlot:Joi.string().optional(),
    aboutCompany:Joi.string().optional(),
    educationLevel:Joi.number().optional(),
    yearOfExperience:Joi.number().optional(),
    updatedBy:Joi.number().required(),
}).options({ abortEarly: false })

export const deleteJob=Joi.object({
    id:Joi.string().required(),
    delete_by:Joi.number().required()
})