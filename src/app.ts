import { ApolloServer, ExpressContext, gql } from "apollo-server-express";
import compression from "compression";
import express, { Response } from "express";
import { DocumentNode, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";

async function start(){

    app.get("/", (_, res: Response) => {
        res.redirect("/graphql");

    });

    app.use("/", (_,res: Response)=> {
        res.send("Bienvenidos al primer Proyecto");
    });


    const httpServer = createServer(app);

    httpServer.listen({port:process.env.PORT || 3025},()=>{
        console.log("Running successfully server");
    });
}

start();