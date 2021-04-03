const ClimateData = require("../data.json");
const PlantData = require("../plants.json");

class ClimatePlantsAPI {
  constructor() {
    this.plantData = PlantData;
    this.climates = ClimateData;
  }

  getPlantData(plants) {
    return plants
      .filter((p) => {
        return !!this.plantData[p];
      })
      .map((p) => this.plantData[p]);
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
