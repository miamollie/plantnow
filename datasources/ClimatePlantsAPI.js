const ClimateData = require("../data.json");
const PlantData = require("../plants.json");

class ClimatePlantsAPI {
  constructor() {
    this.plantData = PlantData;
    this.climates = ClimateData;
  }

  getPlantData(plants) {
    return plants.map((p) => {
      if (!!this.plantData[p]) {
        return this.plantData[p];
      } else {
        console.error(`Can't find data for ${p}`);
      }
    });
  }

  async getClimatePlants({ climateName, month }) {
    const allPlantsForClimate = this.climates[climateName];
    if (!allPlantsForClimate) return [];

    const currentPlants = allPlantsForClimate[month];
    if (!currentPlants) return [];

    return this.getPlantData(currentPlants);
  }
}

module.exports = ClimatePlantsAPI;
