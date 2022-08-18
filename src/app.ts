import schema from "./schema";
import GraphQLServer from "./server";

const graphQLServer = new GraphQLServer(schema);

graphQLServer.listen((port: number) => console.log(`http://localhost:${port}/graphql`));
