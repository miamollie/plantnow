const PlantData = require("../plants.json");

class ClimatePlantsAPI {
  constructor() {
    this.plants = PlantData;
  }

  getPlants() {
    return this.plants;
  }

  getPlant({ name }) {
    return this.plants[name] || null;
  }
}

module.exports = ClimatePlantsAPI;
