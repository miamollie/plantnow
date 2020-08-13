const ClimateData = require("../../data.json");
const PlantData = require("../../plants.json");

class ClimatePlantsAPI {
  constructor() {
    this.climateZoneMap = {
      A: "TROPICAL ZONE",
      B: "ARID ZONE",
      C: "TEMPERATE ZONE",
      D: "COOL ZONE",
      E: "POLAR ZONE", //CURRENTLY NO DATA ON POLAR ZONE :(
    };
    this.monthMap = {
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
    this.plants = PlantData;
    this.climates = ClimateData;
  }

  formatPlants(plants) {
    //this belongs on plantapi?
    return plants.map((p) => {
      if (!!this.plants[p]) {
        return this.plants[p];
      } else {
        throw new Error(`Can't find data for ${p}`);
      }
    });
  }

  async getClimatePlants({ name }) {
    let climatePlants = {
      name: "",
      plants: [],
    };

    const month = new Date(Date.now()).getMonth();
    const monthString = this.monthMap[month];
    if (!monthString) return climatePlants;

    const climateName = this.climateZoneMap[name[0]];
    if (!climateName) return climatePlants;
    climatePlants = { ...climatePlants, name: climateName };

    const climateYear = this.climates[climateName];
    if (!climateYear) return climatePlants;

    const currentPlants = climateYear[monthString];
    if (!currentPlants) return climatePlants;

    const plants = this.formatPlants(currentPlants);
    return { ...climatePlants, plants };
  }
}

module.exports = ClimatePlantsAPI;
