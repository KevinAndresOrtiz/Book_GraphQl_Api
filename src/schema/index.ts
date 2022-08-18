import 'graphql-import-node';
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from './schema.graphql';
import {resolversIndex} from './../resolvers';
const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers: resolversIndex
})

export default schema;