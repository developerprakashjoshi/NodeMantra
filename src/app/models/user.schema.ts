import mongoose, { Document, Schema } from 'mongoose';

export interface Address {
  street: string;
  country: string;
  state: string;
  city: string;
  postalCode: number;
  type: string;
}

export interface Education {
  level: string;
  fieldStudy: string;
  schoolName: string;
  board: string;
  passingYear: number;
  state: string;
  city: string;
}

export interface Experience {
  jobTitle: string;
  companyName: string;
  currentlyWorking: boolean;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  description: string;
}

export interface Certificate {
  file: string;
}
 interface User extends Document {
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
  isReady: boolean;
  type:Number,
  onboardingStep:number;
  avatar: string;
  deletedAt:Date
}

const addressSchema = new Schema<Address>({
  street: String,
  country: String,
  state: String,
  city: String,
  postalCode: Number,
  type: String,
});

const educationSchema = new Schema<Education>({
  level: String,
  fieldStudy: String,
  schoolName: String,
  board: String,
  passingYear: Number,
  state: String,
  city: String,
});

const experienceSchema = new Schema<Experience>({
  jobTitle: String,
  companyName: String,
  currentlyWorking: Boolean,
  fromMonth: String,
  fromYear: String,
  toMonth: String,
  toYear: String,
  description: String,
});

const certificateSchema = new Schema<Certificate>({
  file: String,
});

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  termsConditions: Boolean,
  curriculumVitae: String,
  phoneNo: Number,
  addresses: [addressSchema],
  education: [educationSchema],
  experiences: [experienceSchema],
  skillSets: String,
  recommendationSets: String,
  certificates: [certificateSchema],
  isReady: Boolean,
  type:String,
  onboardingStep: Number,
  avatar: String,
  deletedAt: Date,
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
