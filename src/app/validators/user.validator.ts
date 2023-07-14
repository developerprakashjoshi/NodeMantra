import Joi from 'joi';

interface Address {
    id:string
  street: string;
  country: string;
  state: string;
  city: string;
  postalCode: number;
  type: string;
}

interface Education {
    id:string
  level: string;
  fieldStudy: string;
  schoolName: string;
  board: string;
  passingYear: number;
  state: string;
  city: string;
}

interface Experience {
    id:string
  jobTitle: string;
  companyName: string;
  currentlyWorking: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
}

interface Certificate {
  file: string;
}

export const createAddress = Joi.object<Address>({
  street: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.number().required(),
  type: Joi.string().valid('home','office').required()
}).options({ abortEarly: false });;

export const createEducation = Joi.object<Education>({
  level: Joi.string().required(),
  fieldStudy: Joi.string().required(),
  schoolName: Joi.string().required(),
  board: Joi.string().required(),
  passingYear: Joi.number().required(),
  state: Joi.string().required(),
  city: Joi.string().required()
}).options({ abortEarly: false });

export const createExperience = Joi.object<Experience>({
  jobTitle: Joi.string().required(),
  companyName: Joi.string().required(),
  currentlyWorking: Joi.boolean().required(),
  fromMonth: Joi.string().required(),
  fromYear: Joi.string().required(),
  toMonth: Joi.string().required(),
  toYear: Joi.string().required(),
  description: Joi.string().required()
}).options({ abortEarly: false });

export const createCertificate = Joi.object<Certificate>({
  file: Joi.string().required()
}).options({ abortEarly: false });;

interface User {
    id:String;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsConditions: boolean;
  curriculumVitae: string;
  phoneNo: number;
  addresses: Address[];
  education: Education[];
  experiences: Experience[];
  skillSets: string;
  recommendationSets: string;
  certificates: Certificate[];
  onboardingStep:number;
  type:String;
  isReady: boolean;
  
}

export const registerUser = Joi.object<User>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    termsConditions: Joi.boolean().valid(true).required(),
    type: Joi.string().valid('student').required(),
  }).options({ abortEarly: false });

  export const updateBasicInfo = Joi.object<User>({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNo: Joi.number().optional(),
  }).options({ abortEarly: false });

  export const updateAddress = Joi.object<Address>({
    id: Joi.string().required(),
    street: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.number().required(),
    type: Joi.string().valid('home','office').required()
  }).options({ abortEarly: false });

  export const updateEducation = Joi.object<Education>({
    id: Joi.string().required(),
    level: Joi.string().required(),
    fieldStudy: Joi.string().required(),
    schoolName: Joi.string().required(),
    board: Joi.string().required(),
    passingYear: Joi.number().required(),
    state: Joi.string().required(),
    city: Joi.string().required()
  }).options({ abortEarly: false });

  export const updateExperience = Joi.object<Experience>({
    id: Joi.string().required(),
    jobTitle: Joi.string().required(),
    companyName: Joi.string().required(),
    currentlyWorking: Joi.boolean().required(),
    fromMonth: Joi.string().required(),
    fromYear: Joi.number().required(),
    toMonth: Joi.string().required(),
    toYear: Joi.number().required(),
    description: Joi.string().required()
  }).options({ abortEarly: false });

  export const updateSkillSets = Joi.object<User>({
    id: Joi.string().required(),
    skillSets: Joi.string().required(),
    recommendationSets: Joi.string().required(),
  }).options({ abortEarly: false });
  
  export const updateConfirmStatus = Joi.object<User>({
    id: Joi.string().required()
  }).options({ abortEarly: false });

export const createUser = Joi.object<User>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  termsConditions: Joi.boolean().required(),
  curriculumVitae: Joi.string().required(),
  phoneNo: Joi.number().required(),
  addresses: Joi.array().items(createAddress).required(),
  education: Joi.array().items(createEducation).required(),
  experiences: Joi.array().items(createExperience).required(),
  skillSets: Joi.string().required(),
  recommendationSets: Joi.string().required(),
  certificates: Joi.array().items(createCertificate).required(),
  isReady: Joi.boolean().required()
}).options({ abortEarly: false });
