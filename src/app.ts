import { gql } from "apollo-server-express";
import compression from "compression";
import express, { Response } from "express";
import { DocumentNode, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";
const app = express();

//Defines the types 

const typeDefs: DocumentNode = gql`
    type Query {
        hello: String!
        helloWithName(name: String): String
        peopleNumber: Int
    }
`;

//Resolvers
const resolvers = {
    Query: {
        hello: (): string => "Hola a la api de graphql",
        helloWithName: (_: void, args:{name: string}, 
                            context: any, 
                            info: object): string => {
                console.log(info)
                return `Hola ${args.name} `
        },
        peopleNumber: (): number => {
            return 19283
        }
    }
}

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use(compression());

app.use("/", (_,res: Response)=> {
    res.send("Bienvenidos al primer Proyecto");
});

const httpServer = createServer(app);

httpServer.listen({port:process.env.PORT || 3025},()=>{
    console.log("Running successfully server");
});