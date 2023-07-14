import { Request, Response, NextFunction } from "express";
import session, { Store } from 'express-session';
import pgSession from 'connect-pg-simple';
import { Pool } from 'pg';

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'adminjs',
  password: '',
  port: 5432,
});

const pgSessionStore = new (pgSession(session))({
  pool: pool,
  tableName: 'session',
});

const sessionMiddleware = (req:Request,res:Response,next:NextFunction) => {
    return session({
        store: pgSessionStore,
        secret: '11a5e473653ae07ef6742ab95d4c09681e093930e77da',
        resave: false,
        saveUninitialized: false,
    })(req,res,next)
}

export default sessionMiddleware