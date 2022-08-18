import { IResolvers } from "@graphql-tools/utils";

const queryResolvers: IResolvers = {
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

export default queryResolvers