import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
import compression from "compression";
import express,{ Application } from "express";
import { DocumentNode, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { Server } from "http";

export default class GraphQLServer {
    //Properties
    private app!: Application;
    private httpServer!: Server;
    private readonly DEFAULT_PORT = 3025;

    constructor(){
        this.init();
    }

    private init(){
        this.configExpress();
        this.configApolloServerExpress();
        this.configRoutes();
    }

    private configExpress(){
        const app = express();
        app.use(compression());
    
    
    }

    private async configApolloServerExpress(){
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

        const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
            schema,
            introspection: true
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({
            app: this.app,
            cors: true
        })
    }

    private configRoutes(){}

    listen(callback: (port: number)=>void): void {
        this.httpServer.listen(+this.DEFAULT_PORT,() => {
            callback(+this.DEFAULT_PORT)
        })
    }

}