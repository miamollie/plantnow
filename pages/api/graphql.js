import { ApolloServer, gql } from "apollo-server-micro";
const ClimateZoneAPI = require("./ClimateZoneAPI");
const GeoIpAPI = require("./GeoIpAPI");
const ClimatePlantsAPI = require("./ClimatePlantsAPI");
const PlantAPI = require("./PlantAPI");

const typeDefs = gql`
  type Query {
    climate: Climate!
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
    plants: [Plant!]
  }
`;

const resolvers = {
  Query: {
    plant(_parent, args, _context) {
      return context.plantAPI.getPlant({ name: args.name });
    },
    climate: async (_parent, _args, context) => {
      const {
        dataSources: { geoIpAPI, climateZoneAPI, climatePlantsAPI },
      } = context;
      const [lat, long] = await geoIpAPI.getGeoIP();
      const name = await climateZoneAPI.getClimate({ lat, long });
      return climatePlantsAPI.getClimatePlants({ name });
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      climateZoneAPI: new ClimateZoneAPI(),
      geoIpAPI: new GeoIpAPI(),
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
