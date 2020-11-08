import { ApolloServer, gql } from "apollo-server-micro";
const ClimateZoneAPI = require("../../datasources/ClimateZoneAPI");
const ClimatePlantsAPI = require("../../datasources/ClimatePlantsAPI");
const PlantAPI = require("../../datasources/PlantAPI");

const typeDefs = gql`
  type Query {
    climate(lat: String!, long: String!): Climate!
    plant(name: String!): Plant
  }

  type Plant {
    name: String!
    botanicalName: String!
    hint: String!
    harvest: String!
    plantUrl: String!
    imgUrl: String
  }

  type Climate {
    name: String
    season: String!
    plants: [Plant!]
  }
`;

const resolvers = {
  Query: {
    plant(_parent, args, _context) {
      return context.plantAPI.getPlant({ name: args.name });
    },
    climate: async (_parent, args, context) => {
      const {
        dataSources: { climateZoneAPI, climatePlantsAPI },
      } = context;
      const { lat, long } = args;
      const { climateName, season, month } = await climateZoneAPI.getClimate({
        lat,
        long,
      });
      const plants = climatePlantsAPI.getClimatePlants({ climateName, month });
      return { season, name: climateName, plants };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      climateZoneAPI: new ClimateZoneAPI(),
      climatePlantsAPI: new ClimatePlantsAPI(),
      plantAPI: new PlantAPI(),
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
