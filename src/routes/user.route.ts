import express from "express";
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import { UsersResolver } from "@services/user.service";
const route=express.Router();

const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    emitSchemaFile: true,
  });
  return schema;
};

route.use('/', graphqlHTTP(async () => ({
  schema: await getSchema(),
  graphiql: process.env.NODE_ENV === 'development'?true:false,
})));

export default route;
   

