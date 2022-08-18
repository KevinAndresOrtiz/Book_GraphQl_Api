import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
import compression from "compression";
import express,{ Application, Response } from "express";
import { GraphQLSchema } from "graphql";
import { createServer, Server } from "http";

export default class GraphQLServer {
    //Properties
    private app!: Application;
    private httpServer!: Server;
    private readonly DEFAULT_PORT = 3025;
    constructor(private schema: GraphQLSchema){
        if(schema === undefined){
            throw new Error("Necesitamos un schema de graphql para trabajar con Api Graphql")
        }
        this.init();
    }

    private init(){
        this.configExpress();
        this.configApolloServerExpress();
        this.configRoutes();
    }

    private configExpress(){
        this.app = express();
        this.app.use(compression());
        this.httpServer = createServer(this.app);
    
    
    }

    private async configApolloServerExpress(){

        const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
            schema:this.schema,
            introspection: true
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({
            app: this.app,
            cors: true
        })
    }

    private configRoutes(){
        this.app.get("/", (_, res: Response) => {
            res.redirect("/graphql");
    
        });
    
        this.app.use("/welcome", (_,res: Response)=> {
            res.send("Bienvenidos al primer Proyecto");
        });
    
    
    }

    listen(callback: (port: number)=>void): void {
        this.httpServer.listen(+this.DEFAULT_PORT,() => {
            callback(+this.DEFAULT_PORT)
        })
    }

}