import { ApolloServer, gql } from "apollo-server-micro";

var PlantData = require("../../plants.json");

const typeDefs = gql`
  type Query {
    plants: [Plant!]!
    climates: [Climate!]!
    plant: Plant
  }
  type Plant {
    name: String!
    botanicalName: String
    hint: String
    harvest: String
    plantUrl: String
  }
  type Climate {
    name: String!
    months: [[Plant!]!]!
  }
`;

const resolvers = {
  Query: {
    plants(parent, args, context) {
      return PlantData;
    },
    plant(parent, args, context) {
      return PlantData["Cabbage"];
    },
    climates(parent, args, context) {
      return [
        {
          name: "blah",
          months: [
            [
              { name: "Mr. Plant" },
              { name: "Mr. Plant" },
              { name: "Mr. Plant" },
            ],
            [{ name: "Mr. Plant" }],
            [{ name: "Mr. Plant" }],
          ],
        },
      ];
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
