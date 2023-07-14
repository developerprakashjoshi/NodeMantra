import { EntityTarget,ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from "../config/database";

export default class Service{
    protected AppDataSource;
    constructor(){
       this.AppDataSource=AppDataSource
    }
}
