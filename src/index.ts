import "./module-alias";
import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

// import { schema } from './schema';
// import { resolvers } from './resolver';
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => 'Hello, GraphQL!',
//   },
// };

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
  console.log("Connect to production environment");
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
  console.log("Connect to development environment");
}else if (process.env.NODE_ENV === 'stage') {
  dotenv.config({ path: '.env.stage' });
  console.log("Connect to stage environment");
}else{
  console.log("Cannot connect to environment");
}


import AppDataSource from "@config/mongoose";
import roleRoutes from "@routes/role.route";
import storageRoutes from "@routes/storage.route";
import userRoutes from "@routes/user.route";
import { errorHandler, notFound } from "@libs/error.handler";

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

morgan.token("user-type", (req: Request, res: Response) => {
  return req.headers["user-type"] as string;
});

morgan.token("req-body", (req: Request) => {
  return JSON.stringify(req.body);
});

const logFormat =
  ":method :url :status :res[content-length] - :response-time ms\n" +
  "User Type: :user-type\n" +
  "Request Body: :req-body\n";
app.use(morgan(logFormat));


app.get("/api/demo", (req: Request, res: Response) => {
  console.log(req.isAuthenticated());
  const jwtPayload = { id: 1 };
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY || "");
  res.json({ token: token });
});

app.get("/api/test", (req: Request, res: Response) => {
  res.json("test");
});

app.use("/api/v1/role", roleRoutes);
app.use("/api/v1/storage", storageRoutes);
app.use("/api/v1/user",userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Hello from server! server is running",
  });
});
app.use(notFound);
app.use(errorHandler);

// Handle connection events
AppDataSource.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
AppDataSource.once("open",  async() => {
  console.log("Connected to MongoDB");
  // const server = new ApolloServer({ typeDefs, resolvers });
  // await server.start()
  // server.applyMiddleware({ app });
  app.listen(process.env.APP_PORT,async () => {
    console.log(
      `Server started with port ${process.env.APP_HOST}:${process.env.APP_PORT}`
    );
  });
});
