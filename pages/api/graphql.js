import { ApolloServer, gql } from "apollo-server-micro";

const PlantData = require("../../plants.json");
// const ClimateData = require("../../climates.json");

const typeDefs = gql`
  type Query {
    climate(name: String!, month: Int!): Climate!
    plant(name: String!): Plant
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
    plants: [Plant!]!
  }
`;

const resolvers = {
  Query: {
    plant(parent, args, context) {
      return PlantData[args.name];
    },
    climate(parent, args, context) {
      return {
        name: args.name, //todo cast to real name
        plants: [
          { name: "Mr. Plant" },
          { name: "Mr. Plant" },
          { name: "Mr. Plant" },
          { name: "Mr. Plant" },
          { name: "Mr. Plant" },
        ],
      };
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
