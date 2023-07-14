import { Schema, Document, model } from 'mongoose';

export enum ReportWork {
  specificAddress = 1,
  notSpecificAddress = 0,
}
export enum EducationLevel{
  Ten = 1,
  twelve =2,
  Diploma =3,
  Bachelor =4,
  Master = 5,
}
export enum IsStartPlanned{
  Yes = 1,
  No = 0,
} 
export enum JobStatus {
  Active = 1,
  Inactive = 0,
}

export interface IJob extends Document {
  
  title:string,
  reportToWork:ReportWork,
  reportAddress:string,
  jobType:string,
  schedule:string,
  isStartPlanned:IsStartPlanned,
  startDate:Date,
  payRange:string,
  min:string,
  max:string,
  perMonth:string,
  supplementalPay:string,
  benefitsOffer:string,
  description:string,
  isCVRequired:Boolean,
  isDeadlineApplicable:Boolean,
  deadlineDate:Date,
  noOfHiring:Number,
  hiringSlot:String,
  aboutCompany:String,
  educationLevel:String,
  yearOfExperience:number,
  status:JobStatus,
  
  createdAt: Date;
  createdBy: Number;
  createdFrom?: String;

  updatedAt: Date;
  updatedBy: Number;
  updateFrom?: String;

  deletedAt: Date;
  deleteBy: Number;
  deleteFrom?: String;
}

const JobSchema: Schema = new Schema({
  title:{type:String},
  reportToWork:{ type: Number, enum: [0, 1], default: 1 },
  reportAddress:{type:String},
  jobType:{type:String},
  schedule:{type:String},
  isStartPlanned:{type: Number, enum: [0, 1], default: 1},
  startDate:{type:Date},
  payRange:{type:String},
  min:{type:String},
  max:{type:String},
  perMonth:{type:String},
  supplementalPay:{type:String},
  benefitsOffer:{type:String},
  description:{type:String},
  isCVRequired:{type:Boolean},
  isDeadlineApplicable:{type:Boolean},
  deadlineDate:{type:Date},
  noOfHiring:{type:Number},
  hiringSlot:{type:String},
  aboutCompany:{type:String},
  educationLevel:{type: Number, enum: [1,2,3,4], default:4 },
  yearOfExperience:{type:Number},
  status:{type:Number,enum:[0,1],default:0},

  createdAt: { type: Date},
  createdBy: { type: Number},
  createdFrom: { type: String },

  updatedAt: { type: Date },
  updatedBy: { type: Number},
  updateFrom: { type: String },

  deletedAt: { type: Date },
  deleteBy: { type: Number},
  deleteFrom: { type: String },
  
});

const Jobs = model<IJob>('Jobs', JobSchema);

export default Jobs;