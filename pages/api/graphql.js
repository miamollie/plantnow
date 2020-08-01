import { ApolloServer, gql } from "apollo-server-micro";

const PlantData = require("../../plants.json");
const ClimateData = require("../../data.json");
const climateZoneMap = {
  A: "TROPICAL ZONE",
  B: "ARID ZONE",
  C: "TEMPERATE ZONE",
  D: "COOL ZONE",
  E: "POLAR ZONE", //CURRENTLY NO DATA ON POLAR ZONE :(
};
const monthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};
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
    imgUrl: String
  }

  type Climate {
    name: String!
    plants: [Plant!]
  }
`;

const resolvers = {
  Query: {
    plant(parent, args, context) {
      return PlantData[args.name] || null;
    },
    climate(parent, args, context) {
      const climateName = climateZoneMap[args.name[0]];
      if (!climateName) return;

      const monthString = monthMap[args.month];
      if (!monthString) return;

      const climateYear = ClimateData[climateName];
      if (!climateYear) return;

      const currentPlants = climateYear[monthString];
      if (!currentPlants) return;

      const plants = currentPlants.map((p) => {
        if (!!PlantData[p] && !!PlantData[p].name) {
          return { name: PlantData[p].name, imgUrl: PlantData[p].imgUrl };
        } else {
          throw new Error(`Can't find data for ${p}`);
        }
      });
      return {
        name: climateName,
        plants,
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
